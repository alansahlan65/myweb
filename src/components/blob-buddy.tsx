"use client";

import { useEffect, useRef } from "react";
import { useContactOpen } from "./contact";
import styles from "./blob-buddy.module.css";

const BODY = "M27.645 8.0025c-0.2775-0.345-0.27-0.7275 0-1.0125 0.435-0.45 0.6975-1.0575 0.6975-1.8075 0-1.47-1.245-2.6025-2.6325-2.6025-0.675 0-1.3125 0.2475-1.785 0.645-1.095 0.9075-2.85 0.21-4.3425-0.8625-1.9875-1.4625-4.545-2.3625-6.9825-2.3625-5.5425 0-10.8 4.095-10.8 11.76 0 0.8925 0.03 1.7175 0.015 2.61-0.0225 2.1075-0.4575 3.9-1.0275 5.6925-0.5025 1.5525-0.7875 3.09-0.7875 4.5 0 5.505 4.2975 9.7125 17.025 9.7125 4.38 0 8.0175-0.525 10.7175-1.8 4.125-1.935 6.3675-5.745 6.3675-9.855 0-5.37-3.825-11.4375-6.465-14.6175z";
const smoothstep = (n: number) => { const t = Math.max(0, Math.min(1, n)); return t * t * (3 - 2 * t); };
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
const randomBetween = (min: number, max: number) => min + Math.random() * (max - min);
type Spring = { value: number; velocity: number; target: number; stiffness: number; damping: number };
const spring = (stiffness = 100, damping = 10): Spring => ({ value: 0, velocity: 0, target: 0, stiffness, damping });
function advance(s: Spring, dt: number) {
  s.velocity += ((s.target - s.value) * s.stiffness - s.velocity * s.damping) * dt;
  s.value += s.velocity * dt;
  if (Math.abs(s.target - s.value) < .001 && Math.abs(s.velocity) < .005) {
    s.value = s.target; s.velocity = 0; return false;
  }
  return true;
}
type Point = { x: number; y: number };
type Blink = "quick" | "double" | "soft";
type Controls = {
  press: (point?: Point) => void; release: () => void; cancel: () => void; pulse: () => void;
  attend: (over: boolean) => void; focus: (focused: boolean) => void; wake: () => void;
};

// Restrained idle looks: toward the name, toward the page, up, and down.
const IDLE_LOOKS: Point[] = [
  { x: -2.3, y: -.5 },
  { x: 2.3, y: -.7 },
  { x: .5, y: -2 },
  { x: -1.4, y: 1.2 },
  { x: 1.6, y: 1 },
  { x: -2, y: 1 },
];

export function BlobBuddy() {
  const button = useRef<HTMLButtonElement>(null);
  const motion = useRef<HTMLDivElement>(null);
  const eyes = useRef<SVGGElement>(null);
  const expression = useRef<SVGGElement>(null);
  const blinkLayer = useRef<SVGGElement>(null);
  const pressLayer = useRef<HTMLDivElement>(null);
  const controls = useRef<Controls | null>(null);
  const greeted = useRef(false);
  const modalWasOpen = useRef(false);
  const modalOpen = useContactOpen();

  useEffect(() => {
    const trigger = button.current;
    const moving = motion.current;
    const pupils = eyes.current;
    const face = expression.current;
    const lids = blinkLayer.current;
    const jelly = pressLayer.current;
    if (!trigger || !moving || !pupils || !face || !lids || !jelly) return;
    const justClosed = modalWasOpen.current && !modalOpen;
    modalWasOpen.current = modalOpen;
    const pointerPreference = matchMedia("(hover: hover) and (pointer: fine)");
    const motionPreference = matchMedia("(prefers-reduced-motion: no-preference) and (forced-colors: none)");
    let visible = true;
    let frame = 0;
    let last = 0;
    let dirty = true;
    let rect = trigger.getBoundingClientRect();
    let pointer: Point | null = null;
    let lastPointer: Point | null = null;
    let over = false;
    let focused = false;
    let held = false;
    let heldSince = 0;
    let releasedAt = -Infinity;
    let idleTimer = 0;
    let blinkTimer = 0;
    let secondBlinkTimer = 0;
    let gazeReturn = 0;
    let reliefTimer = 0;
    let originTimer = 0;
    let wakeTimer = 0;
    const blinks = new Set<Animation>();
    const dynamics = {
      tilt: spring(),
      eyeX: spring(),
      eyeY: spring(),
      gazeX: spring(38, 12),
      gazeY: spring(38, 12),
      pressX: spring(),
      pressY: spring(),
      attention: spring(),
      squash: spring(),
      wobble: spring(),
      pop: spring(150, 15),
      focusTilt: spring(70, 12),
    };
    const springs = Object.values(dynamics);
    const alive = () => motionPreference.matches && visible && !document.hidden && !modalOpen;

    function render(now: number) {
      frame = 0;
      if (!alive()) return;
      if (dirty) { rect = trigger!.getBoundingClientRect(); dirty = false; }
      if (pointer && pointerPreference.matches) {
        const dx = pointer.x - rect.left - rect.width / 2;
        const dy = pointer.y - rect.top - rect.height / 2;
        const distance = Math.hypot(dx, dy);
        const strength = smoothstep((distance - 24) / 72) * (1 - smoothstep((distance - 192) / 48));
        const x = distance ? dx / distance : 0;
        const y = distance ? dy / distance : 0;
        dynamics.tilt.target = x * strength * 5;
        dynamics.eyeX.target = x * strength * 3;
        dynamics.eyeY.target = y * strength * 3;
        const mode = distance > 24 && distance < 240 ? "tracking" : "idle";
        if (mode === "tracking") {
          dynamics.gazeX.target = 0;
          dynamics.gazeY.target = 0;
        }
        if (trigger!.dataset.mode !== mode) trigger!.dataset.mode = mode;
      }
      const dt = Math.min((now - (last || now - 16)) / 1000, .032);
      last = now;
      let settling = false;
      for (const s of springs) if (advance(s, dt)) settling = true;
      const attention = clamp(dynamics.attention.value, 0, 1.1);
      const squash = clamp(dynamics.squash.value, -.4, 1.1);
      const wobble = clamp(dynamics.wobble.value, -6, 6);
      const tilt = clamp(dynamics.tilt.value, -5, 5);
      const cock = clamp(dynamics.focusTilt.value, -2.6, 2.6);
      const pop = clamp(dynamics.pop.value, -1.4, 1.4);
      const eyeX = clamp(dynamics.eyeX.value + dynamics.gazeX.value + dynamics.pressX.value, -3, 3);
      const eyeY = clamp(dynamics.eyeY.value + dynamics.gazeY.value + dynamics.pressY.value - attention * .7, -3, 3);
      moving!.style.transform = `translateY(${-attention * .8}px) rotate(${clamp(tilt + cock, -6, 6)}deg)`;
      jelly!.style.transform = `translateY(${Math.min(0, squash) * 4}px) scale(${1 + squash * .18}, ${1 - squash * .24}) skewX(${wobble}deg)`;
      pupils!.setAttribute("transform", `translate(${eyeX} ${eyeY})`);
      face!.setAttribute("transform", `translate(31 30) rotate(${(tilt + cock) * .3}) scale(${1 + attention * .06 + Math.max(0, squash) * .1 + pop * .05} ${1 + attention * .12 - Math.max(0, squash) * .3 + pop * .12}) translate(-31 -30)`);
      const reaction = held ? "pressed" : Math.abs(squash) > .008 ? "jelly" : over || focused ? "curious" : "idle";
      if (trigger!.dataset.reaction !== reaction) trigger!.dataset.reaction = reaction;
      if (settling) frame = requestAnimationFrame(render);
    }
    function schedule() { if (alive() && !frame) { last = 0; frame = requestAnimationFrame(render); } }
    function move(event: PointerEvent) {
      if (event.pointerType !== "mouse" || !pointerPreference.matches || !alive()) return;
      pointer = { x: event.clientX, y: event.clientY };
      lastPointer = pointer;
      schedule();
    }
    function measure() { dirty = true; schedule(); }
    function cancel() {
      const wasHeld = held;
      held = false;
      dynamics.squash.target = 0;
      dynamics.pressX.target = dynamics.pressY.target = 0;
      if (wasHeld) clearTimeout(reliefTimer);
      schedule();
    }
    function reset() {
      pointer = null; lastPointer = null; over = false; cancel();
      clearTimeout(gazeReturn);
      clearTimeout(reliefTimer);
      dynamics.tilt.target = dynamics.eyeX.target = dynamics.eyeY.target = 0;
      dynamics.gazeX.target = dynamics.gazeY.target = 0;
      dynamics.focusTilt.target = 0;
      dynamics.pop.target = 0; dynamics.pop.velocity = 0;
      dynamics.attention.target = Number(focused);
      trigger!.dataset.mode = "idle"; schedule();
    }
    function press(point?: Point) {
      if (!alive() || held) return;
      held = true; heldSince = performance.now();
      clearTimeout(originTimer);
      const box = trigger!.getBoundingClientRect();
      if (point) {
        const nx = clamp((point.x - box.left) / box.width, .2, .8);
        const ny = clamp((point.y - box.top) / box.height, .3, .95);
        jelly!.style.transformOrigin = `${nx * 100}% ${ny * 100}%`;
        dynamics.pressX.target = clamp((point.x - box.left - box.width / 2) / 10, -2.6, 2.6);
        dynamics.pressY.target = clamp((point.y - box.top - box.height / 2) / 10, -2.4, 2.4);
      } else {
        jelly!.style.transformOrigin = "50% 82%";
        dynamics.pressX.target = 0;
        dynamics.pressY.target = 1.2;
      }
      dynamics.squash.target = 1;
      dynamics.pop.velocity = clamp(dynamics.pop.velocity - 8, -30, 30);
      trigger!.dataset.reaction = "pressed"; schedule();
    }
    function release() {
      if (!held) return;
      const heldFor = performance.now() - heldSince;
      held = false; releasedAt = performance.now(); dynamics.squash.target = 0;
      // A quick tap still compresses; a held press releases into a stretch.
      dynamics.squash.velocity = clamp(dynamics.squash.velocity + (dynamics.squash.value < .35 ? 7 : -4), -10, 10);
      dynamics.wobble.velocity = clamp(dynamics.wobble.velocity + 55, -70, 70);
      dynamics.pop.velocity = clamp(dynamics.pop.velocity + 26, -30, 40);
      dynamics.pressX.target = dynamics.pressY.target = 0;
      originTimer = window.setTimeout(() => { jelly!.style.transformOrigin = "50% 82%"; }, 620);
      if (heldFor > 700) {
        clearTimeout(reliefTimer);
        reliefTimer = window.setTimeout(() => { if (alive() && !held) blink("soft"); }, 360);
      }
      schedule();
    }
    function pulse() {
      if (!alive() || held || performance.now() - releasedAt < 120) return;
      dynamics.squash.velocity = clamp(dynamics.squash.velocity + 7, -10, 10);
      dynamics.wobble.velocity = clamp(dynamics.wobble.velocity + 55, -70, 70);
      schedule();
    }
    function lookAfter() {
      if (!lastPointer) return;
      const box = trigger!.getBoundingClientRect();
      const dx = lastPointer.x - box.left - box.width / 2;
      const dy = lastPointer.y - box.top - box.height / 2;
      const distance = Math.hypot(dx, dy) || 1;
      dynamics.gazeX.target = clamp(dx / distance * 1.5, -1.6, 1.6);
      dynamics.gazeY.target = clamp(dy / distance * 1.2, -1.3, 1.3);
      schedule();
      clearTimeout(gazeReturn);
      gazeReturn = window.setTimeout(() => {
        dynamics.gazeX.target = dynamics.gazeY.target = 0; schedule();
      }, 650);
    }
    function attend(next: boolean) {
      if (!pointerPreference.matches) return;
      over = next; dynamics.attention.target = Number(over || focused);
      dynamics.wobble.velocity = clamp(dynamics.wobble.velocity + (next ? 22 : -14), -70, 70);
      if (next) {
        clearTimeout(gazeReturn);
        dynamics.gazeX.target = dynamics.gazeY.target = 0;
        dynamics.pop.velocity += 6;
      } else if (!focused) {
        lookAfter();
      }
      schedule();
    }
    function blink(kind: Blink = "quick") {
      if (!lids || !alive() || held) return;
      for (const animation of blinks) animation.cancel();
      blinks.clear();
      const soft = kind === "soft";
      const close = soft ? 170 : 80;
      const shut = soft ? 110 : 24;
      const open = soft ? 300 : 130;
      const depth = soft ? .22 : .06;
      const total = close + shut + open;
      const animation = lids.animate([
        { transform: "scaleY(1)", offset: 0, easing: "cubic-bezier(.4, 0, 1, 1)" },
        { transform: `scaleY(${depth})`, offset: close / total, easing: "linear" },
        { transform: `scaleY(${depth})`, offset: (close + shut) / total, easing: "cubic-bezier(.23, 1, .32, 1)" },
        { transform: "scaleY(1)", offset: 1 },
      ], { duration: total });
      blinks.add(animation);
      animation.onfinish = () => { blinks.delete(animation); animation.cancel(); };
      if (kind === "double") {
        clearTimeout(secondBlinkTimer);
        secondBlinkTimer = window.setTimeout(() => blink("quick"), total + 120);
      }
    }
    function scheduleBlink(delay = randomBetween(2600, 6200)) {
      clearTimeout(blinkTimer);
      blinkTimer = window.setTimeout(function tick() {
        if (!alive()) return;
        if (held) { blinkTimer = window.setTimeout(tick, 1200); return; }
        const roll = Math.random();
        blink(roll < .16 ? "double" : roll < .3 ? "soft" : "quick");
        scheduleBlink(roll < .16 ? randomBetween(3800, 6800) : randomBetween(2400, 5800));
      }, delay);
    }
    function scheduleIdle(delay = randomBetween(4200, 8200)) {
      clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        if (!alive() || held) { scheduleIdle(2400); return; }
        const tracking = trigger!.dataset.mode === "tracking";
        const attentive = over || focused;
        if (!tracking && !attentive) {
          const roll = Math.random();
          if (roll < .5) {
            const look = IDLE_LOOKS[Math.floor(Math.random() * IDLE_LOOKS.length)];
            dynamics.gazeX.target = look.x; dynamics.gazeY.target = look.y;
            schedule();
            clearTimeout(gazeReturn);
            gazeReturn = window.setTimeout(() => {
              dynamics.gazeX.target = dynamics.gazeY.target = 0; schedule();
            }, randomBetween(1100, 2500));
          } else if (roll < .82) {
            dynamics.wobble.velocity = clamp(dynamics.wobble.velocity + (Math.random() < .5 ? -16 : 16), -70, 70);
            schedule();
          } else {
            dynamics.attention.velocity += 2.2;
            dynamics.squash.velocity = clamp(dynamics.squash.velocity - 1.2, -10, 10);
            schedule();
          }
        }
        scheduleIdle();
      }, delay);
    }
    function wake() {
      if (!alive()) return;
      dynamics.attention.velocity = clamp(dynamics.attention.velocity + 2.6, -4, 6);
      dynamics.wobble.velocity = clamp(dynamics.wobble.velocity + 10, -70, 70);
      schedule();
      clearTimeout(wakeTimer);
      wakeTimer = window.setTimeout(() => blink("double"), 180);
    }
    controls.current = {
      press: point => press(point),
      release,
      cancel,
      pulse,
      attend,
      focus: next => {
        focused = next; dynamics.attention.target = Number(over || focused);
        dynamics.focusTilt.target = next ? 2.2 : 0;
        if (next) {
          clearTimeout(gazeReturn);
          dynamics.gazeX.target = dynamics.gazeY.target = 0;
          dynamics.pop.velocity += 8;
        }
        if (!next) cancel();
        schedule();
      },
      wake,
    };
    function sync() {
      trigger!.dataset.paused = String(!alive());
      // Client-only marker: proves the effect and its listeners are attached.
      trigger!.dataset.hydrated = "true";
      if (!alive()) {
        cancelAnimationFrame(frame); frame = 0; pointer = null; held = over = focused = false;
        clearTimeout(idleTimer); clearTimeout(blinkTimer); clearTimeout(secondBlinkTimer);
        clearTimeout(gazeReturn); clearTimeout(reliefTimer); clearTimeout(originTimer); clearTimeout(wakeTimer);
        for (const animation of blinks) animation.cancel();
        blinks.clear();
        for (const s of springs) s.value = s.velocity = s.target = 0;
        moving!.style.transform = jelly!.style.transform = "none";
        jelly!.style.transformOrigin = "50% 82%";
        pupils!.setAttribute("transform", "translate(0 0)"); face!.removeAttribute("transform");
        trigger!.dataset.mode = "idle";
        trigger!.dataset.reaction = "idle";
      } else {
        if (!pointerPreference.matches) reset();
        dirty = true; schedule();
        scheduleBlink();
        scheduleIdle();
        if (!greeted.current) {
          greeted.current = true;
          wakeTimer = window.setTimeout(() => blink("double"), 520);
        }
      }
    }
    function visibility() {
      sync();
      if (!document.hidden) wake();
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(trigger);
    sync();
    if (justClosed) wakeTimer = window.setTimeout(() => wake(), 120);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("blur", reset);
    document.documentElement.addEventListener("pointerleave", reset);
    document.addEventListener("visibilitychange", visibility);
    pointerPreference.addEventListener("change", sync);
    motionPreference.addEventListener("change", sync);
    return () => {
      controls.current = null;
      observer.disconnect(); cancelAnimationFrame(frame);
      clearTimeout(idleTimer); clearTimeout(blinkTimer); clearTimeout(secondBlinkTimer);
      clearTimeout(gazeReturn); clearTimeout(reliefTimer); clearTimeout(originTimer); clearTimeout(wakeTimer);
      for (const animation of blinks) animation.cancel();
      blinks.clear();
      window.removeEventListener("pointermove", move); window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure); window.removeEventListener("blur", reset);
      document.documentElement.removeEventListener("pointerleave", reset);
      document.removeEventListener("visibilitychange", visibility);
      pointerPreference.removeEventListener("change", sync); motionPreference.removeEventListener("change", sync);
    };
  }, [modalOpen]);

  return (
    <button ref={button} type="button" className={styles.blob} aria-label="Squish the blob buddy" data-mode="idle" data-reaction="idle" data-paused="true"
      onPointerEnter={event => { if (event.pointerType === "mouse") controls.current?.attend(true); }}
      onPointerLeave={event => { if (event.pointerType === "mouse") controls.current?.attend(false); }}
      onPointerDown={event => {
        if (event.button !== 0) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        controls.current?.press({ x: event.clientX, y: event.clientY });
      }}
      onPointerUp={() => controls.current?.release()}
      onPointerCancel={() => controls.current?.cancel()}
      onLostPointerCapture={() => controls.current?.cancel()}
      onKeyDown={event => { if (!event.repeat && (event.key === "Enter" || event.key === " ")) controls.current?.press(); if (event.key === "Escape") controls.current?.cancel(); }}
      onKeyUp={event => { if (event.key === "Enter" || event.key === " ") controls.current?.release(); }}
      onFocus={event => { if (event.currentTarget.matches(":focus-visible")) controls.current?.focus(true); }}
      onBlur={() => controls.current?.focus(false)}
      onClick={event => { if (event.detail === 0) controls.current?.pulse(); }}>
      <div className={styles.float}><div ref={motion} className={styles.motion}><div ref={pressLayer} className={styles.press}><div className={styles.breath}>
        <div className={styles.flow}><svg width="60" height="60" viewBox="0 0 60 60" aria-hidden="true">
          <svg x="7.5" y="9" width="46" height="46.5" viewBox="0 0 34.11000049114227 34.275001525878906" preserveAspectRatio="none" overflow="visible"><path fill="#1E56C7" d={BODY} /></svg>
        </svg></div>
        <svg className={styles.face} width="60" height="60" viewBox="0 0 60 60" aria-hidden="true">
          <g ref={eyes}><g ref={expression}><g ref={blinkLayer} className={styles.blink}>
            <ellipse cx="26.25" cy="29.75" rx="2.25" ry="3.75" fill="white" />
            <ellipse cx="36.25" cy="30.5" rx="2.25" ry="3.5" fill="white" />
          </g></g></g>
        </svg>
      </div></div></div></div>
    </button>
  );
}
