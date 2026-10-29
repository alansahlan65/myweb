"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const items = [
  { id: "505", kind: "album", title: "505", artist: "Arctic Monkeys", image: "505-cover.jpg", record: "vinyl-505.svg" },
  { id: "hot-fuss", kind: "album", title: "Mr. Brightside", artist: "The Killers", image: "mr-brightside-cover.jpg", record: "vinyl-mr-brightside.svg" },
  { id: "rdr2", kind: "game", title: "Red Dead Redemption 2", image: "rdr2-cover.jpg", quote: "Take a gamble that love exists and do a loving act.", author: "Sister Calderón, to Arthur Morgan" },
  { id: "inception", kind: "film", title: "Inception", image: "inception-cover.jpg", quote: "You mustn’t be afraid to dream a little bigger, darling.", author: "Eames" },
  { id: "witcher", kind: "book", title: "The Witcher", image: "witcher-cover.jpg", quote: "The world doesn’t need a hero. It needs a professional.", author: "Geralt of Rivia" },
] as const;
type Item = (typeof items)[number];
type QuoteItem = Extract<Item, { quote: string }>;
type Quote = { item: QuoteItem; trigger: HTMLButtonElement; pointer: boolean };

function QuoteTooltip({ quote, point }: { quote: Quote; point: React.RefObject<{ x: number; y: number } | null> }) {
  const tooltip = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const element = tooltip.current;
    if (!element) return;
    const artwork = quote.trigger.querySelector(quote.item.kind === "book" ? ".open-book" : ".shelf-cover");
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let current: { x: number; y: number } | null = null;
    let previousTime = 0;
    const position = (time: number) => {
      const viewport = window.visualViewport;
      const viewportWidth = Math.min(document.documentElement.clientWidth, viewport?.width ?? innerWidth);
      const viewportHeight = viewport?.height ?? innerHeight;
      const left = (viewport?.offsetLeft ?? 0) + 24;
      const top = (viewport?.offsetTop ?? 0) + 24;
      const right = left + viewportWidth - 48;
      const bottom = top + viewportHeight - 48;
      const maxWidth = `${viewportWidth - 48}px`;
      if (element.style.maxWidth !== maxWidth) element.style.maxWidth = maxWidth;
      const { width, height } = element.getBoundingClientRect();
      const anchor = (artwork ?? quote.trigger).getBoundingClientRect();
      const cursor = point.current;
      const usePointer = quote.pointer && !reducedMotion.matches;
      let placement = usePointer && cursor ? "below" : "above";
      let x = usePointer && cursor ? cursor.x + 20 : anchor.left + (anchor.width - width) / 2;
      let y = usePointer && cursor ? cursor.y + 24 : anchor.top - height - 20;
      if (x + width > right) x = usePointer && cursor ? cursor.x - width - 20 : right - width;
      if (y + height > bottom) { y = usePointer && cursor ? cursor.y - height - 24 : anchor.top - height - 20; placement = "above"; }
      if (y < top && !usePointer) { y = anchor.bottom + 20; placement = "below"; }
      x = Math.max(left, Math.min(x, right - width));
      y = Math.max(top, Math.min(y, bottom - height));
      const follow = usePointer && current && element.dataset.placement === placement;
      const blend = follow ? 1 - Math.exp(-Math.min(time - previousTime, 32) / 40) : 1;
      current = { x: current ? current.x + (x - current.x) * blend : x, y: current ? current.y + (y - current.y) * blend : y };
      // Clamp again after a resize; the previous position may be outside the new viewport.
      current.x = Math.max(left, Math.min(current.x, right - width));
      current.y = Math.max(top, Math.min(current.y, bottom - height));
      previousTime = time;
      element.dataset.placement = placement;
      const tailAnchor = usePointer && cursor ? cursor.x : anchor.left + anchor.width / 2;
      element.style.setProperty("--quote-tail-x", `${Math.round(Math.max(24, Math.min(tailAnchor - current.x - 12, width - 52)))}px`);
      element.style.transform = `translate3d(${Math.round(current.x)}px, ${Math.round(current.y)}px, 0)`;
      element.style.visibility = "visible";
      return Math.abs(x - current.x) + Math.abs(y - current.y) > .25;
    };
    const update = (time: number) => {
      frame = 0;
      const following = position(time);
      if (following || artwork?.getAnimations().some(animation => animation.playState === "running")) frame = requestAnimationFrame(update);
    };
    const schedulePosition = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const syncPointerTracking = () => {
      current = null;
      window.removeEventListener("pointermove", schedulePosition);
      if (quote.pointer && !reducedMotion.matches) window.addEventListener("pointermove", schedulePosition, { passive: true });
      schedulePosition();
    };
    position(performance.now());
    syncPointerTracking();
    const observer = new ResizeObserver(schedulePosition);
    observer.observe(element);
    reducedMotion.addEventListener("change", syncPointerTracking);
    window.addEventListener("resize", schedulePosition);
    window.addEventListener("scroll", schedulePosition, { passive: true, capture: true });
    window.visualViewport?.addEventListener("resize", schedulePosition);
    window.visualViewport?.addEventListener("scroll", schedulePosition);
    return () => {
      observer.disconnect(); cancelAnimationFrame(frame);
      reducedMotion.removeEventListener("change", syncPointerTracking);
      window.removeEventListener("pointermove", schedulePosition);
      window.removeEventListener("resize", schedulePosition);
      window.removeEventListener("scroll", schedulePosition, true);
      window.visualViewport?.removeEventListener("resize", schedulePosition);
      window.visualViewport?.removeEventListener("scroll", schedulePosition);
    };
  }, [quote, point]);
  return createPortal(
    <div ref={tooltip} id={`quote-${quote.item.id}`} role="tooltip" className="shelf-tooltip">
      <div className="quote-surface">
        <p>“{quote.item.quote}”</p>
        <span className="quote-author">{quote.item.author}</span>
        <svg className="quote-tail" width="28" height="14" viewBox="0 0 28 14" aria-hidden="true"><path d="M0 0H28C19 1 15 5 12 10C10 13 7 14 4 13C7 9 7 4 0 0Z" /></svg>
      </div>
    </div>, document.body,
  );
}

export function Shelf() {
  const shelf = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealScrollFrame = useRef(0);
  const point = useRef<{ x: number; y: number } | null>(null);
  const suppressed = useRef<string | null>(null);
  const pointerType = useRef("mouse");
  const [active, setActive] = useState<string | null>(null);
  const activeRef = useRef<string | null>(null);
  const activeTrigger = useRef<HTMLButtonElement | null>(null);
  const [quote, setQuote] = useState<Quote | null>(null);
  const clearTimer = () => { if (timer.current) { clearTimeout(timer.current); timer.current = null; } };
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearResume = () => { if (resumeTimer.current) { clearTimeout(resumeTimer.current); resumeTimer.current = null; } };

  useEffect(() => { activeRef.current = active; }, [active]);
  useEffect(() => {
    const dismiss = () => { if (timer.current) clearTimeout(timer.current); timer.current = null; activeTrigger.current = null; setQuote(null); setActive(null); };
    const resume = () => {
      resumeTimer.current = null;
      const cursor = point.current;
      if (!cursor || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      const button = document.elementFromPoint(cursor.x, cursor.y)?.closest<HTMLButtonElement>(".shelf-item");
      if (!button || !shelf.current?.contains(button)) return;
      const item = items.find((entry) => entry.id === button.dataset.id);
      if (item) reveal(item, button, true);
    };
    const scroll = () => {
      // Native keyboard focus can scroll the page or the Shelf. Preserve that
      // reveal while its trigger retains keyboard focus; the tooltip reanchors.
      if (revealScrollFrame.current || activeTrigger.current?.matches(":focus-visible")) return;
      dismiss();
      // Smooth scrolling keeps moving the page under a resting pointer after
      // the wheel stops. Wait for it to settle, then reveal the item that
      // ended up under the cursor instead of leaving it un-hovered.
      clearResume();
      if (point.current) resumeTimer.current = setTimeout(resume, 140);
    };
    const track = (event: PointerEvent) => {
      if (event.pointerType === "mouse") point.current = { x: event.clientX, y: event.clientY };
    };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { suppressed.current = activeRef.current; dismiss(); } };
    const outside = (event: PointerEvent) => { if (!shelf.current?.contains(event.target as Node)) dismiss(); };
    window.addEventListener("keydown", escape);
    window.addEventListener("scroll", scroll, { passive: true, capture: true });
    window.addEventListener("pointerdown", outside, { passive: true });
    window.addEventListener("pointermove", track, { passive: true });
    return () => {
      if (timer.current) clearTimeout(timer.current);
      clearResume();
      cancelAnimationFrame(revealScrollFrame.current);
      window.removeEventListener("keydown", escape); window.removeEventListener("scroll", scroll, true); window.removeEventListener("pointerdown", outside); window.removeEventListener("pointermove", track);
    };
  }, []);

  // A reload can land with the cursor already over the Shelf. CSS draws the
  // hover artwork; this brings the quote in without a fresh pointerenter.
  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const button = shelf.current?.querySelector<HTMLButtonElement>(".shelf-item:hover");
    if (!button) return;
    const item = items.find((entry) => entry.id === button.dataset.id);
    if (!item) return;
    const bounds = button.getBoundingClientRect();
    point.current = { x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2 };
    reveal(item, button, true);
  }, []);

  function reveal(item: Item, trigger: HTMLButtonElement, pointer: boolean) {
    if (suppressed.current === item.id) return;
    clearTimer();
    activeTrigger.current = trigger;
    // Native focus and scroll-into-view may finish in the frame that enters an
    // item. Preserve that reveal; later user scrolling still dismisses it.
    cancelAnimationFrame(revealScrollFrame.current);
    revealScrollFrame.current = requestAnimationFrame(() => { revealScrollFrame.current = 0; });
    if (!pointer) {
      trigger.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "instant" });
    }
    setActive(item.id); setQuote(null);
    if ("quote" in item) {
      if (pointer) timer.current = setTimeout(() => { setQuote({ item, trigger, pointer: true }); timer.current = null; }, 90);
      else setQuote({ item, trigger, pointer: false });
    }
  }

  return (
    <div ref={shelf} className="shelf">
      <div className="shelf-row">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <button key={item.id} type="button" data-id={item.id} className={`shelf-item shelf-${item.kind} shelf-${item.id}`} data-active={isActive} aria-label={"artist" in item ? `${item.title} by ${item.artist}. Reveal record.` : item.kind === "book" ? "The Witcher. Open the book cover." : `Read a quote from ${item.title}`} aria-expanded={isActive} aria-describedby={quote?.item.id === item.id ? `quote-${item.id}` : undefined}
              onPointerEnter={(event) => {
                if (event.pointerType !== "mouse" || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
                shelf.current?.removeAttribute("data-touch");
                clearResume();
                point.current = { x: event.clientX, y: event.clientY };
                reveal(item, event.currentTarget, true);
              }}
              onPointerMove={(event) => { if (event.pointerType === "mouse") point.current = { x: event.clientX, y: event.clientY }; }}
              onPointerDown={(event) => {
                pointerType.current = event.pointerType;
                if (event.pointerType === "mouse") shelf.current?.removeAttribute("data-touch");
                else shelf.current?.setAttribute("data-touch", "");
              }}
              onPointerLeave={(event) => {
                if (event.pointerType !== "mouse") return;
                clearTimer(); suppressed.current = null;
                if (!event.currentTarget.matches(":focus-visible")) { activeTrigger.current = null; setActive(null); setQuote(null); }
              }}
              onFocus={(event) => { if (event.currentTarget.matches(":focus-visible")) reveal(item, event.currentTarget, false); }}
              onBlur={() => { clearTimer(); suppressed.current = null; activeTrigger.current = null; setActive(null); setQuote(null); }}
              onPointerCancel={() => { clearTimer(); activeTrigger.current = null; setActive(null); setQuote(null); }}
              onClick={(event) => {
                const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
                if (event.detail > 0 && pointerType.current === "mouse" && finePointer) return;
                if (event.detail === 0) { suppressed.current = null; reveal(item, event.currentTarget, false); return; }
                if (isActive) { clearTimer(); activeTrigger.current = null; setActive(null); setQuote(null); }
                else { suppressed.current = null; reveal(item, event.currentTarget, false); }
              }}>
              <span className="shelf-stage">
                {"record" in item ? <Image className="vinyl-record" src={`/images/design/${item.record}`} width={152} height={152} alt="" aria-hidden="true" /> : null}
                {item.kind === "book" ? <Image className="open-book" src="/images/design/witcher-book-open.png" width={180} height={258} alt="" aria-hidden="true" /> : null}
                <span className="shelf-cover"><Image src={`/images/design/${item.image}`} alt="" fill sizes={item.kind === "album" ? "160px" : item.kind === "game" ? "377px" : "140px"} /></span>
              </span>
              {"artist" in item ? <span className="album-information"><span>{item.title}</span><span>{item.artist}</span></span> : null}
            </button>
          );
        })}
      </div>
      {quote ? <QuoteTooltip quote={quote} point={point} /> : null}
    </div>
  );
}
