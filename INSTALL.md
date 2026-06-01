# ha-reactdash — Installation (Meilenstein 1)

1. Build erzeugen:

   ```bash
   npm install
   npm run build
   ```

2. Die Datei `dist/ha-reactdash.js` nach Home Assistant kopieren, in den Ordner
   `config/www/ha-reactdash/`. (Den Ordner `www` ggf. anlegen — er wird unter der
   URL `/local/` ausgeliefert.)

   Ziel: `config/www/ha-reactdash/ha-reactdash.js`

3. In `configuration.yaml` ergänzen:

   ```yaml
   panel_custom:
     - name: ha-reactdash
       sidebar_title: ReactDash
       sidebar_icon: mdi:view-dashboard
       url_path: reactdash
       module_url: /local/ha-reactdash/ha-reactdash.js
   ```

4. Home Assistant neu starten (oder „YAML-Konfiguration neu laden", falls verfügbar).

5. In der Seitenleiste erscheint **ReactDash**. Öffnen.
