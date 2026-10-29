"use client";

import { useEffect, useState } from "react";
import { MapPinned } from "lucide-react";
import { LinkedinLogo, InstagramLogo, BehanceLogo } from "@phosphor-icons/react";

const formatter = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Jakarta", hour: "numeric", minute: "2-digit" });

export function SiteFooter() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    let timer = 0;
    const update = () => setTime(formatter.format(new Date()));
    const schedule = () => {
      update();
      const now = new Date();
      const delay = 60_000 - (now.getSeconds() * 1000 + now.getMilliseconds()) + 50;
      timer = window.setTimeout(schedule, delay);
    };
    const resync = () => {
      if (document.visibilityState !== "visible") return;
      window.clearTimeout(timer);
      schedule();
    };
    schedule();
    document.addEventListener("visibilitychange", resync);
    window.addEventListener("focus", resync);
    window.addEventListener("pageshow", resync);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", resync);
      window.removeEventListener("focus", resync);
      window.removeEventListener("pageshow", resync);
    };
  }, []);
  return (
    <footer className="site-footer">
      <div className="footer-details"><span>2026 © Edition</span><span className="local-time"><MapPinned size={16} />Indonesia, {time ?? "WIB"}{time ? " GMT+7" : ""}</span></div>
      <div className="social-links" aria-label="Social profiles">
        <a href="https://www.linkedin.com/in/muhammadsahlanshadiq/" target="_blank" rel="noopener noreferrer" aria-label="Alan on LinkedIn"><LinkedinLogo size={16} /></a>
        <a href="https://www.instagram.com/alannshln/" target="_blank" rel="noopener noreferrer" aria-label="Alan on Instagram"><InstagramLogo size={16} /></a>
        <a href="https://www.behance.net/muhammadsahlanshadiq" target="_blank" rel="noopener noreferrer" aria-label="Alan on Behance"><BehanceLogo size={16} /></a>
      </div>
    </footer>
  );
}
