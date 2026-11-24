"use client";

import { useEffect, useState } from "react";

interface TocItem {
  readonly id: string;
  readonly label: string;
}

export function ProjectToc({ items }: { items: readonly TocItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (sections.length === 0) return;

    function syncActive() {
      const scrollBottom = window.scrollY + window.innerHeight;
      if (scrollBottom >= document.documentElement.scrollHeight - 40) {
        setActiveId(sections[sections.length - 1].id);
        return;
      }

      let current = sections[0].id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= 180) {
          current = section.id;
        }
      }
      setActiveId(current);
    }

    syncActive();
    window.addEventListener("scroll", syncActive, { passive: true });
    window.addEventListener("resize", syncActive);
    return () => {
      window.removeEventListener("scroll", syncActive);
      window.removeEventListener("resize", syncActive);
    };
  }, [items]);

  return (
    <nav className="case-toc" aria-label="On this page">
      <p className="case-toc-title">On this page</p>
      <ol className="case-toc-list">
        {items.map((item) => {
          const active = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="case-toc-link"
                aria-current={active ? "location" : undefined}
                onClick={() => setActiveId(item.id)}
              >
                <span className="case-toc-indicator" aria-hidden="true" />
                <span>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
