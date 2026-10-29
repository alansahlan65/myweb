"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function Portrait() {
  const [revealed, setRevealed] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const print = useRef<HTMLSpanElement>(null);
  const paper = useRef<HTMLSpanElement>(null);
  const caption = useRef<HTMLSpanElement>(null);
  const revealedRef = useRef(false);
  const retarget = useRef<(() => void) | null>(null);

  useEffect(() => {
    const trigger = button.current;
    if (!trigger || !print.current || !paper.current || !caption.current) return;
    const printElement = print.current;
    const paperElement = paper.current;
    const captionElement = caption.current;
    const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
    const motion = matchMedia("(prefers-reduced-motion: no-preference)");
    let hovered = false, focused = false;
    let value = 0, velocity = 0, target = 0;
    let frame = 0, last = 0;
    let height = trigger.offsetHeight;
    let band = parseFloat(getComputedStyle(trigger).getPropertyValue("--portrait-caption-space"));
    // A quick, critically damped response. Retargeting still carries velocity.
    const omega = 2 * Math.PI / .16;
    function paint() {
      printElement.style.transform = motion.matches ? `rotate(${-2 * value}deg)` : "none";
      paperElement.style.transform = `scaleY(${1 + band * value / height})`;
      captionElement.style.opacity = String(value);
    }
    function render(now: number) {
      frame = 0;
      const dt = Math.min((now - (last || now - 16)) / 1000, .032);
      last = now;
      // Exact critical-spring solution stays smooth through variable frame times.
      const offset = value - target;
      const carried = velocity + omega * offset;
      const decay = Math.exp(-omega * dt);
      value = target + (offset + carried * dt) * decay;
      velocity = (velocity - omega * carried * dt) * decay;
      const settled = Math.abs(value - target) < .001 && Math.abs(velocity) < .01;
      if (settled) { value = target; velocity = 0; }
      paint();
      trigger!.dataset.settled = String(settled);
      if (!settled) frame = requestAnimationFrame(render);
    }
    function update() {
      target = Number(hovered || focused || revealedRef.current);
      if (!motion.matches || document.hidden) {
        cancelAnimationFrame(frame); frame = 0;
        value = target; velocity = 0; paint();
        trigger!.dataset.settled = "true";
      } else if (!frame) { trigger!.dataset.settled = "false"; last = 0; frame = requestAnimationFrame(render); }
    }
    function enter(event: PointerEvent) { if (event.pointerType === "mouse" && finePointer.matches) { hovered = true; update(); } }
    function leave() { hovered = false; update(); }
    function focus() { focused = trigger!.matches(":focus-visible"); update(); }
    function blur() { focused = false; update(); }
    function sync() { if (!finePointer.matches) hovered = false; update(); }
    const observer = new ResizeObserver(() => {
      height = trigger.offsetHeight;
      band = parseFloat(getComputedStyle(trigger).getPropertyValue("--portrait-caption-space"));
      paint();
    });
    observer.observe(trigger);
    retarget.current = update;
    trigger.addEventListener("pointerenter", enter);
    trigger.addEventListener("pointerleave", leave);
    trigger.addEventListener("pointercancel", leave);
    trigger.addEventListener("focus", focus);
    trigger.addEventListener("blur", blur);
    motion.addEventListener("change", sync);
    finePointer.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    paint();
    // A tap can land after hydration but before this effect runs. Read the
    // current revealed state so that early input still gets an animation target.
    update();
    return () => {
      retarget.current = null; observer.disconnect(); cancelAnimationFrame(frame);
      trigger.removeEventListener("pointerenter", enter);
      trigger.removeEventListener("pointerleave", leave);
      trigger.removeEventListener("pointercancel", leave);
      trigger.removeEventListener("focus", focus);
      trigger.removeEventListener("blur", blur);
      motion.removeEventListener("change", sync);
      finePointer.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <button ref={button} type="button" className="personal-portrait" data-revealed={revealed} data-settled="true" aria-label="Portrait of Alan Sahlan. Yep, that's me." aria-pressed={revealed} onClick={() => { revealedRef.current = !revealedRef.current; setRevealed(revealedRef.current); retarget.current?.(); }}>
      <span ref={print} className="portrait-print">
        <span ref={paper} className="portrait-paper" aria-hidden="true" />
        <span className="portrait-photo"><Image src="/images/design/alan-portrait.jpg" alt="Alan Sahlan in a black shirt" width={640} height={853} sizes="(max-width: 359px) 231px, (max-width: 1000px) 256px, (max-width: 1250px) 314px, 359px" preload /></span>
        <span ref={caption} className="portrait-caption" aria-hidden="true">Yep, that&apos;s me.</span>
      </span>
    </button>
  );
}
