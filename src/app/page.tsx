import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { AlanCharacter } from "@/components/alan-character";
import { ContactPanel } from "@/components/contact-panel";

const projects = [
  { title: "Paylecta", slug: "paylecta", image: "paylecta-preview.jpg", alt: "Paylecta financial dashboard on a laptop and mobile phone" },
  { title: "Aurelia", slug: "aurelia", image: "aurelia-preview.jpg", alt: "Aurelia resort booking website and mobile experience" },
  { title: "PawFriend", slug: "pawfriend", image: "pawfriend-preview.jpg", alt: "PawFriend pet adoption website and mobile app" },
  { title: "Munchpal", slug: "munchpal", image: "munchpal-preview.jpg", alt: "Munchpal food-sharing website and mobile app" },
];

export default function HomePage() {
  return (
    <div className="home-page">
      <header className="home-hero">
        <div className="home-copy">
        <h1>Good design needs a little personality.</h1>
        <div className="home-intro">
          <p>I&apos;m Alan, a product designer based in Bandung. At <span className="current-employer">CADIT</span>, I work on component libraries and interfaces for international client projects.</p>
        </div>
        </div>
        <div className="home-character mobile-character"><AlanCharacter /></div>
      </header>
      <section className="selected-work" aria-labelledby="work-heading">
        <div className="section-heading"><h2 id="work-heading">Selected work</h2></div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article key={project.title} className={`project-card project-${project.slug}`} tabIndex={0} aria-labelledby={`project-${project.slug}`}>
              <div className="project-image">
                <Image src={`/images/design/${project.image}`} alt={project.alt} fill sizes="(max-width: 359px) calc(200vw - 80px), (max-width: 599px) calc(200vw - 96px), (max-width: 848px) calc(100vw - 72px), (max-width: 1000px) 776px, (max-width: 1250px) calc(100vw - 364px), (max-width: 1328px) calc(100vw - 396px), 932px" preload={index < 2} />
                <div className="project-reveal" aria-hidden="true">
                  <span className="project-name">{project.title}</span>
                  <ArrowUpRight className="project-arrow" size={20} />
                </div>
              </div>
              <h3 id={`project-${project.slug}`} className="sr-only">{project.title}</h3>
            </article>
          ))}
        </div>
      </section>
      <section className="home-about" aria-labelledby="approach-heading">
        <div className="approach-columns">
          <div className="approach-copy"><h2 id="approach-heading">From the first flow<br />to the final component.</h2>
            <p>I work across research, wireframes and prototypes for web and mobile. I care about how an interface looks, but also how it behaves, scales and gets built.</p>
            <ul className="skill-tags" aria-label="Design skills"><li>Product design</li><li>Design systems</li><li>Prototyping</li></ul>
          </div>
          <div className="experience"><div className="experience-heading"><h3>CADIT</h3><span>Oct 2025 — present</span></div><p className="job-title">UI/UX Designer</p>
            <p>Currently building a component library and UI mockups with developers for international client projects.</p>
            <p className="client-note">Through CADIT, my client work includes Daikin Singapore, Thai Honda, and SP Group Singapore.</p>
          </div>
        </div>
      </section>
      <ContactPanel />
    </div>
  );
}
