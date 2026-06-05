// ESP32 Claude Monitor – Firmware
// Waveshare ESP32-C6-LCD-1.47 (ST7789, 172x320)
//
// Zeigt einen Claude-Roboter (working/idle) und im Wechsel den Token-Stand
// fuer Session (5h) und Woche, jeweils mit Reset-Countdown. Daten kommen per
// MQTT von der Bridge (siehe ../bridge).

#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <Arduino_GFX_Library.h>
#include <lvgl.h>
#include <time.h>

#include "config.h"

// ---------------------------------------------------------------------------
// Display (Arduino_GFX) + LVGL-Anbindung
// ---------------------------------------------------------------------------
Arduino_DataBus *bus = new Arduino_ESP32SPI(PIN_LCD_DC, PIN_LCD_CS, PIN_LCD_SCLK,
                                            PIN_LCD_MOSI, GFX_NOT_DEFINED /*MISO*/);
// IPS-Panel, Portrait. Offsets (34,0): Controller ist 240x320, Panel 172 breit.
Arduino_GFX *gfx = new Arduino_ST7789(bus, PIN_LCD_RST, 0 /*rotation*/, true /*IPS*/,
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
// Geteilter Zustand (MQTT-Callback -> UI)
// ---------------------------------------------------------------------------
struct Window {
  int usedPct = 0;
  long long usedTokens = 0;
  long long resetEpoch = 0;
};
struct State {
  bool working = false;
  Window session;
  Window weekly;
};
static State g_state;
static volatile bool g_dirty = true;

// ---------------------------------------------------------------------------
// LVGL-Objekte
// ---------------------------------------------------------------------------
static lv_obj_t *robot_box;
static lv_obj_t *robot_eye_l, *robot_eye_r;
static lv_obj_t *robot_spinner;       // working-Indikator (Arc)
static lv_obj_t *robot_status_lbl;

static lv_obj_t *stat_title_lbl;
static lv_obj_t *stat_arc;
static lv_obj_t *stat_pct_lbl;
static lv_obj_t *stat_tokens_lbl;
static lv_obj_t *stat_reset_lbl;

static bool showWeekly = false;       // welcher Stats-Screen ist aktiv

// ---------------------------------------------------------------------------
// UI aufbauen
// ---------------------------------------------------------------------------
static void build_robot(lv_obj_t *parent) {
  robot_box = lv_obj_create(parent);
  lv_obj_set_size(robot_box, 140, 130);
  lv_obj_align(robot_box, LV_ALIGN_TOP_MID, 0, 12);
  lv_obj_set_style_radius(robot_box, 24, 0);
  lv_obj_set_style_bg_color(robot_box, lv_color_hex(0x2B2D42), 0);
  lv_obj_set_style_border_width(robot_box, 0, 0);
  lv_obj_clear_flag(robot_box, LV_OBJ_FLAG_SCROLLABLE);

  // Augen
  robot_eye_l = lv_obj_create(robot_box);
  lv_obj_set_size(robot_eye_l, 26, 26);
  lv_obj_set_style_radius(robot_eye_l, LV_RADIUS_CIRCLE, 0);
  lv_obj_set_style_border_width(robot_eye_l, 0, 0);
  lv_obj_align(robot_eye_l, LV_ALIGN_CENTER, -28, -14);

  robot_eye_r = lv_obj_create(robot_box);
  lv_obj_set_size(robot_eye_r, 26, 26);
  lv_obj_set_style_radius(robot_eye_r, LV_RADIUS_CIRCLE, 0);
  lv_obj_set_style_border_width(robot_eye_r, 0, 0);
  lv_obj_align(robot_eye_r, LV_ALIGN_CENTER, 28, -14);

  // Working-Spinner (rotierender Arc), per Default versteckt
  robot_spinner = lv_arc_create(robot_box);
  lv_obj_set_size(robot_spinner, 110, 110);
  lv_obj_center(robot_spinner);
  lv_arc_set_bg_angles(robot_spinner, 0, 360);
  lv_arc_set_angles(robot_spinner, 0, 70);
  lv_obj_remove_style(robot_spinner, NULL, LV_PART_KNOB);
  lv_obj_clear_flag(robot_spinner, LV_OBJ_FLAG_CLICKABLE);
  lv_obj_set_style_arc_width(robot_spinner, 4, LV_PART_MAIN);
  lv_obj_set_style_arc_width(robot_spinner, 4, LV_PART_INDICATOR);
  lv_obj_set_style_arc_opa(robot_spinner, LV_OPA_TRANSP, LV_PART_MAIN);

  robot_status_lbl = lv_label_create(robot_box);
  lv_obj_align(robot_status_lbl, LV_ALIGN_BOTTOM_MID, 0, -6);
  lv_obj_set_style_text_font(robot_status_lbl, &lv_font_montserrat_14, 0);
}

static void build_stats(lv_obj_t *parent) {
  lv_obj_t *card = lv_obj_create(parent);
  lv_obj_set_size(card, 160, 158);
  lv_obj_align(card, LV_ALIGN_BOTTOM_MID, 0, -6);
  lv_obj_set_style_radius(card, 18, 0);
  lv_obj_set_style_bg_color(card, lv_color_hex(0x1A1B2E), 0);
  lv_obj_set_style_border_width(card, 0, 0);
  lv_obj_clear_flag(card, LV_OBJ_FLAG_SCROLLABLE);

  stat_title_lbl = lv_label_create(card);
  lv_obj_align(stat_title_lbl, LV_ALIGN_TOP_MID, 0, 2);
  lv_obj_set_style_text_font(stat_title_lbl, &lv_font_montserrat_14, 0);
  lv_obj_set_style_text_color(stat_title_lbl, lv_color_hex(0x9AA0FF), 0);

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

  stat_pct_lbl = lv_label_create(card);
  lv_obj_set_style_text_font(stat_pct_lbl, &lv_font_montserrat_28, 0);
  lv_obj_align_to(stat_pct_lbl, stat_arc, LV_ALIGN_CENTER, 0, 0);

  stat_tokens_lbl = lv_label_create(card);
  lv_obj_set_style_text_font(stat_tokens_lbl, &lv_font_montserrat_14, 0);
  lv_obj_set_style_text_color(stat_tokens_lbl, lv_color_hex(0xC9CCE8), 0);
  lv_obj_align(stat_tokens_lbl, LV_ALIGN_BOTTOM_MID, 0, -22);

  stat_reset_lbl = lv_label_create(card);
  lv_obj_set_style_text_font(stat_reset_lbl, &lv_font_montserrat_14, 0);
  lv_obj_set_style_text_color(stat_reset_lbl, lv_color_hex(0x7E84B8), 0);
  lv_obj_align(stat_reset_lbl, LV_ALIGN_BOTTOM_MID, 0, -4);
}

// ---------------------------------------------------------------------------
// Formatierung
// ---------------------------------------------------------------------------
static void fmt_tokens(char *out, size_t n, long long t) {
  if (t >= 1000000000LL) snprintf(out, n, "%.1fB tok", t / 1e9);
  else if (t >= 1000000LL) snprintf(out, n, "%.1fM tok", t / 1e6);
  else if (t >= 1000LL) snprintf(out, n, "%.1fk tok", t / 1e3);
  else snprintf(out, n, "%lld tok", t);
}

static void fmt_countdown(char *out, size_t n, long long resetEpoch) {
  time_t now = time(nullptr);
  long long rem = resetEpoch - (long long)now;
  if (now < 1700000000) { snprintf(out, n, "sync..."); return; } // NTP noch nicht da
  if (rem < 0) rem = 0;
  long h = rem / 3600, m = (rem % 3600) / 60, s = rem % 60;
  if (h > 0) snprintf(out, n, "reset %ldh %02ldm", h, m);
  else snprintf(out, n, "reset %02ldm %02lds", m, s);
}

// ---------------------------------------------------------------------------
// UI-Refresh aus g_state
// ---------------------------------------------------------------------------
static void refresh_robot() {
  if (g_state.working) {
    lv_obj_clear_flag(robot_spinner, LV_OBJ_FLAG_HIDDEN);
    lv_obj_set_style_bg_color(robot_eye_l, lv_color_hex(0x3DDC97), 0);
    lv_obj_set_style_bg_color(robot_eye_r, lv_color_hex(0x3DDC97), 0);
    lv_label_set_text(robot_status_lbl, "WORKING");
    lv_obj_set_style_text_color(robot_status_lbl, lv_color_hex(0x3DDC97), 0);
  } else {
    lv_obj_add_flag(robot_spinner, LV_OBJ_FLAG_HIDDEN);
    lv_obj_set_style_bg_color(robot_eye_l, lv_color_hex(0x6C72A8), 0);
    lv_obj_set_style_bg_color(robot_eye_r, lv_color_hex(0x6C72A8), 0);
    lv_label_set_text(robot_status_lbl, "IDLE");
    lv_obj_set_style_text_color(robot_status_lbl, lv_color_hex(0x6C72A8), 0);
  }
}

static lv_color_t pct_color(int usedPct) {
  if (usedPct >= 85) return lv_color_hex(0xFF5C5C); // kritisch
  if (usedPct >= 60) return lv_color_hex(0xFFB347); // warnung
  return lv_color_hex(0x3DDC97);                    // ok
}

static void refresh_stats() {
  const Window &w = showWeekly ? g_state.weekly : g_state.session;
  lv_label_set_text(stat_title_lbl, showWeekly ? "WEEKLY" : "SESSION");

  int remaining = 100 - w.usedPct;
  lv_arc_set_value(stat_arc, remaining);
  lv_obj_set_style_arc_color(stat_arc, pct_color(w.usedPct), LV_PART_INDICATOR);

  char b[32];
  snprintf(b, sizeof(b), "%d%%", remaining);
  lv_label_set_text(stat_pct_lbl, b);
  lv_obj_align_to(stat_pct_lbl, stat_arc, LV_ALIGN_CENTER, 0, 0);

  fmt_tokens(b, sizeof(b), w.usedTokens);
  lv_label_set_text(stat_tokens_lbl, b);

  fmt_countdown(b, sizeof(b), w.resetEpoch);
  lv_label_set_text(stat_reset_lbl, b);
}

// ---------------------------------------------------------------------------
// Timer
// ---------------------------------------------------------------------------
static void rotate_timer(lv_timer_t *) {
  showWeekly = !showWeekly;
  refresh_stats();
}
static void tick_timer(lv_timer_t *) {
  if (g_dirty) { refresh_robot(); g_dirty = false; }
  refresh_stats(); // aktualisiert v. a. den Countdown jede Sekunde
}
static void spinner_timer(lv_timer_t *) {
  if (!g_state.working) return;
  static int a = 0;
  a = (a + 12) % 360;
  lv_arc_set_angles(robot_spinner, a, (a + 70) % 360);
}
static void blink_timer(lv_timer_t *) {
  if (g_state.working) return; // im Idle blinzeln
  static bool closed = false;
  closed = !closed;
  int h = closed ? 4 : 26;
  lv_obj_set_height(robot_eye_l, h);
  lv_obj_set_height(robot_eye_r, h);
}

// ---------------------------------------------------------------------------
// MQTT
// ---------------------------------------------------------------------------
WiFiClient wifiClient;
PubSubClient mqtt(wifiClient);

static void parse_window(JsonObjectConst o, Window &w) {
  if (o.isNull()) return;
  w.usedPct = o["usedPct"] | 0;
  w.usedTokens = o["usedTokens"] | 0LL;
  w.resetEpoch = o["resetEpoch"] | 0LL;
}

static void mqtt_cb(char *topic, byte *payload, unsigned int len) {
  StaticJsonDocument<512> doc;
  if (deserializeJson(doc, payload, len)) return;
  g_state.working = doc["working"] | false;
  parse_window(doc["session"], g_state.session);
  parse_window(doc["weekly"], g_state.weekly);
  g_dirty = true;
}

static void mqtt_reconnect() {
  if (mqtt.connected()) return;
  if (mqtt.connect(MQTT_CLIENT_ID,
                   strlen(MQTT_USER) ? MQTT_USER : nullptr,
                   strlen(MQTT_PASS) ? MQTT_PASS : nullptr)) {
    mqtt.subscribe(MQTT_TOPIC);
    Serial.println("[mqtt] connected + subscribed");
  }
}

// ---------------------------------------------------------------------------
// Setup / Loop
// ---------------------------------------------------------------------------
void setup() {
  Serial.begin(115200);

  pinMode(PIN_LCD_BL, OUTPUT);
  digitalWrite(PIN_LCD_BL, HIGH); // Backlight an (alternativ ledc-PWM zum Dimmen)

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
  refresh_robot();
  refresh_stats();

  lv_timer_create(rotate_timer, SCREEN_ROTATE_MS, NULL);
  lv_timer_create(tick_timer, 1000, NULL);
  lv_timer_create(spinner_timer, 60, NULL);
  lv_timer_create(blink_timer, 2500, NULL);

  // WiFi
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("[wifi] connecting");
  for (int i = 0; i < 40 && WiFi.status() != WL_CONNECTED; i++) {
    delay(250);
    Serial.print(".");
  }
  Serial.println(WiFi.status() == WL_CONNECTED ? " ok" : " FAILED");

  configTime(GMT_OFFSET_SEC, DAYLIGHT_OFFSET_SEC, NTP_SERVER);

  mqtt.setServer(MQTT_HOST, MQTT_PORT);
  mqtt.setCallback(mqtt_cb);
  mqtt.setBufferSize(640);
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    static unsigned long lastTry = 0;
    if (!mqtt.connected() && millis() - lastTry > 3000) {
      lastTry = millis();
      mqtt_reconnect();
    }
    mqtt.loop();
  }
  lv_timer_handler();
  delay(5);
}
