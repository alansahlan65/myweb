import type { Metadata } from "next";
import { MapPinned } from "lucide-react";
import { Portrait } from "@/components/portrait";
import { Shelf } from "@/components/shelf";
import { ContactPanel } from "@/components/contact-panel";
import { AlanSignature } from "@/components/alan-signature";

export const metadata: Metadata = { title: "Know me better" };

const experience = [
  { company: "CADIT", role: "UI/UX Designer", period: "Oct 2025 - Present" },
  { company: "Freelance", role: "UI/UX Designer", period: "Jan 2024 - Present" },
  { company: "Digistar Class Telkom", role: "UI/UX Design Intern", period: "Aug 2024 - Oct 2024" },
  { company: "Startup Campus", role: "UI/UX Designer Intern", period: "Feb 2023 - Jun 2023" },
];

export default function AboutPage() {
  return (
    <div className="about-page">
      <header className="about-prologue">
        <div className="about-introduction"><Portrait /><h1>Hi, I&apos;m Alan!</h1><p className="location-note"><MapPinned size={16} />Bandung, Indonesia</p>
          <p>Music, art, games. That&apos;s where this all started for me. Computer got me curious about coding, and I went on to study Informatics at Universitas Brawijaya.</p>
          <p>Then I started building apps. Somewhere between getting a page to work and figuring out how people would use it, I found out about Product Design.<br />Long story short, here we are.</p>
        </div>
      </header>
      <section className="about-experience" aria-labelledby="experience-heading">
        <h2 id="experience-heading">Experience</h2>
        <ul className="experience-list">
          {experience.map((position) => (
            <li key={position.company}>
              <div className="experience-position">
                <h3>{position.company}</h3>
                <p>{position.role}</p>
              </div>
              <p className="experience-period">{position.period}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="favorites" aria-labelledby="shelf-heading">
        <div className="shelf-heading"><h2 id="shelf-heading">A few things I keep coming back to</h2><span>Pick something up.</span></div>
        <Shelf />
        <p className="away-note">Away from the screen: coffee, lifting weights, and keeping up with the NBA.</p>
      </section>
      <section className="learning" aria-labelledby="learning-heading"><h2 id="learning-heading">Still figuring things out</h2>
        <p>These days, I design at CADIT. I&apos;m also learning to build the things I design, with some help from AI. This website is part of that learning.</p>
      </section>
      <section className="personal-closing" aria-label="A note from Alan"><p>Anyway, that&apos;s a bit of me. Feel free to reach out!<br />Sincerely,</p><AlanSignature /></section>
      <ContactPanel personal />
    </div>
  );
}
