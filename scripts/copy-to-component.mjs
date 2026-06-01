import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const src = join("dist", "ha-reactdash.js");
const dest = join("custom_components", "ha_reactdash", "frontend", "ha-reactdash.js");
mkdirSync(dirname(dest), { recursive: true });
copyFileSync(src, dest);
console.log("Copied bundle ->", dest);
