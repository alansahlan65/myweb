"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function PaylectaOpenerEmbed() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  if (reducedMotion) {
    return (
      <div className="case-opener-stage case-opener-static">
        <Image
          src="/images/projects/paylecta/web-dashboard.png"
          alt="Paylecta desktop dashboard overview"
          width={1440}
          height={1279}
          sizes="(max-width: 1000px) calc(100vw - 48px), 825px"
          preload
        />
      </div>
    );
  }

  return (
    <div className="case-opener-stage">
      <iframe
        src="/motion/paylecta-opener/index.html?embed=1"
        title="Paylecta 30-second product tour"
        className="case-opener-iframe"
        loading="eager"
      />
    </div>
  );
}
