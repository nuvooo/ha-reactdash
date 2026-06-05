# Claude Matrix Display

Ein eigenständiges Hardware-Projekt: Ein **Waveshare ESP32-C6-LCD-1.47** zeigt
einen **konfigurierbaren Roboter** mit vier Zuständen (Claude **arbeitet** /
**Leerlauf** / **braucht Bestätigung** / **Limit fast erreicht**) und im
Wechsel deinen **Token-Verbrauch** für die laufende **Session** (5h-Fenster)
und die **Woche** – jeweils mit **Countdown bis zum Reset**.

Das Aussehen jedes Zustands stellst du in einem kleinen **Browser-Editor** ein
und schickst es **live** ans Gerät – **kein Neu-Flashen** nötig.

Die „Software" (Bridge + Editor) gibt es als **fertigen Installer pro
Betriebssystem**. Installieren, fertig: sie **startet automatisch beim Login**
und öffnet den Editor im Browser. **Node muss nicht installiert sein.**

> Eigenständiges Repo – Firmware, Bridge/Editor und Installer in einem.

## Installieren (ohne Node)

Aus den **Releases** den Installer für dein System laden und ausführen:

| System  | Datei | Installiert nach | Autostart |
|---------|-------|------------------|-----------|
| macOS   | `claude-matrix-<ver>.pkg`  | `/usr/local/bin` | LaunchAgent (Login) |
| Windows | `claude-matrix-setup.exe`  | Programme        | Autostart-Verknüpfung |
| Linux   | `claude-matrix_<ver>_amd64.deb` | `/usr/local/bin` | `/etc/xdg/autostart` (Login) |

Nach der Installation läuft die App als kleiner Hintergrunddienst, **öffnet den
Editor automatisch** unter **http://localhost:8718/** und legt `config.json`
(Einstellungen) sowie `anim_config.json` (Animationen) an.

Dann im Editor:

1. Unter **⚙ Verbindung & Limits** die **MQTT-URL** deines Brokers (und ggf.
   Budgets) eintragen → *Einstellungen speichern*.
2. Roboter-Zustände gestalten → **An Gerät senden**.

> macOS: unsigniert → ggf. einmal über *Systemeinstellungen → Datenschutz &
> Sicherheit* freigeben. Linux `.deb`: `sudo dpkg -i claude-matrix_*.deb`.

### Ohne Installer (nur die Binärdatei)

Es gibt auch die nackten Binärdateien (`claude-matrix-linux/-macos/-win.exe`).
Autostart richtest du dann selbst ein:

```
claude-matrix autostart enable     # aktiviert Autostart beim Login
claude-matrix autostart disable    # entfernt ihn wieder
```

Das funktioniert auf allen drei Systemen (LaunchAgent / Autostart-Eintrag /
Registry-Run).

## Woher kommen die Daten?

- **Token-Verbrauch** wird **direkt aus Claude Codes lokalen Logs** gelesen
  (`~/.claude/projects/**/*.jsonl`) – dieselbe Quelle wie `ccusage`, aber
  **eingebaut**, deshalb braucht die App weder `ccusage` noch `npx` noch Node.
  Aktiver 5h-Block = *Session*, 7-Tage-Summe = *Woche*.
- **Status** (working / idle / waiting) melden **Claude-Code-Hooks**
  ereignisgenau (siehe unten).
- **Limit** wird von der App **automatisch** gesetzt, sobald Session **oder**
  Woche die Schwelle (Standard 85 %) erreicht – mit Vorrang vor dem
  Hook-Status, damit die Warnung sichtbar bleibt.

### ⚠️ Ehrliche Einordnung zu den Limits

Anthropic legt die **echten** Limits nicht als Token-Zahl offen. Gemessen wird
der tatsächliche **Verbrauch**, nicht der `%`-Stand aus `/usage`. Deshalb:

- **Session-Reset** = Start des aktiven 5h-Blocks + 5h.
- **Wochen-Reset** = konfigurierbarer Anker (Editor), in 7-Tage-Schritten.
- **`% verbleibend`** = `1 − verbraucht / Budget` mit **kalibriertem** Budget
  (im Editor unter ⚙). Einmal beobachten, bei welchem Stand dein reales Limit
  greift, und als Budget eintragen.

→ Sehr gute **Trend-/Annäherungsanzeige**, kein exakter Limit-Zähler.

## Claude-Code-Hooks (working / idle / waiting)

Trage den Block aus [`bridge/hooks/settings.snippet.json`](bridge/hooks/settings.snippet.json)
in `~/.claude/settings.json` ein und ersetze `<BIN>` durch den absoluten Pfad
zur Standalone-App. Die Hooks rufen sie als Subcommand auf:

```
<BIN> event working     # bei Prompt-/Tool-Start
<BIN> event waiting     # Notification: Claude braucht Freigabe/Eingabe
<BIN> event idle        # Stop
```

Das läuft auf Mac, Windows und Linux und braucht ebenfalls kein Node. Schlägt
der Aufruf fehl (App nicht gestartet), wird er still ignoriert – Claude
blockiert nie.

## Der Animations-Editor

Vier Tabs (Leerlauf / Arbeitet / Bestätigung / Limit). Pro Zustand einstellbar:

| Einstellung        | Optionen |
|--------------------|----------|
| Beschriftung       | freier Text |
| Körperfarbe        | Farbwähler |
| Augenfarbe / -form | Farbe · Kreis oder Eckig |
| Augen-Animation    | Ruhig · Blinzeln · Scannen · Pulsieren |
| Mund               | Keiner · Lächeln · Strich · O |
| Spinner (Ring)     | an/aus · Farbe |
| Antenne            | blinkt an/aus · Farbe |
| Auf-/Ab-Wippen     | an/aus |
| Tempo              | 0–100 |
| Textfarbe          | Farbwähler |

Die **Canvas-Vorschau** animiert den gewählten Zustand wie die Firmware.
**An Gerät senden** pusht live, **Auf Gerät zeigen** schaltet den ESP32
testweise in den Zustand, **JSON herunterladen** sichert die Config. Unter
**⚙ Verbindung & Limits** stellst du MQTT, Budgets, Wochen-Anker und
Limit-Schwelle ein.

## Hardware

Waveshare **ESP32-C6-LCD-1.47** (172×320, ST7789, SPI). Display, RGB-LED
(WS2812, GPIO8) und SD-Slot sind onboard – nur USB-C nötig.

| Funktion | GPIO | | Funktion | GPIO |
|---|---|---|---|---|
| SCLK | 7 | | DC | 15 |
| MOSI | 6 | | RST | 21 |
| LCD CS | 14 | | Backlight | 22 |

> Quelle: Waveshare-Wiki *ESP32-C6-LCD-1.47* + AndroidCrypto-Starter (Links
> unten). Bei der **Touch**-Variante Pins prüfen.

## Setup – Firmware (ESP32)

Empfohlen: **PlatformIO**. Der ESP32-C6 braucht **Arduino-Core 3.x** – daher
ist in `platformio.ini` der **pioarduino**-Platform-Fork eingetragen.

```bash
cd firmware
cp include/config.h.example include/config.h   # WiFi + MQTT eintragen
pio run -t upload
pio device monitor
```

LVGL, Arduino_GFX, PubSubClient und ArduinoJson werden automatisch gezogen.
Default-Animationen sind einkompiliert; sobald die App läuft, überschreibt der
Editor sie live.

## Aus dem Quellcode bauen / entwickeln

Voraussetzung nur zum **Bauen** (Endnutzer brauchen es nicht): Node.js ≥ 18.

```bash
cd bridge
npm install
npm start             # Dev-Lauf (öffnet den Editor)
npm run pkg:linux     # nur Linux-Binary -> dist/claude-matrix-linux
npm run package       # alle Binaries -> dist/ (linux/macos/win.exe)
```

`npm run package` bündelt mit esbuild und verpackt mit
[`@yao-pkg/pkg`](https://github.com/yao-pkg/pkg) den Node-Runtime mit in die
Binärdatei.

**Installer bauen** (jeweils auf dem Ziel-OS bzw. in CI):

```bash
installer/linux/build-deb.sh   0.2.0   # .deb      (Linux, dpkg-deb)
installer/macos/build-pkg.sh   0.2.0   # .pkg      (macOS, pkgbuild)
iscc installer/windows/claude-matrix.iss        # Setup.exe (Windows, Inno Setup)
```

Der CI-Workflow [`.github/workflows/release.yml`](.github/workflows/release.yml)
baut bei einem Tag `v*` auf je einem mac/win/linux-Runner die
Binärdatei **und** den nativen Installer und hängt alles ans Release.

## MQTT-Verträge

**Status + Tokens** → `claude/matrix/state` (retained):

```json
{ "status": "working",
  "session": { "usedPct": 42, "usedTokens": 1234567, "resetEpoch": 1749200000 },
  "weekly":  { "usedPct": 18, "usedTokens": 9876543, "resetEpoch": 1749600000 },
  "ts": 1749100000 }
```
`status` ∈ `idle | working | waiting | limit`. `resetEpoch` = Unix-Sekunden
(UTC); der ESP32 nutzt NTP für den Countdown.

**Animations-Config** → `claude/matrix/config` (retained): Objekt `states` mit
`idle`, `working`, `waiting`, `limit` (Felder siehe Editor-Tabelle).

## Projektstruktur

```
claude-matrix-display/
├── README.md
├── .github/workflows/release.yml   # baut Binaries + Installer (3-OS-Matrix)
├── bridge/
│   ├── index.js                    # App: Usage + Hooks + Editor + MQTT + autostart
│   ├── usage.js                    # native Token-Auswertung (ohne ccusage)
│   ├── scripts/embed-studio.mjs    # bäckt den Editor in die Binärdatei
│   ├── package.json                # start / build / pkg:<os> / package
│   └── hooks/settings.snippet.json # Claude-Hooks (<BIN> event <status>)
├── installer/
│   ├── linux/build-deb.sh          # .deb (+ /etc/xdg/autostart)
│   ├── macos/{build-pkg.sh, *.plist, postinstall}  # .pkg (+ LaunchAgent)
│   └── windows/claude-matrix.iss  # Inno-Setup (+ Autostart-Verknüpfung)
├── studio/index.html               # Animations-Editor (Canvas, kein Build)
└── firmware/
    ├── platformio.ini
    ├── include/{config.h.example, lv_conf.h}
    └── src/main.cpp                # datengetriebener Roboter + Stats
```

## Quellen

- [Waveshare Wiki – ESP32-C6-LCD-1.47](https://www.waveshare.com/wiki/ESP32-C6-LCD-1.47)
- [AndroidCrypto – ESP32-C6 Waveshare ST7789 Starter](https://github.com/AndroidCrypto/ESP32_C6_Waveshare_ST7789_Starter)
- [@yao-pkg/pkg – Standalone-Executables für Node](https://github.com/yao-pkg/pkg)
