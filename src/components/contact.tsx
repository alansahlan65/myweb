"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { Tooltip } from "@base-ui/react/tooltip";
import { EnvelopeSimple, WhatsappLogo, InstagramLogo, X, Copy, Check } from "@phosphor-icons/react";
import { lockScroll, unlockScroll } from "./smooth-scroll";

const EMAIL = "alansahlanwork@gmail.com";
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
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timeout.current) clearTimeout(timeout.current); }, []);
  useEffect(() => {
    if (!open) return;
    lockScroll();
    return unlockScroll;
  }, [open]);

  async function copyEmail() {
    if (timeout.current) clearTimeout(timeout.current);
    try { await navigator.clipboard.writeText(EMAIL); setCopyStatus("copied"); }
    catch { setCopyStatus("failed"); }
    timeout.current = setTimeout(() => setCopyStatus("idle"), 2000);
  }

  return (
    <ContactContext.Provider value={open}>
      {children}
      <Dialog.Root handle={contactHandle} open={open} onOpenChange={(next) => { setOpen(next); if (!next) setCopyStatus("idle"); }}>
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
                      <Icon size={23} weight={label === "Email Alan" ? "regular" : "fill"} />
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Positioner side="top" sideOffset={9} className="channel-tooltip-positioner">
                        <Tooltip.Popup className="channel-tooltip"><Tooltip.Arrow className="tooltip-arrow" />{label}</Tooltip.Popup>
                      </Tooltip.Positioner>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                ))}
              </div>
            </Tooltip.Provider>
            <div className="email-fallback">
              <span className="email-address">{EMAIL}</span>
              <button type="button" className="copy-email" onClick={copyEmail} aria-label={copyStatus === "copied" ? "Email address copied" : "Copy email address"}>
                {copyStatus === "copied" ? <Check size={16} /> : <Copy size={16} />}
                <span>{copyStatus === "copied" ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <span className="sr-only" role="status">{copyStatus === "copied" ? "Email address copied." : copyStatus === "failed" ? "Select the email address above to copy it." : ""}</span>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </ContactContext.Provider>
  );
}
