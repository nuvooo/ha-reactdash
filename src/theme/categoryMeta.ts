import type { FunctionCategory } from "../grouping/types";

interface CategoryMeta {
  label: string;
  icon: string;
}

export const CATEGORY_META: Record<FunctionCategory, CategoryMeta> = {
  light: { label: "Licht", icon: "💡" },
  climate: { label: "Klima", icon: "🌡️" },
  media: { label: "Medien", icon: "🎵" },
  cover: { label: "Rollos", icon: "🪟" },
  switch: { label: "Schalter", icon: "🔌" },
  security: { label: "Sicherheit", icon: "🔒" },
  sensor: { label: "Sensoren", icon: "📈" },
  other: { label: "Sonstiges", icon: "⚙️" },
};
