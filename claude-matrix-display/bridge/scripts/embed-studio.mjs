// Backt studio/index.html in ein JS-Modul (studio.generated.js), damit die
// gepackte Standalone-App keine externe Datei braucht. Wird vor dem Build
// ausgeführt (npm run build).
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(here, "..", "..", "studio", "index.html");
const outPath = path.join(here, "..", "studio.generated.js");

const html = readFileSync(htmlPath, "utf8");
writeFileSync(outPath, `// AUTO-GENERIERT von scripts/embed-studio.mjs – nicht editieren.\nexport const STUDIO_HTML = ${JSON.stringify(html)};\n`);
console.log(`[embed] ${htmlPath} -> ${outPath} (${html.length} bytes)`);
