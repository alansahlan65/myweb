import { MagneticContactButton } from "./magnetic-contact-button";
import { SiteFooter } from "./site-footer";

export function ContactPanel({ personal = false }: { personal?: boolean }) {
  return (
    <div className="contact-and-footer">
      <section className="contact-panel" aria-labelledby="contact-heading">
        <div className="contact-panel-top">
          <h2 id="contact-heading">{personal ? "Say hi?" : "Have something in mind?"}</h2>
          <MagneticContactButton />
        </div>
        <p>{personal ? "A film recommendation is a perfectly good reason." : "A project, a role, or a good conversation. I’d love to hear about it."}</p>
      </section>
      <SiteFooter />
    </div>
  );
}
