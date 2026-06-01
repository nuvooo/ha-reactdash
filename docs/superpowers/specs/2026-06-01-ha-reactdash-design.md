# ha-reactdash — Design Spec

**Datum:** 2026-06-01
**Status:** Entwurf zur Freigabe

## Vision

Das innovativste Visualisierungs-Plugin für Home Assistant: ein Dashboard, das sich
**selbst aus den definierten Räumen/Etagen aufbaut**, sofort und ohne Konfiguration
funktioniert (out of the box), modern und gut bedienbar ist. Minimaler manueller
Aufwand — der Nutzer pflegt Areas/Geräte in HA, das Plugin macht den Rest.

## Zielgruppe & Vorgehen

Zuerst für das eigene HA-Setup optimiert (muss bei mir perfekt laufen), aber von
Anfang an **release-fähig** gebaut: keine Hardcodes auf ein spezifisches Setup,
saubere Modulgrenzen. HACS-/Veröffentlichungs-Politur kommt als spätere Phase.

## Kernentscheidungen (festgelegt)

| Thema | Entscheidung |
|------|--------------|
| Integrationsform | `panel_custom` — React-App als eigener HA-Sidebar-Eintrag |
| CSS-Isolation | Shadow DOM; Tailwind-Stylesheet in Shadow-Root injiziert, Radix/cmdk-Portale dorthin umgelenkt |
| Auto-Gruppierung | Adaptiv: Etagen→Räume falls vorhanden, sonst Räume; Entitäten je Raum funktional sortiert |
| Smart-Controls | Renderer-Registry pro Entitätstyp + generischer Fallback, keine manuelle Kartenkonfig |
| Innovations-Fokus | Kontext-adaptives Layout · Null-Konfig Smart-Controls · Schnell-Steuerung & Suche |
| Bewusst NICHT im ersten Wurf | Floorplan-Ansicht, grafische Konfig-UI, voll-i18n, Szenen-Editor |
| Design | Basis „Clean & Hell"; Dark Mode über Tokens; folgt HA-Theme + manueller Toggle |
| Stack | React + TypeScript + Vite + Tailwind + shadcn/ui (Radix + cmdk) |

## Architektur

### Integration
- Auslieferung als **`panel_custom`**: HA lädt unser ES-Module-Bundle und registriert
  einen Sidebar-Eintrag.
- HA reicht das **`hass`-Objekt** in das Panel-Element (States, `callService`,
  `connection`/WebSocket, Auth). **Kein** eigenes Login, **kein** Long-Lived-Token nötig.
- React wird in einem **Web Component (Custom Element)** gemountet; der gesamte
  React-Baum lebt im **Shadow DOM**. Tailwinds Stylesheet wird zur Laufzeit in den
  Shadow-Root injiziert (Constructable Stylesheet / `<style>`-Inject).
- **Portale**: Radix Dialog/Popover und `cmdk` rendern per Default nach
  `document.body` (außerhalb des Shadow-Roots). Portal-Container wird explizit auf
  ein Element **innerhalb des Shadow-Roots** gesetzt, damit Styling greift.
- **Reaktivität**: `hass` aktualisiert sich live; nur betroffene Tiles rendern neu.

### Module (klare Grenzen)
- `ha/` — Datenschicht: kapselt Registry-WebSocket-Calls und `callService`. Einzige
  Stelle, die HA-Interna kennt.
- `grouping/` — Auto-Grouping-Engine: baut aus Registries den Strukturbaum.
- `renderers/` — Smart-Control-Renderer pro Entitätstyp + Fallback.
- `layout/` — Kontext-adaptives Layout (Relevanz-Score, responsive Raster).
- `command/` — Command-Bar & Suche (auf `cmdk`).
- `theme/` — Design-Tokens (CSS-Variablen), Hell/Dunkel, HA-Theme-Kopplung.
- `components/` — shadcn-Komponenten (kopiert, eigener Besitz) + eigene Tiles.

## Auto-Grouping-Engine

Beim Start werden einmalig die HA-Registries gelesen:
`config/floor_registry/list`, `config/area_registry/list`,
`config/device_registry/list`, `config/entity_registry/list`.

Daraus wird ein **Strukturbaum** abgeleitet:
- **Adaptiv:** Sind Etagen definiert → `Etage → Raum`. Sonst → `Raum` als oberste Ebene.
- **Raumzuordnung je Entität:** direkt über die Entity-Area **oder** abgeleitet über
  die Device-Area des zugehörigen Geräts.
- **Funktions-Klassifizierung** je Raum nach `domain` + `device_class`, feste sinnvolle
  Reihenfolge: Licht, Klima, Medien, Rollos/Cover, Schalter/Steckdosen, Sensoren,
  Sicherheit.
- **Fallbacks:** Entitäten ohne Raum → Sammelbereich „Sonstiges". Leere Räume werden
  ausgeblendet. Versteckte/diagnostische Entitäten (entity_registry-Flags
  `hidden`/`entity_category`) standardmäßig aus, zuschaltbar.
- **Live-Updates:** Registry-Änderungen (neuer Raum/Gerät) regenerieren den Baum ohne
  Reload.

## Smart-Controls (Null-Konfig)

Eine **Renderer-Registry** bildet Entitätstyp → Control ab:
- `light` → Toggle + Helligkeit; bei Support Farb-/Farbtemperaturwahl
- `climate` → Soll/Ist-Temperatur, Modus
- `media_player` → Cover, Titel, Transportsteuerung
- `cover` → Position/Lamellen
- `switch` / `fan` / `lock` / `binary_sensor` / `sensor` → je eigener Renderer
- **Unbekannte Typen** → generischer Fallback (Status + Toggle/Mehr-Info), damit nichts
  „kaputt" aussieht (wichtig für fremde Setups)

Jedes Control hat zwei Ansichten:
- **Tile** — kompakt, im Raster
- **Detail** — Radix-Dialog mit History/erweiterten Aktionen

## Kontext-adaptives Layout

Clientseitiger **Relevanz-Score** je Raum/Tile steuert Reihenfolge & Größe:
- **Signale:** aktive Geräte (Licht an, Medien spielt), Anwesenheit
  (`person`/`device_tracker`/Präsenzsensor im Raum), Tageszeit, kürzliche Interaktion
  (`last_changed`/`last_updated`), offene Zustände (Fenster offen, Tür unverriegelt).
- **Wirkung:** relevanter Raum rückt nach oben; ruhige Räume nach unten. Oben eine
  **„Jetzt aktiv"-Leiste** mit Zusammenfassung des aktuell Laufenden.
- **Stabilität:** Hysterese + Mindest-Verweildauer, damit nichts nervös springt;
  `prefers-reduced-motion` schaltet Bewegungen ruhig.
- **Default an, abschaltbar** → dann stabile Etagen-/A-Z-Sortierung.

## Schnell-Steuerung & Suche

- **Command-Bar** (`⌘/Strg + K`), auf `cmdk`: Freitext über alle Entitäten/Räume,
  Fuzzy-Suche über Name/Raum/Typ, Ergebnisse direkt bedienbar (kein Seitenwechsel).
- Enter führt naheliegende Aktion aus („Licht Küche aus", „Wohnzimmer 22°").
- Touch-Variante als sichtbares Suchfeld/Button für Tablet/Handy.

## Design-System & Theming

- **Basis:** Clean & Hell — helle Flächen, weiche Schatten, 14–20px Radien, farbige
  Icon-Chips je Funktion, großzügiger Weißraum.
- **Dark Mode** über **Design-Tokens** (CSS-Variablen für Flächen/Text/Akzent/Schatten);
  ein Layout, zwei Wertesätze — deckt sich mit shadcns Variablen-Theming.
- **Theme-Quelle:** folgt automatisch dem aktiven HA-Theme (hell/dunkel) + manueller
  Toggle im Panel (pro Gerät gespeichert).
- **Responsive:** eine Ansicht skaliert Handy (1 Spalte) → Tablet → Desktop
  (Mehrspalten-Raster, auto-fit, keine Hand-Breakpoints).
- **Barrierearm:** Kontraste, Tastaturbedienung, reduced-motion respektiert.
- **Icons:** MDI (wie HA).

## Out-of-the-box — Installation & Erststart

- **Erststart ohne Konfiguration:** Panel öffnen → Engine liest Registries → fertiges
  Dashboard. Keine YAML-Karten, kein Wizard.
- **Installation (zuerst, eigenes Setup):** Bundle in `config/www/` ablegen + kleiner
  `panel_custom`-Eintrag in `configuration.yaml`; exaktes Copy-Paste-Snippet wird
  mitgeliefert.
- **Release-fähig:** saubere Struktur ohne Hardcodes; HACS-Politur (`hacs.json`,
  Repo-Struktur, Doku) als spätere Phase.
- **Robust bei fremden Setups:** unbekannte Entitäten → Fallback; leere Räume aus;
  keine Etagen → adaptiv nur Räume. Nichts bricht.

## Bewusst nicht im ersten Wurf (YAGNI)

- Floorplan/Grundriss-Ansicht (später nachrüstbar)
- Grafische Konfig-UI / Editor (Engine ist auto; Overrides erst bei echtem Bedarf)
- Vollausbau Mehrsprachigkeit (Strings zentral halten, echte i18n bei Release)
- Eigener Automatisierungen-/Szenen-Editor (macht HA)

## Qualität & Tests

- **Grouping-Engine & Klassifizierung:** Unit-Tests mit Beispiel-Registry-Daten
  (mit/ohne Etagen, Geräte- vs. Entity-Area, unbekannte Typen) — testgetrieben, höchstes
  Logik-Risiko.
- **Renderer-Registry:** Tests, dass jeder Domain-Typ den richtigen Renderer + Fallback
  bekommt.
- **Relevanz-Score:** Tests für Sortier-Stabilität (Hysterese, kein Springen).
- **Abnahme:** manuelle Verifikation am echten HA-Setup.

## Umsetzungsphasen

1. **Gerüst:** Vite + TS + Web-Component-Panel, lädt in HA, zeigt „hello hass";
   Tailwind in Shadow-Root, Portal-Container gesetzt.
2. **Datenschicht** (`ha/`): Registry-Calls + Live-States.
3. **Grouping-Engine** (testgetrieben) → Strukturbaum.
4. **Design-Tokens + Basis-Komponenten** (hell/dunkel, shadcn integriert).
5. **Smart-Control-Renderer** (Licht, Klima, Medien, Rollo, Schalter, Sensor, Fallback).
6. **Raum-/Etagen-Ansicht** (responsive Raster) zusammensetzen.
7. **Kontext-adaptives Layout** (Relevanz-Score + sanfte Umsortierung).
8. **Command-Bar & Suche** (`cmdk`).
9. **Politur:** Detail-Dialoge, Theme-Toggle, reduced-motion, leere Zustände.

## Offene Punkte (für Implementierungsplan)

- Genaue WebSocket-Subscriptions für Registry-Live-Updates (Event-Typen) verifizieren.
- Tailwind-in-Shadow-DOM Build-Setup (Vite-Plugin / Style-Inject) konkret festlegen.
- shadcn-Komponenten-Auswahl (welche kopiert werden) im Plan fixieren.
