import type { Metadata } from "next";
import { ContactPanel } from "@/components/contact-panel";
import { ProjectsCatalog } from "@/components/projects-catalog";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected web and mobile product design work by Alan Sahlan.",
};

export default function ProjectsPage() {
  return (
    <div className="projects-page">
      <header className="projects-header">
        <div className="projects-header-copy">
          <h1>Projects</h1>
          <p>Selected work across web and mobile.</p>
        </div>
      </header>
      <ProjectsCatalog />
      <ContactPanel variant="projects" />
    </div>
  );
}
