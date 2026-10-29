"use client";

import { useEffect } from "react";
import Lenis from "lenis";

let instance: Lenis | null = null;
let locks = 0;

export function lockScroll() {
  locks += 1;
  instance?.stop();
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks === 0) instance?.start();
}

export function scrollToTop() {
  if (instance) {
    instance.scrollTo(0, { immediate: true, force: true });
    return;
  }
  window.scrollTo({ top: 0, behavior: "instant" });
}

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      autoRaf: true,
      respectReducedMotion: true,
    });

    instance = lenis;
    if (locks > 0) lenis.stop();

    return () => {
      lenis.destroy();
      if (instance === lenis) instance = null;
    };
  }, []);

  return null;
}
