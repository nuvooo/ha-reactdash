# ESP32 Claude Monitor

Ein eigenständiges Hardware-Projekt: Ein **Waveshare ESP32-C6-LCD-1.47** zeigt
einen **konfigurierbaren Roboter** mit mehreren Zuständen (Claude arbeitet /
Leerlauf / braucht Bestätigung) und im Wechsel deinen **Token-Verbrauch** für
die laufende **Session** (5-Stunden-Fenster) und die **Woche** – jeweils mit
**Countdown bis zum Reset**.

Das Aussehen jedes Zustands stellst du in einem kleinen **Browser-Editor** ein
(„was macht der Roboter, wenn …") und schickst es **live** an das Gerät –
**kein Neu-Flashen** nötig.

> Liegt aktuell als Unterordner im `ha-reactdash`-Repo, ist aber komplett
> self-contained – `esp32-claude-monitor/` lässt sich 1:1 in ein eigenes Repo
> herauslösen.

## Plattformen

Die „Software" (Bridge **inklusive** Editor) ist ein einziger Node-Prozess und
läuft auf **macOS, Windows und Linux**. Die Claude-Hooks sind ein
plattformübergreifendes **Node-Skript** (kein Bash). Voraussetzung überall:
**Node.js ≥ 18** und ein MQTT-Broker (z. B. Mosquitto).

## Architektur

```
   ┌──────────────────────────────┐                       ┌──────────────────────┐
   │  Dein Rechner (Mac/Win/Linux) │       MQTT            │  ESP32-C6 + 1.47" LCD │
   │                               │                       │                      │
   │  bridge/index.js              │  state  (Status+Tok)  │  firmware (LVGL)     │
   │   ├─ ccusage  → Tokens   ─────┼──────────────────────▶│   • Roboter (3 Zust.)│
   │   ├─ /event   ← Hooks         │  config (Animationen) │   • Session-Screen   │
   │   ├─ /config  ← Editor   ─────┼──────────────────────▶│   • Weekly-Screen    │
   │   └─ servt den Editor "/"     │                       │                      │
   └───────────┬──────────────────┘                       └──────────────────────┘
        Browser-Editor (Canvas-Vorschau, pro Zustand einstellbar)
               ▲
        Claude-Code-Hooks  (working / idle / waiting)
```

Drei Signale fließen zusammen:

1. **Token-Verbrauch** – die Bridge ruft periodisch [`ccusage`](https://ccusage.com)
   auf: aktiver 5h-Block = *Session*, 7-Tage-Aggregat = *Woche*.
2. **Status** – **Claude-Code-Hooks** melden ereignisgenau:
   `UserPromptSubmit`/`PreToolUse` → **working**, `Notification` → **waiting**
   (Claude braucht Freigabe/Eingabe), `Stop` → **idle**.
3. **Animations-Config** – der **Editor** schickt deine Einstellungen an die
   Bridge, die sie als *retained* MQTT-Message publiziert; der ESP32 übernimmt
   sie sofort zur Laufzeit.

## Der Animations-Editor

Bridge starten und im Browser **http://localhost:8718/** öffnen. Pro Zustand
(Leerlauf / Arbeitet / Bestätigung) stellst du ein:

| Einstellung        | Optionen |
|--------------------|----------|
| Beschriftung       | freier Text (z. B. „WORKING", „CONFIRM?") |
| Körperfarbe        | Farbwähler |
| Augenfarbe / -form | Farbe · Kreis oder Eckig |
| Augen-Animation    | Ruhig · Blinzeln · Scannen · Pulsieren |
| Mund               | Keiner · Lächeln · Strich · O |
| Spinner (Ring)     | an/aus · Farbe |
| Antenne            | blinkt an/aus · Farbe |
| Auf-/Ab-Wippen     | an/aus |
| Tempo              | 0–100 |
| Textfarbe          | Farbwähler |

Die **Canvas-Vorschau** animiert den gewählten Zustand mit derselben Semantik
wie die Firmware. Buttons:

- **An Gerät senden** – speichert die Config und pusht sie live an den ESP32.
- **Auf Gerät zeigen** – schaltet den ESP32 testweise in den gewählten Zustand.
- **JSON herunterladen** – sichert die Config als Datei.

## ⚠️ Ehrliche Einordnung zu den Limits

Anthropic legt die **echten** Session-/Wochen-Limits (Pro/Max) **nicht** als
Token-Zahl offen. `ccusage` misst deinen tatsächlichen **Token-Verbrauch** aus
den lokalen Logs – nicht den `%`-Stand aus `/usage`. Deshalb:

- **Session-Reset** = `blockEnd` des aktiven 5h-Blocks (exakt).
- **Wochen-Reset** = konfigurierbarer Anker (`weekly.resetAnchorIso`), in
  7-Tage-Schritten weitergezählt. Auf deinen echten `/usage`-Reset setzen.
- **`% verbleibend`** = `1 − verbraucht / Budget` mit **kalibriertem** Budget
  (`budgets.sessionTokens` / `weeklyTokens`). Beobachte einmal, bei welchem
  ccusage-Stand dein reales Limit greift, und trage diesen Wert ein.

→ Sehr gute **Trend-/Annäherungsanzeige**, kein exakter Limit-Zähler.

## Hardware

Waveshare **ESP32-C6-LCD-1.47** (172×320, ST7789, SPI). Display, RGB-LED
(WS2812, GPIO8) und SD-Slot sind onboard – nur USB-C nötig. Pins stehen im
`config.h`:

| Funktion | GPIO | | Funktion | GPIO |
|---|---|---|---|---|
| SCLK | 7 | | DC | 15 |
| MOSI | 6 | | RST | 21 |
| LCD CS | 14 | | Backlight | 22 |

> Quelle: Waveshare-Wiki *ESP32-C6-LCD-1.47* + AndroidCrypto-Starter (Links
> unten). Bei der **Touch**-Variante Pins erneut prüfen.

## Setup – Bridge + Editor (dein Rechner)

```bash
cd esp32-claude-monitor/bridge
npm install
cp config.example.json config.json     # MQTT-URL, Budgets, weeklyResetAnchorIso anpassen
node index.js
# -> Editor: http://localhost:8718/
```

### Claude-Code-Hooks (working / idle / waiting)

Trage den Block aus [`bridge/hooks/settings.snippet.json`](bridge/hooks/settings.snippet.json)
in `~/.claude/settings.json` ein und ersetze `<PFAD>` durch den **absoluten**
Pfad zu `bridge/hooks/hook.js`. Die Hooks rufen `node hook.js <status>` auf –
das läuft auf Mac, Windows und Linux. Schlägt der Aufruf fehl (Bridge aus),
wird er still ignoriert, Claude blockiert nie.

## Setup – Firmware (ESP32)

Empfohlen: **PlatformIO** (VS Code oder CLI).

> **Wichtig:** Der ESP32-C6 braucht **Arduino-Core 3.x** – daher ist in
> `platformio.ini` der **pioarduino**-Platform-Fork eingetragen.

```bash
cd esp32-claude-monitor/firmware
cp include/config.h.example include/config.h   # WiFi + MQTT eintragen
pio run -t upload
pio device monitor
```

LVGL, Arduino_GFX, PubSubClient und ArduinoJson werden beim Build automatisch
gezogen. Die Default-Animationen sind einkompiliert; sobald die Bridge läuft,
überschreibt der Editor sie live.

## MQTT-Verträge

**Status + Tokens** → Topic `claude/monitor/state` (retained):

```json
{
  "status": "working",
  "session": { "usedPct": 42, "usedTokens": 1234567, "resetEpoch": 1749200000 },
  "weekly":  { "usedPct": 18, "usedTokens": 9876543, "resetEpoch": 1749600000 },
  "ts": 1749100000
}
```
`status` ∈ `idle | working | waiting`. `resetEpoch` = Unix-Sekunden (UTC); der
ESP32 holt sich die Zeit per NTP und rechnet den Countdown lokal.

**Animations-Config** → Topic `claude/monitor/config` (retained):

```json
{
  "version": 1,
  "states": {
    "idle":    { "label":"IDLE", "bodyColor":"#2B2D42", "eyeColor":"#6C72A8",
                 "eyeShape":"circle", "eyeAnim":"blink", "mouth":"flat",
                 "spinner":false, "spinnerColor":"#3DDC97", "antenna":false,
                 "antennaColor":"#FFB347", "bob":true, "speed":35, "labelColor":"#6C72A8" },
    "working": { "...": "analog" },
    "waiting": { "...": "analog" }
  }
}
```

## Projektstruktur

```
esp32-claude-monitor/
├── README.md
├── bridge/
│   ├── index.js              # ccusage-Poller + Hook-/Config-Endpoint + Editor-Server
│   ├── config.example.json
│   ├── package.json
│   └── hooks/
│       ├── hook.js           # cross-platform: node hook.js <idle|working|waiting>
│       └── settings.snippet.json
├── studio/
│   └── index.html            # Animations-Editor (Canvas-Vorschau, kein Build)
└── firmware/
    ├── platformio.ini
    ├── include/{config.h.example, lv_conf.h}
    └── src/main.cpp          # WiFi+MQTT+NTP, datengetriebener Roboter + Stats
```

## Roadmap / Ideen

- Weitere/Eigene Zustände (z. B. „Fehler", „Limit fast erreicht").
- Sprite-basierte Roboter-Frames statt Vektor-Primitive.
- RGB-LED (GPIO8) als zusätzliche Statusanzeige.
- Editor: Import einer zuvor heruntergeladenen JSON-Config.

## Quellen

- [Waveshare Wiki – ESP32-C6-LCD-1.47](https://www.waveshare.com/wiki/ESP32-C6-LCD-1.47)
- [AndroidCrypto – ESP32-C6 Waveshare ST7789 Starter](https://github.com/AndroidCrypto/ESP32_C6_Waveshare_ST7789_Starter)
- [ccusage – Blocks Reports](https://github.com/ryoppippi/ccusage/blob/main/docs/guide/blocks-reports.md)
- [ccusage – JSON Output](https://ccusage.com/guide/json-output)
