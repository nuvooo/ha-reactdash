# ha-reactdash

Selbst-gruppierendes Visualisierungs-Panel für Home Assistant. Baut dein Dashboard
automatisch aus deinen Räumen/Etagen — out of the box, ohne manuelle Kartenkonfiguration.

## Installation über HACS (empfohlen, Plug-and-Play)

1. In Home Assistant: **HACS → oben rechts ⋮ → Custom repositories**.
2. Repository-URL `https://github.com/nuvooo/ha-reactdash` eintragen, Kategorie **Integration**, hinzufügen.
3. **ha-reactdash** in HACS suchen und **installieren**.
4. Home Assistant **neu starten**.
5. **Einstellungen → Geräte & Dienste → Integration hinzufügen → ha-reactdash**.
6. Fertig — **ReactDash** erscheint in der Seitenleiste.

## Manuelle Installation (Alternative)

Siehe [`INSTALL.md`](./INSTALL.md): gebautes `dist/ha-reactdash.js` nach
`config/www/ha-reactdash/` kopieren und einen `panel_custom`-Eintrag setzen.

## Entwicklung

```bash
npm install
npm test
npm run build   # erzeugt dist/ und kopiert das Bundle in die Integration
```

## Status

Meilenstein 1: adaptive Auto-Gruppierung (Etagen → Räume → Funktionsgruppen).
Design-System, Smart-Controls, adaptives Layout und Suche folgen in weiteren Meilensteinen.
