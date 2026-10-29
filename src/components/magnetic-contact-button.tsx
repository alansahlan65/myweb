"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Liquid } from "liquid-gooey";
import { ContactTrigger, useContactOpen } from "./contact";
import styles from "./magnetic-contact-button.module.css";

type Spring = { value: number; velocity: number; target: number };
const spring = (): Spring => ({ value: 0, velocity: 0, target: 0 });
const clamp = (value: number, limit: number) => Math.max(-limit, Math.min(value, limit));
function advance(s: Spring, dt: number) {
  s.velocity += ((s.target - s.value) * 100 - s.velocity * 14) * dt;
  s.value += s.velocity * dt;
  if (Math.abs(s.target - s.value) < .001 && Math.abs(s.velocity) < .005) {
    s.value = s.target; s.velocity = 0; return false;
  }
  return true;
}

export function MagneticContactButton({ variant = "arrow", title }: { variant?: "arrow" | "pill"; title?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const surface = useRef<HTMLSpanElement>(null);
  const icon = useRef<HTMLSpanElement>(null);
  const [enhanced, setEnhanced] = useState(false);
  const modalOpen = useContactOpen();

  useEffect(() => {
    const container = root.current;
    const trigger = container?.querySelector("button");
    if (!container || !trigger) return;
    const motion = matchMedia("(prefers-reduced-motion: no-preference) and (forced-colors: none)");
    const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
    const x = spring(), y = spring(), press = spring();
    const springs = [x, y, press];
    let visible = false;
    let held = false;
    let frame = 0;
    let last = 0;
    let rect = container.getBoundingClientRect();
    const alive = () => motion.matches && visible && !document.hidden && !modalOpen;

    function render(now: number) {
      frame = 0;
      if (!alive()) return;
      const dt = Math.min((now - (last || now - 16)) / 1000, .032);
      last = now;
      let settling = false;
      for (const s of springs) if (advance(s, dt)) settling = true;
      const diameter = Math.min(rect.width, rect.height);
      const dx = clamp(x.value, diameter * .21);
      const dy = clamp(y.value, diameter * .21);
      const squash = clamp(press.value, 1.1);
      // Liquid observes only this silhouette. Text and icons stay crisp above it.
      if (surface.current) surface.current.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(${1 + squash * .07}, ${1 - squash * .1})`;
      if (icon.current) icon.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      if (settling) frame = requestAnimationFrame(render);
      else container!.dataset.settled = "true";
    }
    function schedule() {
      if (!alive() || frame) return;
      container!.dataset.settled = "false";
      last = 0; frame = requestAnimationFrame(render);
    }
    function move(event: PointerEvent) {
      if (event.pointerType !== "mouse" || !finePointer.matches || !alive()) return;
      rect = container!.getBoundingClientRect();
      const dx = event.clientX - rect.left - rect.width / 2;
      const dy = event.clientY - rect.top - rect.height / 2;
      const distance = Math.hypot(dx, dy);
      const pull = Math.min(.35, Math.min(rect.width, rect.height) * .18 / Math.max(distance, 1));
      x.target = dx * pull; y.target = dy * pull;
      container!.dataset.magnetic = "true";
      schedule();
    }
    function release() {
      if (!held) return;
      held = false; press.target = 0;
      press.velocity = clamp(press.velocity + (press.value < .35 ? 7 : -4), 10);
      container!.dataset.pressed = "false";
      schedule();
    }
    function leave() {
      x.target = y.target = 0;
      container!.dataset.magnetic = "false";
      release(); schedule();
    }
    function down(event: PointerEvent) {
      if (event.button !== 0 || !alive()) return;
      held = true; press.target = 1;
      container!.dataset.pressed = "true";
      schedule();
    }
    function keyDown(event: KeyboardEvent) {
      if (event.repeat || !alive() || (event.key !== " " && event.key !== "Enter")) return;
      held = true; press.target = 1;
      container!.dataset.pressed = "true";
      schedule();
    }
    function keyUp(event: KeyboardEvent) { if (event.key === " " || event.key === "Enter") release(); }
    function reset() {
      cancelAnimationFrame(frame); frame = 0; held = false;
      for (const s of springs) s.value = s.velocity = s.target = 0;
      if (surface.current) surface.current.style.transform = "none";
      if (icon.current) icon.current.style.transform = "none";
      container!.dataset.magnetic = container!.dataset.pressed = "false";
      container!.dataset.settled = "true";
    }
    function sync() {
      reset(); setEnhanced(alive());
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(container);
    sync();
    trigger.addEventListener("pointermove", move);
    trigger.addEventListener("pointerleave", leave);
    trigger.addEventListener("pointerdown", down);
    trigger.addEventListener("pointerup", release);
    trigger.addEventListener("pointercancel", leave);
    trigger.addEventListener("blur", leave);
    trigger.addEventListener("keydown", keyDown);
    trigger.addEventListener("keyup", keyUp);
    window.addEventListener("pointerup", release);
    window.addEventListener("blur", reset);
    window.addEventListener("scroll", leave, { passive: true, capture: true });
    window.addEventListener("resize", sync);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    finePointer.addEventListener("change", sync);
    return () => {
      observer.disconnect(); reset();
      trigger.removeEventListener("pointermove", move);
      trigger.removeEventListener("pointerleave", leave);
      trigger.removeEventListener("pointerdown", down);
      trigger.removeEventListener("pointerup", release);
      trigger.removeEventListener("pointercancel", leave);
      trigger.removeEventListener("blur", leave);
      trigger.removeEventListener("keydown", keyDown);
      trigger.removeEventListener("keyup", keyUp);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("blur", reset);
      window.removeEventListener("scroll", leave, true);
      window.removeEventListener("resize", sync);
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
      finePointer.removeEventListener("change", sync);
    };
  }, [modalOpen]);

  return (
    <div ref={root} className={`${styles.magnet} ${variant === "pill" ? styles.pill : ""}`} data-variant={variant} data-enhanced={enhanced} data-magnetic="false" data-pressed="false" data-settled="true">
      <span className={styles.fallback} aria-hidden="true" />
      {enhanced ? <Liquid className={styles.liquid} fill="var(--magnetic-fill)" blur={5} contrast={24} filterPadding={32} aria-hidden="true">
        <Liquid.Item effect="move" move={{ springiness: .88, wobble: .06, stretch: .03, trail: 0 }}>
          <span ref={surface} className={styles.surface} />
        </Liquid.Item>
      </Liquid> : null}
      <ContactTrigger className={styles.trigger} label="Get in touch" title={title}>
        <span ref={icon} className={styles.icon}>{variant === "pill" ? <><MessageCircle size={16} aria-hidden="true" /><span className={styles.pillLabel}>Get in touch</span></> : <ArrowUpRight size={28} aria-hidden="true" />}</span>
      </ContactTrigger>
    </div>
  );
}
