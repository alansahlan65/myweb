"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type MouseEvent, type RefObject } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { ArrowUpRight, MessageCircle, SquareMenu } from "lucide-react";
import { ContactTrigger } from "./contact";
import { useMenuMotion } from "./use-menu-motion";
import { lockScroll, unlockScroll } from "./smooth-scroll";
import styles from "./mobile-navigation.module.css";

const pages = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Know me better" },
];
const profiles = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/muhammadsahlanshadiq/" },
  { label: "Instagram", href: "https://www.instagram.com/alannshln/" },
  { label: "Behance", href: "https://www.behance.net/muhammadsahlanshadiq" },
];

export function MobileNavigation({ pathname, onNavigate }: { pathname: string; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const selectedPage = useRef(false);
  const finishClose = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setExpanded(current => !current), []);

  useEffect(() => { setExpanded(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    lockScroll();
    return unlockScroll;
  }, [open]);
  useEffect(() => {
    const desktop = matchMedia("(min-width: 1001px)");
    const closeOnDesktop = () => { if (desktop.matches) { setExpanded(false); setOpen(false); } };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  function selectPage(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    selectedPage.current = true;
    setExpanded(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={next => {
      if (next) { selectedPage.current = false; setExpanded(true); setOpen(true); }
      else setExpanded(false);
    }} onOpenChangeComplete={next => {
      if (!next && selectedPage.current) queueMicrotask(() => document.getElementById("main")?.focus({ preventScroll: true }));
    }}>
      <Dialog.Trigger ref={trigger} className={`mobile-menu-toggle icon-button ${styles.toggle}`} aria-label="Open navigation" aria-expanded={expanded}>
        <span className={styles.burger} aria-hidden="true"><span /><span /></span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <MenuPanel expanded={expanded} pathname={pathname} trigger={trigger} onClosed={finishClose} onToggle={toggle} onSelect={selectPage} onNavigate={onNavigate} finalFocus={() => selectedPage.current ? false : trigger.current} />
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function MenuPanel({ expanded, pathname, trigger, onClosed, onToggle, onSelect, onNavigate, finalFocus }: {
  expanded: boolean;
  pathname: string;
  trigger: RefObject<HTMLButtonElement | null>;
  onClosed: () => void;
  onToggle: () => void;
  onSelect: (event: MouseEvent<HTMLAnchorElement>) => void;
  onNavigate: () => void;
  finalFocus: () => HTMLButtonElement | null | false;
}) {
  const close = useRef<HTMLButtonElement>(null);
  const motion = useMenuMotion(expanded, trigger, onClosed);
  return (
    <>
      <Dialog.Backdrop ref={motion.backdrop} className={styles.backdrop} />
      <Dialog.Popup ref={motion.panel} className={styles.panel} initialFocus={close} finalFocus={finalFocus} aria-describedby={undefined}>
        <Dialog.Title className="sr-only">Navigation</Dialog.Title>
        <div ref={motion.surface} className={styles.surface} data-menu-surface>
          <div ref={motion.layer} className={styles.layer}>
            <Dialog.Close ref={close} className={`icon-button ${styles.close}`} aria-label={expanded ? "Close navigation" : "Open navigation"} onClick={event => { event.preventBaseUIHandler(); onToggle(); }}>
              <span className={styles.burger} aria-hidden="true"><span data-menu-stroke /><span data-menu-stroke /></span>
            </Dialog.Close>
            <div className={styles.content} data-menu-content data-lenis-prevent>
              <nav className={styles.links} aria-label="Main navigation">
                {pages.map(({ href, label }) => (
                  <div key={href} data-menu-reveal>
                    <Link href={href} className={styles.link} scroll={false} onClick={onSelect} onNavigate={onNavigate} aria-current={pathname === href ? "page" : undefined}>
                      <span>{label}</span><span className={styles.current} aria-hidden="true" />
                    </Link>
                  </div>
                ))}
              </nav>
              <div className={`sidebar-actions ${styles.actions}`} data-menu-reveal>
                <ContactTrigger className={`pill-button primary-button ${styles.action}`} label="Get in touch"><MessageCircle size={16} aria-hidden="true" />Get in touch</ContactTrigger>
                <a className={`pill-button ${styles.action} ${styles.resume}`} href="/resume/alan-sahlan-resume.pdf" download="Alan-Sahlan-Resume.pdf"><SquareMenu size={16} aria-hidden="true" />See my resume</a>
              </div>
              <div className={styles.profiles} aria-label="Social profiles" data-menu-reveal>
                {profiles.map(({ href, label }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label}<ArrowUpRight size={14} aria-hidden="true" /></a>)}
              </div>
            </div>
          </div>
        </div>
      </Dialog.Popup>
    </>
  );
}
