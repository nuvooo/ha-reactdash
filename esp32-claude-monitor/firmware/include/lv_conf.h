// Minimal lv_conf.h fuer LVGL 8.3 auf ESP32-C6.
// Nicht gesetzte Optionen fallen ueber lv_conf_internal.h auf sinnvolle
// Defaults zurueck. Bei Bedarf vollstaendige Vorlage aus lvgl/lv_conf_template.h
// uebernehmen.
#if 1
#ifndef LV_CONF_H
#define LV_CONF_H

#include <stdint.h>

// 16-Bit-Farbe (RGB565), passend zum ST7789 / Arduino_GFX.
#define LV_COLOR_DEPTH 16

// Speicher: LVGL eigener Allocator. Fuer den C6 moderat dimensioniert.
#define LV_MEM_CUSTOM 0
#define LV_MEM_SIZE (48U * 1024U)

// Tick-Quelle: Arduino millis().
#define LV_TICK_CUSTOM 1
#define LV_TICK_CUSTOM_INCLUDE "Arduino.h"
#define LV_TICK_CUSTOM_SYS_TIME_EXPR (millis())

#define LV_USE_PERF_MONITOR 0
#define LV_USE_LOG 0

// Genutzte Schriftgroessen (Defaults aktivieren nur Montserrat 14).
#define LV_FONT_MONTSERRAT_14 1
#define LV_FONT_MONTSERRAT_20 1
#define LV_FONT_MONTSERRAT_28 1
#define LV_FONT_MONTSERRAT_48 1
#define LV_FONT_DEFAULT &lv_font_montserrat_14

// Genutzte Widgets (die meisten sind ohnehin Default-an).
#define LV_USE_ARC   1
#define LV_USE_BAR   1
#define LV_USE_LABEL 1
#define LV_USE_IMG   1
#define LV_USE_ANIMIMG 1

#endif // LV_CONF_H
#endif // #if 1
