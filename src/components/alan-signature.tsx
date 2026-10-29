"use client";

import { useEffect, useId, useRef } from "react";
import styles from "./alan-signature.module.css";

// Separate pen lifts let each mask follow the direction of the ink.
const strokes = [
  { d: "M18 82 C26 60 39 29 50 23 C55 20 55 27 54 35", box: [15, 18, 43, 68], from: "translateY(100%)", timing: "slow" },
  { d: "M54 35 C54 50 56 70 64 77", box: [51, 31, 17, 50], from: "translateY(-100%)", timing: "base" },
  { d: "M22 63 C35 63 47 60 62 57", box: [18, 53, 48, 14], from: "translateX(-100%)", timing: "fast" },
  { d: "M64 77 C76 64 93 28 89 23", box: [61, 19, 33, 62], from: "translateY(100%)", timing: "slow" },
  { d: "M89 23 C81 17 72 61 78 75 C81 85 91 76 101 65", box: [73, 17, 32, 68], from: "translateY(-100%)", timing: "base" },
  { d: "M130 53 C116 44 101 51 101 67", box: [97, 45, 37, 26], from: "translateX(100%)", timing: "base" },
  { d: "M101 67 C98 83 116 88 125 67 C129 57 132 48 130 53", box: [97, 47, 38, 39], from: "translateX(-100%)", timing: "base" },
  { d: "M125 67 C124 78 128 82 133 74 C137 65 141 53 145 53 C149 53 145 66 143 73", box: [121, 49, 30, 33], from: "translateX(-100%)", timing: "fast" },
  { d: "M143 73 C152 61 158 51 165 53 C173 56 162 78 172 78 C180 76 187 68 195 63", box: [139, 49, 60, 33], from: "translateX(-100%)", timing: "slow" },
  { d: "M39 99 C87 94 146 94 195 91", box: [35, 87, 164, 16], from: "translateX(-100%)", timing: "base", flourish: true },
];

export function AlanSignature() {
  const root = useRef<HTMLSpanElement>(null);
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const masks = [...element.querySelectorAll<SVGRectElement>("[data-pen-mask]")];
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const animations: Animation[] = [];
    let played = false;
    let observer: IntersectionObserver | undefined;

    function finish() {
      for (const animation of animations) animation.cancel();
      for (const mask of masks) mask.style.transform = "none";
      element!.dataset.writing = "complete";
    }
    function write() {
      if (played) return;
      played = true;
      observer?.disconnect();
      if (preference.matches) { finish(); return; }
      element!.dataset.writing = "writing";
      const timing = getComputedStyle(element!);
      let delay = 0;
      for (const [index, mask] of masks.entries()) {
        const stroke = strokes[index];
        const duration = parseFloat(timing.getPropertyValue(`--motion-${stroke.timing}`));
        animations.push(mask.animate([{ transform: stroke.from }, { transform: "translate(0, 0)" }], { duration, delay, easing: "linear", fill: "both" }));
        delay += duration;
      }
      void Promise.all(animations.map(animation => animation.finished)).then(finish).catch(() => {});
    }
    function syncPreference() {
      if (preference.matches) { played = true; observer?.disconnect(); finish(); }
    }

    if (preference.matches || typeof IntersectionObserver === "undefined") { played = true; finish(); }
    else {
      masks.forEach((mask, index) => { mask.style.transform = strokes[index].from; });
      element.dataset.writing = "waiting";
      observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting && entry.intersectionRatio >= .8) write(); }, { threshold: .8 });
      observer.observe(element);
    }
    preference.addEventListener("change", syncPreference);
    return () => { observer?.disconnect(); preference.removeEventListener("change", syncPreference); for (const animation of animations) animation.cancel(); };
  }, []);

  return (
    <span ref={root} className={styles.signature} data-signature="alan">
      <span className="sr-only">Alan</span>
      <svg viewBox="0 0 240 120" fill="none" aria-hidden="true" focusable="false">
        <defs>
          {strokes.map((stroke, index) => <clipPath key={index} id={`${id}-pen-${index}`} clipPathUnits="userSpaceOnUse"><rect data-pen-mask x={stroke.box[0]} y={stroke.box[1]} width={stroke.box[2]} height={stroke.box[3]} className={styles.mask} /></clipPath>)}
        </defs>
        {strokes.map((stroke, index) => <path key={index} d={stroke.d} clipPath={`url(#${id}-pen-${index})`} stroke="currentColor" strokeWidth={stroke.flourish ? 1.8 : 2.8} strokeLinecap="round" strokeLinejoin="round" />)}
      </svg>
    </span>
  );
}
