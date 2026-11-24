import Image from "next/image";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import { AlanCharacter } from "@/components/alan-character";
import { ContactPanel } from "@/components/contact-panel";
import { StateIcon } from "@/components/state-icon";
import { projects } from "@/data/projects";

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
        <div className="section-heading">
          <h2 id="work-heading">Selected work</h2>
          <Link href="/projects" className="section-link">
            <span>All projects</span>
            <StateIcon icon={IconArrowUpRight} size={15} stroke={1.85} activeStroke={2.45} />
          </Link>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article key={project.slug} className={`project-card project-${project.slug}`}>
              <Link
                href={project.href ?? `/projects#${project.slug}`}
                className="project-card-link"
                aria-labelledby={`project-${project.slug}`}
              >
                <div className="project-image">
                  <Image src={project.image} alt={project.alt} fill sizes="(max-width: 359px) calc(200vw - 80px), (max-width: 599px) calc(200vw - 96px), (max-width: 848px) calc(100vw - 72px), (max-width: 1000px) 776px, (max-width: 1250px) calc(100vw - 364px), (max-width: 1328px) calc(100vw - 396px), 932px" preload={index < 2} />
                  <div className="project-reveal" aria-hidden="true">
                    <span className="project-name">{project.title}</span>
                    <IconArrowUpRight className="project-arrow" size={20} stroke={1.9} />
                  </div>
                </div>
                <h3 id={`project-${project.slug}`} className="sr-only">{project.title}</h3>
              </Link>
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
