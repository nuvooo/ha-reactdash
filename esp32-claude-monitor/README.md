# ESP32 Claude Monitor

Ein eigenständiges Hardware-Projekt: Ein **Waveshare ESP32-C6-LCD-1.47** zeigt
eine **Roboter-Animation** (arbeitet Claude gerade / Leerlauf) und im Wechsel
deinen **Token-Verbrauch** für die laufende **Session** (5-Stunden-Fenster) und
die **Woche** – jeweils mit **Countdown bis zum Reset**.

> Liegt aktuell als Unterordner im `ha-reactdash`-Repo, ist aber komplett
> self-contained. Du kannst `esp32-claude-monitor/` jederzeit 1:1 in ein
> eigenes Repo herauslösen.

## Architektur

```
   ┌─────────────────────┐        MQTT          ┌──────────────────────┐
   │  Dein Rechner        │   claude/monitor/    │  ESP32-C6 + 1.47" LCD │
   │                      │      state (JSON)    │                      │
   │  bridge/index.js  ───┼─────────────────────▶│  firmware (LVGL)     │
   │   • ccusage (Tokens) │                      │   • Roboter-Anim.    │
   │   • Working/Idle  ◀──┼── HTTP POST ──┐       │   • Session-Screen   │
   │     (Claude Hooks)   │               │       │   • Weekly-Screen    │
   └─────────────────────┘               │       └──────────────────────┘
                                  ┌───────┴────────┐
                                  │ Claude Code     │
                                  │ Hooks (working/ │
                                  │ idle Events)    │
                                  └────────────────┘
```

Zwei Signale werden gemessen und gebündelt per MQTT an den ESP32 gepusht:

1. **Token-Verbrauch** – die Bridge ruft periodisch [`ccusage`](https://ccusage.com)
   auf und liest den aktiven 5h-Block (Session) sowie ein 7-Tage-Aggregat (Woche).
2. **Working/Idle** – **Claude-Code-Hooks** posten Events an die Bridge:
   `UserPromptSubmit`/`PreToolUse` → *working*, `Stop` → *idle*. Das ist
   ereignisgenau (kein Polling-Rätselraten).

Die Bridge führt beides zusammen und publiziert ein kompaktes JSON nach MQTT.
Der ESP32 abonniert das Topic, parst es und rendert die UI mit **LVGL**.

## ⚠️ Ehrliche Einordnung zu den Limits

Anthropic legt die **echten** Session-/Wochen-Limits (Pro/Max) **nicht** als
Token-Zahl offen. `ccusage` misst deinen tatsächlichen **Token-Verbrauch** aus
den lokalen Logs (`~/.claude/projects/**/*.jsonl`) – nicht den prozentualen
Limit-Stand, den `/usage` in Claude Code anzeigt.

Deshalb:

- **Session-Reset** = `blockEnd` des aktiven 5h-Blocks aus ccusage (exakt).
- **Wochen-Reset** = konfigurierbarer Anker (`weeklyResetAnchorIso`), der in
  7-Tage-Schritten weitergezählt wird. Setze ihn auf deinen tatsächlichen
  Wochen-Reset-Zeitpunkt aus `/usage`.
- **Prozent verbleibend** = `1 − verbrauchteTokens / Budget`, wobei `Budget`
  von dir **kalibriert** wird (`budgets.sessionTokens` / `budgets.weeklyTokens`).
  Beobachte einmal, bei welchem ccusage-Tokenstand du dein reales Limit
  erreichst, und trage diesen Wert als Budget ein.

Das Display ist damit eine sehr gute **Annäherung/Trend-Anzeige**, kein
behördlich exakter Limit-Zähler.

## Hardware

**Board:** Waveshare ESP32-C6-LCD-1.47 (172×320, ST7789, SPI).
Display, RGB-LED (WS2812 an GPIO8) und SD-Slot sind onboard – es ist **keine
Verkabelung** nötig, nur USB-C. Die Pins sind im Firmware-`config.h` bereits
hinterlegt:

| Funktion        | GPIO  |
|-----------------|-------|
| SCLK (SCL)      | 7     |
| MOSI (SDA)      | 6     |
| LCD CS          | 14    |
| LCD DC          | 15    |
| LCD RST         | 21    |
| Backlight (BLK) | 22    |
| RGB-LED (WS2812)| 8     |

> Quelle Pinbelegung: Waveshare-Wiki *ESP32-C6-LCD-1.47* +
> AndroidCrypto-Starter (siehe Links unten). Falls du die **Touch**-Variante
> (`ESP32-C6-Touch-LCD-1.47`) hast, prüfe die Pins erneut.

## Setup – Bridge (dein Rechner)

Voraussetzungen: Node.js ≥ 18, ein MQTT-Broker (z. B. Mosquitto; auch der von
Home Assistant geht, obwohl wir HA nicht zwingend brauchen).

```bash
cd esp32-claude-monitor/bridge
npm install
cp config.example.json config.json
# config.json anpassen: MQTT-URL, Budgets, weeklyResetAnchorIso
node index.js
```

Die Bridge:

- pollt ccusage alle `pollSeconds` Sekunden,
- lauscht auf `http://localhost:<http.port>/event` für Working/Idle-Hooks,
- publiziert das Gesamt-JSON nach `mqtt … topic`.

### Claude-Code-Hooks für Working/Idle

Kopiere die Skripte und trage die Hooks in `~/.claude/settings.json` ein:

```bash
chmod +x esp32-claude-monitor/bridge/hooks/*.sh
```

Den passenden `hooks`-Block findest du in
[`bridge/hooks/settings.snippet.json`](bridge/hooks/settings.snippet.json).
Er ruft bei Prompt-/Tool-Start `claude-working.sh` und beim Stop
`claude-idle.sh` auf; die Skripte machen einen kurzen `curl` an die Bridge.

## Setup – Firmware (ESP32)

Empfohlen: **PlatformIO** (VS Code Extension oder CLI).

> **Wichtig:** Der ESP32-C6 braucht **Arduino-Core 3.x**. Der offizielle
> `espressif32`-Platform-Eintrag hinkt teils hinterher – nutze daher den
> **pioarduino**-Fork (in `platformio.ini` vorkonfiguriert).

```bash
cd esp32-claude-monitor/firmware
cp include/config.h.example include/config.h
# config.h anpassen: WiFi-SSID/Passwort, MQTT-Broker, Topic
pio run -t upload
pio device monitor
```

Beim ersten Build zieht PlatformIO LVGL, Arduino_GFX, PubSubClient und
ArduinoJson automatisch. Die `lv_conf.h` liegt bereits in `include/`.

## MQTT-Payload (Vertrag zwischen Bridge & Firmware)

Topic: `claude/monitor/state`, Retained-Message empfohlen:

```json
{
  "working": false,
  "session": { "usedPct": 42, "usedTokens": 1234567, "resetEpoch": 1749200000 },
  "weekly":  { "usedPct": 18, "usedTokens": 9876543, "resetEpoch": 1749600000 },
  "ts": 1749100000
}
```

- `usedPct` – 0..100, bereits gegen das kalibrierte Budget gerechnet.
- `resetEpoch` – Unix-Sekunden (UTC). Der ESP32 holt sich die Zeit per NTP und
  rechnet den Countdown lokal aus (robust gegen seltene Updates).

## Projektstruktur

```
esp32-claude-monitor/
├── README.md
├── bridge/
│   ├── index.js              # ccusage-Poller + Hook-Endpoint + MQTT-Publisher
│   ├── config.example.json
│   ├── package.json
│   └── hooks/
│       ├── claude-working.sh
│       ├── claude-idle.sh
│       └── settings.snippet.json
└── firmware/
    ├── platformio.ini
    ├── include/
    │   ├── config.h.example
    │   └── lv_conf.h
    └── src/
        └── main.cpp          # WiFi + MQTT + NTP + LVGL-UI (Roboter & Stats)
```

## Roadmap / Ideen

- Sprite-basierte Roboter-Frames statt Vektor-Primitive (PNG → C-Array via
  LVGL-Image-Converter, in `main.cpp` einhängen).
- RGB-LED (GPIO8) als zusätzliche Statusanzeige (grün=idle, blau=working,
  rot=Limit fast erreicht).
- Optionaler HTTP-Fallback, falls kein MQTT-Broker vorhanden ist.
- Annäherung an die echten `/usage`-Prozente über einen Statusline-Parser.

## Quellen

- [Waveshare Wiki – ESP32-C6-LCD-1.47](https://www.waveshare.com/wiki/ESP32-C6-LCD-1.47)
- [AndroidCrypto – ESP32-C6 Waveshare ST7789 Starter](https://github.com/AndroidCrypto/ESP32_C6_Waveshare_ST7789_Starter)
- [ccusage – Blocks Reports](https://github.com/ryoppippi/ccusage/blob/main/docs/guide/blocks-reports.md)
- [ccusage – JSON Output](https://ccusage.com/guide/json-output)
