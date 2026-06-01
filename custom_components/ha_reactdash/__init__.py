from __future__ import annotations

import os

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import (
    DOMAIN,
    PANEL_ICON,
    PANEL_TITLE,
    PANEL_URL_PATH,
    STATIC_URL_BASE,
    WEBCOMPONENT_NAME,
)


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Register the static asset path and the custom sidebar panel."""
    domain_data = hass.data.setdefault(DOMAIN, {})

    if not domain_data.get("static_registered"):
        frontend_dir = os.path.join(os.path.dirname(__file__), "frontend")
        await hass.http.async_register_static_paths(
            [StaticPathConfig(STATIC_URL_BASE, frontend_dir, False)]
        )
        domain_data["static_registered"] = True

    await panel_custom.async_register_panel(
        hass,
        frontend_url_path=PANEL_URL_PATH,
        webcomponent_name=WEBCOMPONENT_NAME,
        module_url=f"{STATIC_URL_BASE}/ha-reactdash.js",
        sidebar_title=PANEL_TITLE,
        sidebar_icon=PANEL_ICON,
        require_admin=False,
    )
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Remove the panel when the integration is unloaded."""
    frontend.async_remove_panel(hass, PANEL_URL_PATH)
    return True
