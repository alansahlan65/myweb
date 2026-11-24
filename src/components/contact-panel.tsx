import { MagneticContactButton } from "./magnetic-contact-button";
import { SiteFooter } from "./site-footer";

type ContactVariant = "default" | "personal" | "projects";

const copyByVariant: Record<ContactVariant, { heading: string; body: string }> = {
  default: {
    heading: "Have something in mind?",
    body: "A project, a role, or a good conversation. I’d love to hear about it.",
  },
  personal: {
    heading: "Say hi?",
    body: "A film recommendation is a perfectly good reason.",
  },
  projects: {
    heading: "Want to talk through a project?",
    body: "Happy to walk through my process, or chat about what you're building.",
  },
};

export function ContactPanel({
  personal = false,
  variant,
}: {
  personal?: boolean;
  variant?: ContactVariant;
}) {
  const resolved: ContactVariant = variant ?? (personal ? "personal" : "default");
  const { heading, body } = copyByVariant[resolved];

  return (
    <div className="contact-and-footer">
      <section className="contact-panel" aria-labelledby="contact-heading">
        <div className="contact-panel-top">
          <h2 id="contact-heading">{heading}</h2>
          <MagneticContactButton />
        </div>
        <p>{body}</p>
      </section>
      <SiteFooter />
    </div>
  );
}
