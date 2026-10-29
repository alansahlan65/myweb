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
    if (!root) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let last = 0;
    // Critical damping, 0.36s response. Apple's default for a direct toggle.
    const omega = 2 * Math.PI / .36;

    function paint() {
      const p = clamp(spring.current.value);
      root!.style.setProperty("--rail-progress", String(p));
      root!.dataset.sidebarProgress = String(p);
      root!.dataset.sidebarVelocity = String(spring.current.velocity);
    }

    function rest() {
      root!.dataset.sidebarMotion = "settled";
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
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      cancelAnimationFrame(frame);
      retarget.current = null;
      preference.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  useLayoutEffect(() => {
    target.current = Number(compact);
    retarget.current?.();
  }, [compact]);

  return shell;
}
