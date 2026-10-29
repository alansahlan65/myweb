"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore, type ReactNode } from "react";
import { ChevronsLeft, HouseHeart, BookUser, SquareMenu } from "lucide-react";
import { AlanCharacter } from "./alan-character";
import { BlobBuddy } from "./blob-buddy";
import { ContactProvider } from "./contact";
import { MagneticContactButton } from "./magnetic-contact-button";
import { MobileNavigation } from "./mobile-navigation";
import { scrollToTop } from "./smooth-scroll";
import { useSidebarMotion } from "./use-sidebar-motion";

const desktopQuery = "(min-width: 1001px)";
function subscribeDesktop(callback: () => void) {
  const query = matchMedia(desktopQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const isDesktop = () => matchMedia(desktopQuery).matches;
const serverDesktop = () => true;

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const desktop = useSyncExternalStore(subscribeDesktop, isDesktop, serverDesktop);
  const compactRail = compact && desktop;
  const shell = useSidebarMotion(compactRail);
  function navigate() { scrollToTop(); }

  return (
    <ContactProvider>
      <div
        ref={shell}
        className="site-shell"
        data-sidebar={compactRail ? "compact" : "expanded"}
        data-sidebar-state={compactRail ? "compact" : "expanded"}
        data-sidebar-motion="settled"
        data-sidebar-progress="0"
        data-sidebar-velocity="0"
      >
        <aside id="site-sidebar" className="sidebar" aria-label="Site">
          <div className="identity">
            <div className="identity-group">
              <Link
                href="/"
                className="identity-copy"
                scroll={false}
                onNavigate={navigate}
                aria-hidden={compactRail || undefined}
                tabIndex={compactRail ? -1 : undefined}
              >
                <span className="identity-name">Alan Sahlan</span>
                <span className="identity-role">is a <span>product designer</span></span>
              </Link>
              <span className="identity-blob"><BlobBuddy /></span>
            </div>
            <MobileNavigation pathname={pathname} onNavigate={navigate} />
          </div>
          <div className="sidebar-character" inert={compactRail}>
            <AlanCharacter />
          </div>
          <div className="sidebar-menu">
            <nav className="navigation" aria-label="Main navigation">
              <Link className="nav-item" href="/" scroll={false} onNavigate={navigate} aria-current={pathname === "/" ? "page" : undefined} title={compactRail ? "Home" : undefined}>
                <HouseHeart size={16} aria-hidden="true" /><span className="nav-label">Home</span>
              </Link>
              <Link className="nav-item" href="/about" scroll={false} onNavigate={navigate} aria-current={pathname === "/about" ? "page" : undefined} title={compactRail ? "Know me better" : undefined}>
                <BookUser size={16} aria-hidden="true" /><span className="nav-label">Know me better</span>
              </Link>
            </nav>
            <div className="sidebar-actions">
              <MagneticContactButton variant="pill" title={compactRail ? "Get in touch" : undefined} />
              <a className="pill-button secondary-button sidebar-resume" href="/resume/alan-sahlan-resume.pdf" download="Alan-Sahlan-Resume.pdf" aria-label="See my resume" title={compactRail ? "See my resume" : undefined}>
                <SquareMenu size={16} aria-hidden="true" /><span className="action-label">See my resume</span>
              </a>
            </div>
            <button
              type="button"
              className="sidebar-toggle"
              onClick={() => setCompact(current => !current)}
              aria-expanded={!compactRail}
              aria-controls="site-sidebar"
              aria-label={compactRail ? "Expand sidebar" : "Collapse sidebar"}
              title={compactRail ? "Expand sidebar" : "Collapse sidebar"}
            >
              <ChevronsLeft className="sidebar-toggle-icon" size={16} aria-hidden="true" />
            </button>
          </div>
        </aside>
        <main id="main" tabIndex={-1}>{children}</main>
      </div>
    </ContactProvider>
  );
}
