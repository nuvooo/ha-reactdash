// ESP32 Claude Monitor – Firmware
// Waveshare ESP32-C6-LCD-1.47 (ST7789, 172x320)
//
// Zeigt einen konfigurierbaren Claude-Roboter (Zustaende: idle / working /
// waiting) und im Wechsel den Token-Stand für Session (5h) und Woche samt
// Reset-Countdown. Status + Token-Daten kommen per MQTT von der Bridge.
//
// Das Aussehen/Verhalten je Zustand ist DATENGETRIEBEN: Der Editor (Bridge)
// pusht eine Animations-Config (retained) auf MQTT_CONFIG_TOPIC; die Firmware
// übernimmt sie zur Laufzeit – kein Neu-Flashen nötig.

#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <Arduino_GFX_Library.h>
#include <lvgl.h>
#include <time.h>
#include <math.h>

#include "config.h"

// ---------------------------------------------------------------------------
// Display (Arduino_GFX) + LVGL
// ---------------------------------------------------------------------------
Arduino_DataBus *bus = new Arduino_ESP32SPI(PIN_LCD_DC, PIN_LCD_CS, PIN_LCD_SCLK,
                                            PIN_LCD_MOSI, GFX_NOT_DEFINED /*MISO*/);
Arduino_GFX *gfx = new Arduino_ST7789(bus, PIN_LCD_RST, 0 /*rot*/, true /*IPS*/,
                                      LCD_WIDTH, LCD_HEIGHT, 34, 0, 34, 0);

static lv_disp_draw_buf_t draw_buf;
static lv_color_t buf[LCD_WIDTH * 40];

static void flush_cb(lv_disp_drv_t *drv, const lv_area_t *area, lv_color_t *color_p) {
  uint32_t w = area->x2 - area->x1 + 1;
  uint32_t h = area->y2 - area->y1 + 1;
  gfx->draw16bitRGBBitmap(area->x1, area->y1, (uint16_t *)color_p, w, h);
  lv_disp_flush_ready(drv);
}

// ---------------------------------------------------------------------------
// Animations-Style (pro Zustand, vom Editor konfigurierbar)
// ---------------------------------------------------------------------------
enum EyeAnim { EYE_STEADY = 0, EYE_BLINK, EYE_SCAN, EYE_PULSE };
enum Mouth   { MOUTH_NONE = 0, MOUTH_SMILE, MOUTH_FLAT, MOUTH_O };

struct AnimStyle {
  uint32_t bodyColor;
  uint32_t eyeColor;
  uint8_t  eyeShape;     // 0 = Kreis, 1 = abgerundetes Quadrat
  uint8_t  eyeAnim;      // EyeAnim
  uint8_t  mouth;        // Mouth
  bool     spinner;
  uint32_t spinnerColor;
  bool     antenna;
  uint32_t antennaColor;
  bool     bob;
  uint8_t  speed;        // 0..100
  uint32_t labelColor;
  char     label[16];
};

// Index 0 = idle, 1 = working, 2 = waiting. Sinnvolle Defaults (Editor
// überschreibt sie zur Laufzeit per MQTT).
static AnimStyle g_styles[3] = {
  // idle
  { 0x2B2D42, 0x6C72A8, 0, EYE_BLINK, MOUTH_FLAT,  false, 0x3DDC97, false, 0xFFB347, true,  35, 0x6C72A8, "IDLE" },
  // working
  { 0x2B2D42, 0x3DDC97, 0, EYE_SCAN,  MOUTH_SMILE, true,  0x3DDC97, true,  0x3DDC97, true,  80, 0x3DDC97, "WORKING" },
  // waiting (braucht Bestaetigung)
  { 0x402B2D, 0xFFB347, 1, EYE_PULSE, MOUTH_O,     false, 0xFFB347, true,  0xFFB347, false, 55, 0xFFB347, "CONFIRM?" },
};

static volatile uint8_t g_statusIdx = 0; // aktueller Zustand

// ---------------------------------------------------------------------------
// Token-Zustand
// ---------------------------------------------------------------------------
struct Window { int usedPct = 0; long long usedTokens = 0; long long resetEpoch = 0; };
static Window g_session, g_weekly;
static bool   g_showWeekly = false;

// ---------------------------------------------------------------------------
// LVGL-Objekte
// ---------------------------------------------------------------------------
static lv_obj_t *robot_box, *eye_l, *eye_r, *mouth_arc, *mouth_bar;
static lv_obj_t *spinner, *antenna_dot, *status_lbl;
static lv_obj_t *stat_title, *stat_arc, *stat_pct, *stat_tok, *stat_reset;

// ---------------------------------------------------------------------------
// UI-Aufbau
// ---------------------------------------------------------------------------
static void build_robot(lv_obj_t *parent) {
  robot_box = lv_obj_create(parent);
  lv_obj_set_size(robot_box, 140, 130);
  lv_obj_align(robot_box, LV_ALIGN_TOP_MID, 0, 12);
  lv_obj_set_style_radius(robot_box, 24, 0);
  lv_obj_set_style_border_width(robot_box, 0, 0);
  lv_obj_clear_flag(robot_box, LV_OBJ_FLAG_SCROLLABLE);

  // Reihenfolge bestimmt Z-Order: Spinner ganz hinten.
  spinner = lv_arc_create(robot_box);
  lv_obj_set_size(spinner, 122, 122);
  lv_obj_center(spinner);
  lv_arc_set_bg_angles(spinner, 0, 360);
  lv_obj_remove_style(spinner, NULL, LV_PART_KNOB);
  lv_obj_clear_flag(spinner, LV_OBJ_FLAG_CLICKABLE);
  lv_obj_set_style_arc_width(spinner, 4, LV_PART_INDICATOR);
  lv_obj_set_style_arc_opa(spinner, LV_OPA_TRANSP, LV_PART_MAIN);

  mouth_arc = lv_arc_create(robot_box);
  lv_obj_set_size(mouth_arc, 46, 46);
  lv_obj_align(mouth_arc, LV_ALIGN_CENTER, 0, 14);
  lv_obj_remove_style(mouth_arc, NULL, LV_PART_KNOB);
  lv_obj_clear_flag(mouth_arc, LV_OBJ_FLAG_CLICKABLE);
  lv_obj_set_style_arc_opa(mouth_arc, LV_OPA_TRANSP, LV_PART_MAIN);
  lv_obj_set_style_arc_width(mouth_arc, 4, LV_PART_INDICATOR);

  mouth_bar = lv_obj_create(robot_box);
  lv_obj_set_size(mouth_bar, 32, 5);
  lv_obj_align(mouth_bar, LV_ALIGN_CENTER, 0, 22);
  lv_obj_set_style_radius(mouth_bar, 3, 0);
  lv_obj_set_style_border_width(mouth_bar, 0, 0);

  eye_l = lv_obj_create(robot_box);
  lv_obj_set_style_border_width(eye_l, 0, 0);
  eye_r = lv_obj_create(robot_box);
  lv_obj_set_style_border_width(eye_r, 0, 0);

  antenna_dot = lv_obj_create(robot_box);
  lv_obj_set_size(antenna_dot, 12, 12);
  lv_obj_set_style_radius(antenna_dot, LV_RADIUS_CIRCLE, 0);
  lv_obj_set_style_border_width(antenna_dot, 0, 0);
  lv_obj_align(antenna_dot, LV_ALIGN_TOP_MID, 0, 6);

  status_lbl = lv_label_create(robot_box);
  lv_obj_align(status_lbl, LV_ALIGN_BOTTOM_MID, 0, -4);
  lv_obj_set_style_text_font(status_lbl, &lv_font_montserrat_14, 0);
}

static void build_stats(lv_obj_t *parent) {
  lv_obj_t *card = lv_obj_create(parent);
  lv_obj_set_size(card, 160, 158);
  lv_obj_align(card, LV_ALIGN_BOTTOM_MID, 0, -6);
  lv_obj_set_style_radius(card, 18, 0);
  lv_obj_set_style_bg_color(card, lv_color_hex(0x1A1B2E), 0);
  lv_obj_set_style_border_width(card, 0, 0);
  lv_obj_clear_flag(card, LV_OBJ_FLAG_SCROLLABLE);

  stat_title = lv_label_create(card);
  lv_obj_align(stat_title, LV_ALIGN_TOP_MID, 0, 2);
  lv_obj_set_style_text_font(stat_title, &lv_font_montserrat_14, 0);
  lv_obj_set_style_text_color(stat_title, lv_color_hex(0x9AA0FF), 0);

  stat_arc = lv_arc_create(card);
  lv_obj_set_size(stat_arc, 92, 92);
  lv_obj_align(stat_arc, LV_ALIGN_TOP_MID, 0, 22);
  lv_arc_set_rotation(stat_arc, 270);
  lv_arc_set_bg_angles(stat_arc, 0, 360);
  lv_arc_set_range(stat_arc, 0, 100);
  lv_obj_remove_style(stat_arc, NULL, LV_PART_KNOB);
  lv_obj_clear_flag(stat_arc, LV_OBJ_FLAG_CLICKABLE);
  lv_obj_set_style_arc_width(stat_arc, 8, LV_PART_MAIN);
  lv_obj_set_style_arc_width(stat_arc, 8, LV_PART_INDICATOR);

  stat_pct = lv_label_create(card);
  lv_obj_set_style_text_font(stat_pct, &lv_font_montserrat_28, 0);
  lv_obj_align_to(stat_pct, stat_arc, LV_ALIGN_CENTER, 0, 0);

  stat_tok = lv_label_create(card);
  lv_obj_set_style_text_font(stat_tok, &lv_font_montserrat_14, 0);
  lv_obj_set_style_text_color(stat_tok, lv_color_hex(0xC9CCE8), 0);
  lv_obj_align(stat_tok, LV_ALIGN_BOTTOM_MID, 0, -22);

  stat_reset = lv_label_create(card);
  lv_obj_set_style_text_font(stat_reset, &lv_font_montserrat_14, 0);
  lv_obj_set_style_text_color(stat_reset, lv_color_hex(0x7E84B8), 0);
  lv_obj_align(stat_reset, LV_ALIGN_BOTTOM_MID, 0, -4);
}

// ---------------------------------------------------------------------------
// Roboter-Renderer: wendet den aktuellen Style abhängig von der Phase an.
// Wird ~30ms aufgerufen (eine zentrale Animations-Schleife).
// ---------------------------------------------------------------------------
static void apply_robot(uint32_t frame) {
  const AnimStyle &s = g_styles[g_statusIdx];
  float spd = 0.4f + s.speed / 60.0f; // Tempo-Faktor

  // Body + leichtes "bob"
  lv_obj_set_style_bg_color(robot_box, lv_color_hex(s.bodyColor), 0);
  int bob = s.bob ? (int)roundf(sinf(frame * 0.08f) * 4.0f) : 0;
  lv_obj_align(robot_box, LV_ALIGN_TOP_MID, 0, 12 + bob);

  // Augen: Form
  uint8_t r = (s.eyeShape == 0) ? LV_RADIUS_CIRCLE : 6;
  lv_obj_set_style_radius(eye_l, r, 0);
  lv_obj_set_style_radius(eye_r, r, 0);
  lv_obj_set_style_bg_color(eye_l, lv_color_hex(s.eyeColor), 0);
  lv_obj_set_style_bg_color(eye_r, lv_color_hex(s.eyeColor), 0);

  int w = 26, h = 26, xoff = 0;
  switch (s.eyeAnim) {
    case EYE_BLINK:
      if ((frame % 90) < 5) h = 4;       // kurzes Blinzeln
      break;
    case EYE_SCAN:
      xoff = (int)roundf(sinf(frame * 0.12f * spd) * 9.0f);
      break;
    case EYE_PULSE: {
      int d = (int)roundf(sinf(frame * 0.18f * spd) * 4.0f);
      w = 26 + d; h = 26 + d;
      break;
    }
    case EYE_STEADY:
    default: break;
  }
  lv_obj_set_size(eye_l, w, h);
  lv_obj_set_size(eye_r, w, h);
  lv_obj_align(eye_l, LV_ALIGN_CENTER, -28 + xoff, -14);
  lv_obj_align(eye_r, LV_ALIGN_CENTER,  28 + xoff, -14);

  // Mund
  lv_obj_add_flag(mouth_arc, LV_OBJ_FLAG_HIDDEN);
  lv_obj_add_flag(mouth_bar, LV_OBJ_FLAG_HIDDEN);
  lv_obj_set_style_arc_color(mouth_arc, lv_color_hex(s.eyeColor), LV_PART_INDICATOR);
  lv_obj_set_style_bg_color(mouth_bar, lv_color_hex(s.eyeColor), 0);
  if (s.mouth == MOUTH_SMILE) {
    lv_arc_set_bg_angles(mouth_arc, 30, 150);
    lv_arc_set_angles(mouth_arc, 30, 150);
    lv_obj_clear_flag(mouth_arc, LV_OBJ_FLAG_HIDDEN);
  } else if (s.mouth == MOUTH_O) {
    lv_arc_set_bg_angles(mouth_arc, 0, 360);
    lv_arc_set_angles(mouth_arc, 0, 360);
    lv_obj_clear_flag(mouth_arc, LV_OBJ_FLAG_HIDDEN);
  } else if (s.mouth == MOUTH_FLAT) {
    lv_obj_clear_flag(mouth_bar, LV_OBJ_FLAG_HIDDEN);
  }

  // Spinner
  if (s.spinner) {
    lv_obj_clear_flag(spinner, LV_OBJ_FLAG_HIDDEN);
    lv_obj_set_style_arc_color(spinner, lv_color_hex(s.spinnerColor), LV_PART_INDICATOR);
    int a = (int)(frame * (2.0f + spd * 4.0f)) % 360;
    lv_arc_set_angles(spinner, a, (a + 70) % 360);
  } else {
    lv_obj_add_flag(spinner, LV_OBJ_FLAG_HIDDEN);
  }

  // Antenne (blinkt)
  if (s.antenna) {
    lv_obj_clear_flag(antenna_dot, LV_OBJ_FLAG_HIDDEN);
    bool on = (frame % 30) < 15;
    lv_obj_set_style_bg_color(antenna_dot, lv_color_hex(s.antennaColor), 0);
    lv_obj_set_style_bg_opa(antenna_dot, on ? LV_OPA_COVER : LV_OPA_30, 0);
  } else {
    lv_obj_add_flag(antenna_dot, LV_OBJ_FLAG_HIDDEN);
  }

  // Label
  lv_label_set_text(status_lbl, s.label);
  lv_obj_set_style_text_color(status_lbl, lv_color_hex(s.labelColor), 0);
}

// ---------------------------------------------------------------------------
// Stats-Renderer
// ---------------------------------------------------------------------------
static void fmt_tokens(char *out, size_t n, long long t) {
  if (t >= 1000000000LL) snprintf(out, n, "%.1fB tok", t / 1e9);
  else if (t >= 1000000LL) snprintf(out, n, "%.1fM tok", t / 1e6);
  else if (t >= 1000LL) snprintf(out, n, "%.1fk tok", t / 1e3);
  else snprintf(out, n, "%lld tok", t);
}
static void fmt_countdown(char *out, size_t n, long long resetEpoch) {
  time_t now = time(nullptr);
  if (now < 1700000000) { snprintf(out, n, "sync..."); return; }
  long long rem = resetEpoch - (long long)now;
  if (rem < 0) rem = 0;
  long h = rem / 3600, m = (rem % 3600) / 60, sec = rem % 60;
  if (h > 0) snprintf(out, n, "reset %ldh %02ldm", h, m);
  else snprintf(out, n, "reset %02ldm %02lds", m, sec);
}
static lv_color_t pct_color(int usedPct) {
  if (usedPct >= 85) return lv_color_hex(0xFF5C5C);
  if (usedPct >= 60) return lv_color_hex(0xFFB347);
  return lv_color_hex(0x3DDC97);
}
static void refresh_stats() {
  const Window &w = g_showWeekly ? g_weekly : g_session;
  lv_label_set_text(stat_title, g_showWeekly ? "WEEKLY" : "SESSION");
  int remaining = 100 - w.usedPct;
  lv_arc_set_value(stat_arc, remaining);
  lv_obj_set_style_arc_color(stat_arc, pct_color(w.usedPct), LV_PART_INDICATOR);
  char b[32];
  snprintf(b, sizeof(b), "%d%%", remaining);
  lv_label_set_text(stat_pct, b);
  lv_obj_align_to(stat_pct, stat_arc, LV_ALIGN_CENTER, 0, 0);
  fmt_tokens(b, sizeof(b), w.usedTokens);
  lv_label_set_text(stat_tok, b);
  fmt_countdown(b, sizeof(b), w.resetEpoch);
  lv_label_set_text(stat_reset, b);
}

// ---------------------------------------------------------------------------
// Timer
// ---------------------------------------------------------------------------
static void anim_timer(lv_timer_t *) {
  static uint32_t frame = 0;
  apply_robot(frame++);
}
static void rotate_timer(lv_timer_t *) { g_showWeekly = !g_showWeekly; refresh_stats(); }
static void tick_timer(lv_timer_t *)   { refresh_stats(); }

// ---------------------------------------------------------------------------
// MQTT
// ---------------------------------------------------------------------------
WiFiClient wifiClient;
PubSubClient mqtt(wifiClient);

static uint32_t parseHexColor(const char *s, uint32_t def) {
  if (!s || s[0] != '#') return def;
  return (uint32_t)strtoul(s + 1, nullptr, 16);
}
static uint8_t mapEyeAnim(const char *s) {
  if (!s) return EYE_STEADY;
  if (!strcmp(s, "blink")) return EYE_BLINK;
  if (!strcmp(s, "scan"))  return EYE_SCAN;
  if (!strcmp(s, "pulse")) return EYE_PULSE;
  return EYE_STEADY;
}
static uint8_t mapMouth(const char *s) {
  if (!s) return MOUTH_NONE;
  if (!strcmp(s, "smile")) return MOUTH_SMILE;
  if (!strcmp(s, "flat"))  return MOUTH_FLAT;
  if (!strcmp(s, "o"))     return MOUTH_O;
  return MOUTH_NONE;
}
static void applyStyleJson(JsonObjectConst o, AnimStyle &st) {
  if (o.isNull()) return;
  st.bodyColor    = parseHexColor(o["bodyColor"]    | (const char *)nullptr, st.bodyColor);
  st.eyeColor     = parseHexColor(o["eyeColor"]     | (const char *)nullptr, st.eyeColor);
  st.spinnerColor = parseHexColor(o["spinnerColor"] | (const char *)nullptr, st.spinnerColor);
  st.antennaColor = parseHexColor(o["antennaColor"] | (const char *)nullptr, st.antennaColor);
  st.labelColor   = parseHexColor(o["labelColor"]   | (const char *)nullptr, st.labelColor);
  st.eyeShape = (strcmp(o["eyeShape"] | "circle", "square") == 0) ? 1 : 0;
  st.eyeAnim  = mapEyeAnim(o["eyeAnim"] | (const char *)nullptr);
  st.mouth    = mapMouth(o["mouth"] | (const char *)nullptr);
  st.spinner  = o["spinner"] | st.spinner;
  st.antenna  = o["antenna"] | st.antenna;
  st.bob      = o["bob"] | st.bob;
  st.speed    = o["speed"] | st.speed;
  const char *lbl = o["label"] | (const char *)nullptr;
  if (lbl) { strncpy(st.label, lbl, sizeof(st.label) - 1); st.label[sizeof(st.label) - 1] = 0; }
}

static void handleConfig(byte *payload, unsigned int len) {
  StaticJsonDocument<2048> doc;
  if (deserializeJson(doc, payload, len)) return;
  JsonObjectConst states = doc["states"];
  applyStyleJson(states["idle"],    g_styles[0]);
  applyStyleJson(states["working"], g_styles[1]);
  applyStyleJson(states["waiting"], g_styles[2]);
  Serial.println("[mqtt] anim-config übernommen");
}

static void handleState(byte *payload, unsigned int len) {
  StaticJsonDocument<512> doc;
  if (deserializeJson(doc, payload, len)) return;
  const char *st = doc["status"] | "idle";
  if (!strcmp(st, "working"))      g_statusIdx = 1;
  else if (!strcmp(st, "waiting")) g_statusIdx = 2;
  else                             g_statusIdx = 0;
  JsonObjectConst se = doc["session"], we = doc["weekly"];
  if (!se.isNull()) { g_session.usedPct = se["usedPct"] | 0; g_session.usedTokens = se["usedTokens"] | 0LL; g_session.resetEpoch = se["resetEpoch"] | 0LL; }
  if (!we.isNull()) { g_weekly.usedPct  = we["usedPct"]  | 0; g_weekly.usedTokens  = we["usedTokens"]  | 0LL; g_weekly.resetEpoch  = we["resetEpoch"]  | 0LL; }
}

static void mqtt_cb(char *topic, byte *payload, unsigned int len) {
  if (!strcmp(topic, MQTT_CONFIG_TOPIC)) handleConfig(payload, len);
  else handleState(payload, len);
}

static void mqtt_reconnect() {
  if (mqtt.connected()) return;
  if (mqtt.connect(MQTT_CLIENT_ID,
                   strlen(MQTT_USER) ? MQTT_USER : nullptr,
                   strlen(MQTT_PASS) ? MQTT_PASS : nullptr)) {
    mqtt.subscribe(MQTT_TOPIC);
    mqtt.subscribe(MQTT_CONFIG_TOPIC);
    Serial.println("[mqtt] connected + subscribed");
  }
}

// ---------------------------------------------------------------------------
// Setup / Loop
// ---------------------------------------------------------------------------
void setup() {
  Serial.begin(115200);

  pinMode(PIN_LCD_BL, OUTPUT);
  digitalWrite(PIN_LCD_BL, HIGH);

  gfx->begin();
  gfx->fillScreen(BLACK);

  lv_init();
  lv_disp_draw_buf_init(&draw_buf, buf, NULL, LCD_WIDTH * 40);
  static lv_disp_drv_t disp_drv;
  lv_disp_drv_init(&disp_drv);
  disp_drv.hor_res = LCD_WIDTH;
  disp_drv.ver_res = LCD_HEIGHT;
  disp_drv.flush_cb = flush_cb;
  disp_drv.draw_buf = &draw_buf;
  lv_disp_drv_register(&disp_drv);

  lv_obj_t *scr = lv_scr_act();
  lv_obj_set_style_bg_color(scr, lv_color_hex(0x0E0F1A), 0);
  build_robot(scr);
  build_stats(scr);
  apply_robot(0);
  refresh_stats();

  lv_timer_create(anim_timer, 30, NULL);
  lv_timer_create(rotate_timer, SCREEN_ROTATE_MS, NULL);
  lv_timer_create(tick_timer, 1000, NULL);

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("[wifi] connecting");
  for (int i = 0; i < 40 && WiFi.status() != WL_CONNECTED; i++) { delay(250); Serial.print("."); }
  Serial.println(WiFi.status() == WL_CONNECTED ? " ok" : " FAILED");

  configTime(GMT_OFFSET_SEC, DAYLIGHT_OFFSET_SEC, NTP_SERVER);

  mqtt.setServer(MQTT_HOST, MQTT_PORT);
  mqtt.setCallback(mqtt_cb);
  mqtt.setBufferSize(2304); // anim-config kann ~2KB groß sein
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    static unsigned long lastTry = 0;
    if (!mqtt.connected() && millis() - lastTry > 3000) { lastTry = millis(); mqtt_reconnect(); }
    mqtt.loop();
  }
  lv_timer_handler();
  delay(5);
}
