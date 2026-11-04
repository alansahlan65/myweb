"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import {
  THEME_CHANGE_EVENT,
  applyTheme,
  currentTheme,
  readStoredTheme,
  toggleTheme,
} from "./theme";

function subscribe(onChange: () => void) {
  const system = matchMedia("(prefers-color-scheme: dark)");
  function followSystem() {
    if (readStoredTheme()) return;
    applyTheme(system.matches ? "dark" : "light");
    onChange();
  }
  window.addEventListener(THEME_CHANGE_EVENT, onChange);
  system.addEventListener("change", followSystem);
  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, onChange);
    system.removeEventListener("change", followSystem);
  };
}

const isDark = () => currentTheme() === "dark";
const serverIsDark = () => false;

export function ThemeToggle({ className }: { className?: string }) {
  const dark = useSyncExternalStore(subscribe, isDark, serverIsDark);
  const action = dark ? "Switch to light theme" : "Switch to dark theme";
  return (
    <button
      type="button"
      className={className ? `theme-toggle ${className}` : "theme-toggle"}
      onClick={toggleTheme}
      aria-label="Dark mode"
      aria-pressed={dark}
      title={action}
    >
      <span className="theme-toggle-glyph" aria-hidden="true">
        <Moon className="theme-icon theme-icon-moon" size={16} />
        <Sun className="theme-icon theme-icon-sun" size={16} />
      </span>
    </button>
  );
}
