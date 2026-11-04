"use client";

import { useEffect, useRef } from "react";
import styles from "./alan-signature.module.css";

// Paths follow pen order, so each stroke starts where the previous one ended.
// `lift` marks the three places where a pen leaves the paper: the crossbar of
// the A, the jump from the a to the n, and the finishing underline.
const strokes = [
  { d: "M18 82 C26 60 39 29 50 23 C55 20 55 27 54 35" },
  { d: "M54 35 C54 50 56 70 64 77" },
  { d: "M22 63 C35 63 47 60 62 57", lift: true },
  { d: "M64 77 C76 64 93 28 89 23" },
  { d: "M89 23 C81 17 72 61 78 75 C81 85 91 76 101 65" },
  { d: "M101 67 C101 51 116 44 130 53" },
  { d: "M130 53 C132 48 129 57 125 67 C116 88 98 83 101 67" },
  { d: "M125 67 C124 78 128 82 133 74 C137 65 141 53 145 53 C149 53 145 66 143 73", lift: true },
  { d: "M143 73 C152 61 158 51 165 53 C173 56 162 78 172 78 C180 76 187 68 195 63" },
  { d: "M39 99 C87 94 146 94 195 91", lift: true, flourish: true },
];

// Ink speed in viewBox units per millisecond, close to the reference clip, so
// the 727 units of this signature take about two seconds to write.
const PEN_SPEED = 0.38;
// A pen is off the paper for about this long between strokes.
const PEN_LIFT = 70;

export function AlanSignature() {
  const root = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const paths = [...element.querySelectorAll<SVGPathElement>("path")];
    const lengths = paths.map(path => path.getTotalLength());
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const animations: Animation[] = [];
    let played = false;
    let observer: IntersectionObserver | undefined;

    function finish() {
      for (const animation of animations) animation.cancel();
      for (const path of paths) { path.style.strokeDasharray = ""; path.style.strokeDashoffset = ""; }
      element!.dataset.writing = "complete";
    }
    function write() {
      if (played) return;
      played = true;
      observer?.disconnect();
      if (preference.matches) { finish(); return; }
      element!.dataset.writing = "writing";
      let delay = 0;
      for (const [index, path] of paths.entries()) {
        if (strokes[index].lift) delay += PEN_LIFT;
        const length = lengths[index];
        animations.push(path.animate([{ strokeDashoffset: length }, { strokeDashoffset: 0 }], { duration: length / PEN_SPEED, delay, easing: "linear", fill: "both" }));
        delay += length / PEN_SPEED;
      }
      void Promise.all(animations.map(animation => animation.finished)).then(finish).catch(() => {});
    }
    function syncPreference() {
      if (preference.matches) { played = true; observer?.disconnect(); finish(); }
    }

    if (preference.matches || typeof IntersectionObserver === "undefined") { played = true; finish(); }
    else {
      for (const [index, path] of paths.entries()) {
        path.style.strokeDasharray = `${lengths[index]} ${lengths[index]}`;
        path.style.strokeDashoffset = `${lengths[index]}`;
      }
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
        {strokes.map((stroke, index) => <path key={index} d={stroke.d} stroke="currentColor" strokeWidth={stroke.flourish ? 1.8 : 2.8} strokeLinecap="round" strokeLinejoin="round" />)}
      </svg>
    </span>
  );
}
