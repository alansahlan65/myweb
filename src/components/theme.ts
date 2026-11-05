export type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "theme";
export const THEME_CHANGE_EVENT = "site-theme-change";

const THEME_SWITCH_CLASS = "theme-switching";
const THEME_SWITCH_MS = 300;

let switchTimer: ReturnType<typeof setTimeout> | undefined;

export function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
}

export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function paintThemeColor(theme: Theme) {
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta) meta.content = theme === "dark" ? "#0a0a0a" : "#ffffff";
}

export function applyTheme(theme: Theme, persist = false) {
  document.documentElement.dataset.theme = theme;
  if (persist) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Private mode can refuse storage. The attribute still updates for this visit.
    }
  }
  paintThemeColor(theme);
}

export function toggleTheme() {
  const theme = currentTheme() === "dark" ? "light" : "dark";
  const root = document.documentElement;
  // The class turns on color transitions for one fade. Applying the theme in the
  // same task keeps the press instant while every painted color eases from the
  // value on screen, and a second press simply retargets from there.
  root.classList.add(THEME_SWITCH_CLASS);
  applyTheme(theme, true);
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  clearTimeout(switchTimer);
  switchTimer = setTimeout(() => root.classList.remove(THEME_SWITCH_CLASS), THEME_SWITCH_MS);
}

/**
 * Runs in the document head before first paint. A saved choice wins; otherwise
 * the system preference decides. Keep in sync with readStoredTheme and applyTheme.
 */
export const THEME_SCRIPT = `(function(){try{var k="theme",s=localStorage.getItem(k),t=s==="light"||s==="dark"?s:(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),r=document.documentElement;r.dataset.theme=t;var m=function(){var e=document.querySelector('meta[name="theme-color"]');if(e)e.setAttribute("content",t==="dark"?"#0a0a0a":"#ffffff")};if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",m);else m()}catch(e){}})()`;
