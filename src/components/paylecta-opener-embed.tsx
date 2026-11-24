"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowUpRight, Monitor, Play } from "lucide-react";

type HeroView = "motion" | "static";

export function PaylectaOpenerEmbed() {
  const [view, setView] = useState<HeroView>("motion");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setReducedMotion(query.matches);
      if (query.matches) setView("static");
    };
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return (
    <figure className="case-figure case-hero-figure">
      <div className={`case-stage case-stage-warm ${view === "motion" ? "case-opener-stage" : "case-dashboard-stage"}`}>
        {view === "motion" ? (
          <iframe
            src="/motion/paylecta-opener/index.html"
            title="Paylecta 30-second product tour"
            className="case-opener-iframe"
            loading="eager"
          />
        ) : (
          <div className="case-screen-frame case-screen-hero">
            <Image
              src="/images/projects/paylecta/web-dashboard.png"
              alt="Paylecta desktop dashboard showing Total Balance, transactions, revenue overview, and recent activity"
              width={1440}
              height={1279}
              sizes="(max-width: 1000px) calc(100vw - 48px), 825px"
              preload
            />
          </div>
        )}
      </div>
      <figcaption className="case-hero-caption-row">
        <span className="case-caption">
          {view === "motion"
            ? "A 30-second tour of Paylecta across web and iOS."
            : "The desktop dashboard, checked first thing in the morning."}
        </span>
        <div className="case-hero-controls">
          <div className="case-hero-switch" role="group" aria-label="Hero preview mode">
            <button
              type="button"
              className="case-switch-btn"
              aria-pressed={view === "motion"}
              onClick={() => setView("motion")}
              title={reducedMotion ? "Play the 30-second motion tour" : undefined}
            >
              <Play size={12} aria-hidden="true" />
              <span>Product tour</span>
            </button>
            <button
              type="button"
              className="case-switch-btn"
              aria-pressed={view === "static"}
              onClick={() => setView("static")}
            >
              <Monitor size={12} aria-hidden="true" />
              <span>Dashboard</span>
            </button>
          </div>
          <a
            href="/motion/paylecta-opener/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="case-opener-fullscreen"
          >
            <span>Full screen</span>
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </div>
      </figcaption>
    </figure>
  );
}
