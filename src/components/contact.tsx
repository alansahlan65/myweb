"use client";

import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { Tooltip } from "@base-ui/react/tooltip";
import { EnvelopeSimple, WhatsappLogo, InstagramLogo, X, Copy, Check } from "@phosphor-icons/react";
import { lockScroll, unlockScroll } from "./smooth-scroll";

const EMAIL = "alansahlanwork@gmail.com";
const EMAIL_TRIGGER_ID = "contact-email-copy";
// A springy, critically soft curve sampled into a CSS linear() easing. It
// leaves from rest instead of hitting full speed on the first frame, so a
// small state change reads as a settle rather than a snap.
const SPRING_DURATION = 420;
const SPRING_EASING = (() => {
  const damping = .82;
  const omega = (2 * Math.PI) / .28;
  const damped = omega * Math.sqrt(1 - damping * damping);
  const points: string[] = [];
  for (let i = 0; i <= 40; i++) {
    const t = (i / 40) * (SPRING_DURATION / 1000);
    const value = i === 40 ? 1 : 1 - Math.exp(-damping * omega * t) * (Math.cos(damped * t) + (damping * omega / damped) * Math.sin(damped * t));
    points.push(`${value.toFixed(3)} ${((i / 40) * 100).toFixed(1)}%`);
  }
  return `linear(${points.join(", ")})`;
})();
const ContactContext = createContext(false);
const contactHandle = Dialog.createHandle();
export const useContactOpen = () => useContext(ContactContext);

export function ContactTrigger({ children, className = "", onClick, label, title }: {
  children: ReactNode; className?: string; onClick?: () => void; label?: string; title?: string;
}) {
  return <Dialog.Trigger handle={contactHandle} className={className} onClick={onClick} aria-label={label} title={title}>{children}</Dialog.Trigger>;
}

const channels = [
  { label: "Email Alan", href: `mailto:${EMAIL}`, Icon: EnvelopeSimple, external: false },
  { label: "WhatsApp Alan", href: "https://wa.me/62881027208832", Icon: WhatsappLogo, external: true },
  { label: "Instagram", href: "https://www.instagram.com/alannshln/", Icon: InstagramLogo, external: true },
];

export function ContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const [emailHovered, setEmailHovered] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipWidthBefore = useRef<number | null>(null);

  useEffect(() => () => {
    if (copyTimeout.current) clearTimeout(copyTimeout.current);
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
  }, []);
  useEffect(() => {
    if (!open) return;
    lockScroll();
    return unlockScroll;
  }, [open]);

  // The tooltip fits its current label, so the pill resizes between states.
  // Measure the old width before the state commits, then run the new width
  // from there so the change reads as one smooth surface instead of a jump.
  useLayoutEffect(() => {
    const from = tooltipWidthBefore.current;
    tooltipWidthBefore.current = null;
    const element = tooltipRef.current;
    if (from == null || !element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const to = element.getBoundingClientRect().width;
    if (Math.abs(to - from) < .5) return;
    const easing = typeof CSS !== "undefined" && CSS.supports("animation-timing-function", SPRING_EASING)
      ? SPRING_EASING
      : "cubic-bezier(.23, 1, .32, 1)";
    const frames = [{ width: `${from}px` }, { width: `${to}px` }];
    try {
      element.animate(frames, { duration: SPRING_DURATION, easing });
    } catch {
      element.animate(frames, { duration: SPRING_DURATION, easing: "cubic-bezier(.23, 1, .32, 1)" });
    }
  }, [copyStatus]);

  function clearTimers() {
    if (copyTimeout.current) clearTimeout(copyTimeout.current);
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
  }

  function captureTooltipWidth() {
    tooltipWidthBefore.current = tooltipRef.current?.getBoundingClientRect().width ?? null;
  }

  function showEmailTooltip() {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => setEmailHovered(true), 120);
  }

  function hideEmailTooltip() {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setEmailHovered(false);
  }

  async function copyEmail() {
    if (copyTimeout.current) clearTimeout(copyTimeout.current);
    captureTooltipWidth();
    try { await navigator.clipboard.writeText(EMAIL); setCopyStatus("copied"); }
    catch { setCopyStatus("failed"); }
    copyTimeout.current = setTimeout(() => {
      captureTooltipWidth();
      setCopyStatus("idle");
    }, 2000);
  }

  return (
    <ContactContext.Provider value={open}>
      {children}
      <Dialog.Root handle={contactHandle} open={open} onOpenChange={(next) => {
        setOpen(next);
        if (!next) { setCopyStatus("idle"); setEmailHovered(false); setEmailFocused(false); clearTimers(); }
      }}>
        <Dialog.Portal>
          <Dialog.Backdrop className="contact-backdrop" />
          <Dialog.Popup className="contact-modal" data-lenis-prevent>
            <Dialog.Close className="modal-close icon-button" aria-label="Close contact dialog"><X size={20} /></Dialog.Close>
            <Dialog.Title className="contact-title">Get in touch</Dialog.Title>
            <Dialog.Description className="contact-description">Choose how you&apos;d like to reach me</Dialog.Description>
            <Tooltip.Provider delay={100}>
              <div className="contact-channels">
                {channels.map(({ label, href, Icon, external }) => (
                  <Tooltip.Root key={label}>
                    <Tooltip.Trigger render={<a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} />} className="channel-button" aria-label={label}>
                      <span className="channel-icon" aria-hidden="true">
                        <Icon size={23} weight="regular" className="channel-icon-outline" />
                        <Icon size={23} weight="fill" className="channel-icon-fill" />
                      </span>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Positioner side="top" sideOffset={9} className="channel-tooltip-positioner">
                        <Tooltip.Popup className="contact-tooltip channel-tooltip"><Tooltip.Arrow className="tooltip-arrow" />{label}</Tooltip.Popup>
                      </Tooltip.Positioner>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                ))}
              </div>
              <div className="email-fallback">
                <Tooltip.Root
                  open={emailHovered || emailFocused || copyStatus !== "idle"}
                  triggerId={EMAIL_TRIGGER_ID}
                  onOpenChange={(next, details) => {
                    if (!next && details.reason === "escape-key") {
                      setEmailHovered(false);
                      setEmailFocused(false);
                      setCopyStatus("idle");
                    }
                  }}
                >
                  <Tooltip.Trigger
                    id={EMAIL_TRIGGER_ID}
                    render={<button type="button" className="email-address" />}
                    closeOnClick={false}
                    aria-label={copyStatus === "copied" ? "Email address copied" : copyStatus === "failed" ? "Copy email address failed" : "Copy email address"}
                    onClick={copyEmail}
                    onPointerEnter={(event) => { if (event.pointerType === "mouse") showEmailTooltip(); }}
                    onPointerLeave={hideEmailTooltip}
                    onFocus={(event) => { if (event.currentTarget.matches(":focus-visible")) setEmailFocused(true); }}
                    onBlur={() => setEmailFocused(false)}
                  >
                    {EMAIL}
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Positioner side="top" sideOffset={9} className="channel-tooltip-positioner">
                      <Tooltip.Popup
                        ref={tooltipRef}
                        className="contact-tooltip email-tooltip"
                        data-status={copyStatus}
                        style={{ "--spring-duration": `${SPRING_DURATION}ms`, "--ease-spring": SPRING_EASING } as CSSProperties}
                      >
                        <Tooltip.Arrow className="tooltip-arrow" />
                        <span className="email-tooltip-content">
                          <span className="email-tooltip-icon" aria-hidden="true">
                            <Copy size={13} data-glyph="copy" />
                            <Check size={13} data-glyph="check" />
                          </span>
                          <span className="email-tooltip-label">
                            <span data-label="idle" data-active={copyStatus === "idle"} aria-hidden={copyStatus !== "idle"}>Copy email</span>
                            <span data-label="copied" data-active={copyStatus === "copied"} aria-hidden={copyStatus !== "copied"}>Copied</span>
                            <span data-label="failed" data-active={copyStatus === "failed"} aria-hidden={copyStatus !== "failed"}>Copy failed</span>
                          </span>
                        </span>
                      </Tooltip.Popup>
                    </Tooltip.Positioner>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </div>
            </Tooltip.Provider>
            <span className="sr-only" role="status">{copyStatus === "copied" ? "Email address copied." : copyStatus === "failed" ? "Copy failed. Select the email address to copy it." : ""}</span>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </ContactContext.Provider>
  );
}
