import { describe, it, expect } from "vitest";
import { categorize } from "./categorize";

describe("categorize", () => {
  it("ordnet Domains den Kategorien zu", () => {
    expect(categorize("light.kueche", null)).toBe("light");
    expect(categorize("climate.wz", null)).toBe("climate");
    expect(categorize("media_player.sonos", null)).toBe("media");
    expect(categorize("cover.rollo", null)).toBe("cover");
    expect(categorize("switch.steckdose", null)).toBe("switch");
    expect(categorize("fan.bad", null)).toBe("switch");
    expect(categorize("lock.tuer", null)).toBe("security");
    expect(categorize("sensor.temp", null)).toBe("sensor");
  });

  it("nutzt device_class von binary_sensor zur Sicherheits-Einordnung", () => {
    expect(categorize("binary_sensor.fenster", "window")).toBe("security");
    expect(categorize("binary_sensor.tuer", "door")).toBe("security");
    expect(categorize("binary_sensor.bewegung", "motion")).toBe("sensor");
    expect(categorize("binary_sensor.x", null)).toBe("sensor");
  });

  it("fällt für unbekannte Domains auf 'other' zurück", () => {
    expect(categorize("weather.home", null)).toBe("other");
    expect(categorize("foobar.baz", null)).toBe("other");
  });
});
