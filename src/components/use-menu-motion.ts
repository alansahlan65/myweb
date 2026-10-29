"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";

const clamp = (value: number) => Math.max(0, Math.min(1, value));

export function useMenuMotion(expanded: boolean, trigger: RefObject<HTMLButtonElement | null>, onClosed: () => void) {
  const panel = useRef<HTMLDivElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);
  const surface = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  const spring = useRef({ value: 0, velocity: 0 });
  const target = useRef(Number(expanded));
  const retarget = useRef<(() => void) | null>(null);

  useLayoutEffect(() => {
    const popup = panel.current, scrim = backdrop.current, window = surface.current, content = layer.current;
    if (!popup || !scrim || !window || !content || !trigger.current) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const reveals = [...popup.querySelectorAll<HTMLElement>("[data-menu-reveal]")];
    const strokes = [...popup.querySelectorAll<HTMLElement>("[data-menu-stroke]")];
    let width = 0, height = 0, leading = 0;
    let frame = 0, last = 0;
    // Critical damping, 0.3s response. The live value and velocity survive a reversal.
    const omega = 2 * Math.PI / .3;

    function paint() {
      const p = clamp(spring.current.value);
      const geometry = preference.matches ? 1 : p;
      const sx = (44 + (width - 44) * geometry) / width;
      const sy = (44 + (height - 44) * geometry) / height;
      const x = leading * (1 - geometry), y = 16 * (1 - geometry);
      window!.style.transform = `matrix(${sx}, 0, 0, ${sy}, ${x}, ${y})`;
      window!.style.borderRadius = `${(22 - 6 * geometry) / sx}px / ${(22 - 6 * geometry) / sy}px`;
      // Invert the window scale so glyphs and the fixed close target never stretch.
      content!.style.transform = `matrix(${1 / sx}, 0, 0, ${1 / sy}, ${-x / sx}, ${-y / sy})`;
      scrim!.style.opacity = String(p);
      popup!.style.opacity = String(preference.matches ? p : 1);
      popup!.dataset.menuProgress = String(p);
      popup!.dataset.menuVelocity = String(spring.current.velocity);
      for (const [index, element] of reveals.entries()) {
        const start = .55 + index * .07;
        const reveal = preference.matches ? 1 : clamp((p - start) / (1 - start));
        element.style.opacity = String(reveal);
        element.style.transform = reveal === 1 ? "none" : `translate3d(0, ${(1 - reveal) * 8}px, 0)`;
      }
      for (const [index, stroke] of strokes.entries()) {
        const direction = index === 0 ? 1 : -1;
        stroke.style.transform = `translateY(${-direction * 3.5 * (1 - geometry)}px) rotate(${direction * 45 * geometry}deg)`;
      }
    }

    function measure() {
      const source = trigger.current!.getBoundingClientRect();
      const rtl = getComputedStyle(popup!).direction === "rtl";
      const edge = Math.max(4, (rtl ? source.left : globalThis.innerWidth - source.right) - 16);
      const top = Math.max(4, source.top - 16);
      const gutter = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--page-gutter"));
      width = Math.min(420, globalThis.innerWidth - edge * 2);
      height = Math.min(520, globalThis.innerHeight - top - gutter);
      leading = rtl ? 16 : width - 60;
      popup!.style.insetBlockStart = `${top}px`;
      popup!.style.insetInlineEnd = `${edge}px`;
      popup!.style.inlineSize = `${width}px`;
      popup!.style.blockSize = `${height}px`;
      paint();
    }

    function rest() {
      popup!.dataset.motionState = target.current ? "open" : "closed";
      window!.style.removeProperty("will-change");
      content!.style.removeProperty("will-change");
      if (!target.current) onClosed();
    }

    function tick(now: number) {
      frame = 0;
      // rAF timestamps can predate a performance.now() sample taken inside the
      // click that scheduled them. A negative dt would invert the spring.
      const dt = Math.max(0, Math.min((now - last) / 1000, .04));
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
      popup!.dataset.motionState = target.current ? "opening" : "closing";
      // Repaint at retarget so the exposed progress and velocity describe the
      // spring before the next frame runs. Reversals keep both values.
      paint();
      if (preference.matches || document.hidden) {
        cancelAnimationFrame(frame); frame = 0;
        spring.current.value = target.current;
        spring.current.velocity = 0;
        paint(); rest();
      } else if (!frame) {
        window!.style.willChange = content!.style.willChange = "transform";
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    }

    measure();
    retarget.current = update;
    update();
    globalThis.addEventListener("resize", measure);
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      cancelAnimationFrame(frame);
      retarget.current = null;
      globalThis.removeEventListener("resize", measure);
      preference.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, [trigger, onClosed]);

  useLayoutEffect(() => { target.current = Number(expanded); retarget.current?.(); }, [expanded]);
  return { panel, backdrop, surface, layer };
}
