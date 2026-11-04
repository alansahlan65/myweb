"use client";

import { useLayoutEffect, useRef } from "react";

const clamp = (value: number) => Math.max(0, Math.min(1, value));

/**
 * Drives the desktop rail between its full and compact widths with one
 * critically damped spring. The width, label collapse, character exit, and
 * icon centering all read the same progress value, so a reversal keeps the
 * current geometry and velocity instead of restarting.
 */
export function useSidebarMotion(compact: boolean) {
  const shell = useRef<HTMLDivElement>(null);
  const spring = useRef({ value: 0, velocity: 0 });
  const target = useRef(Number(compact));
  const retarget = useRef<(() => void) | null>(null);

  useLayoutEffect(() => {
    const root = shell.current;
    const sidebar = root?.querySelector<HTMLElement>(".sidebar");
    const character = root?.querySelector<HTMLElement>(".sidebar-character");
    if (!root || !sidebar) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let last = 0;
    // Critical damping, 0.36s response. Apple's default for a direct toggle.
    const omega = 2 * Math.PI / .36;

    let painted = -1;
    // The theme button rises past the toggle first, then slides across above
    // it. Staggering the two axes keeps the 44px controls from overlapping on
    // the diagonal, while each axis still eases smoothly.
    function easeStep(start: number, end: number, value: number) {
      const step = clamp((value - start) / (end - start));
      return step * step * (3 - 2 * step);
    }
    function paint() {
      // Quantize to four decimals. The custom properties drive the sidebar's
      // widths, gaps, and opacity, so a frame that repeats the same value would
      // restyle the subtree for no visual change.
      const p = Math.round(clamp(spring.current.value) * 1e4) / 1e4;
      if (p === painted) return;
      painted = p;
      // Custom properties are inherited, so writing the progress on the shell
      // would restyle the page content on every frame. Write it on the sidebar
      // instead and hand the shell only the one value it needs.
      sidebar!.style.setProperty("--rail-progress", String(p));
      sidebar!.style.setProperty("--rail-theme-rise", String(easeStep(0, .4, p)));
      sidebar!.style.setProperty("--rail-theme-slide", String(easeStep(.3, 1, p)));
      root!.style.gridTemplateColumns = `calc(var(--rail-expanded) * ${1 - p} + var(--rail-compact) * ${p}) minmax(0, 1fr)`;
      root!.dataset.sidebarProgress = String(p);
      root!.dataset.sidebarVelocity = String(spring.current.velocity);
    }

    function rest() {
      root!.dataset.sidebarMotion = "settled";
      fitCharacter();
    }

    // The artwork keeps one raster and scales instead of resizing, so the
    // blended layers are not re-rastered on every frame. Its scale must match
    // the height the row is given, which is only trustworthy while the rail is
    // expanded; mid-motion that height is the animated one.
    function fitCharacter() {
      if (!character || spring.current.value > .001) return;
      const height = character.getBoundingClientRect().height;
      character.style.setProperty("--rail-character-fit", String(Math.min(1, height / 240)));
    }

    function tick(now: number) {
      frame = 0;
      // rAF timestamps can predate a performance.now() sample taken inside the
      // click that scheduled them. A negative dt would invert the spring.
      const dt = Math.max(0, Math.min((now - last) / 1000, .1));
      last = now;
      const state = spring.current;
      const offset = state.value - target.current;
      const carried = state.velocity + omega * offset;
      const decay = Math.exp(-omega * dt);
      state.value = target.current + (offset + carried * dt) * decay;
      state.velocity = (state.velocity - omega * carried * dt) * decay;
      const settled = Math.abs(state.value - target.current) < .001 && Math.abs(state.velocity) < .01;
      if (settled) { state.value = target.current; state.velocity = 0; }
      paint();
      if (settled) rest();
      else frame = requestAnimationFrame(tick);
    }

    function update() {
      root!.dataset.sidebarState = target.current ? "compact" : "expanded";
      root!.dataset.sidebarMotion = "moving";
      if (preference.matches || document.hidden) {
        cancelAnimationFrame(frame); frame = 0;
        spring.current.value = target.current;
        spring.current.velocity = 0;
        paint(); rest();
      } else if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    }

    paint();
    retarget.current = update;
    update();
    // Measure before the first paint: a short viewport otherwise shows the
    // full-size raster cropped by the row for one frame.
    fitCharacter();
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    window.addEventListener("resize", fitCharacter);
    return () => {
      cancelAnimationFrame(frame);
      retarget.current = null;
      preference.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      window.removeEventListener("resize", fitCharacter);
    };
  }, []);

  useLayoutEffect(() => {
    target.current = Number(compact);
    retarget.current?.();
  }, [compact]);

  return shell;
}
