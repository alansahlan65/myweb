"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { projects } from "@/data/projects";
import { scrollToTop } from "./smooth-scroll";
import { StateIcon } from "./state-icon";

export function ProjectsCatalog() {
  return (
    <div className="projects-list">
      {projects.map((project, index) => {
        const media = (
          <div className={`project-row-media project-${project.slug}`}>
            <Image
              src={project.image}
              alt={project.alt}
              fill
              sizes="(max-width: 820px) calc(200vw - 96px), 932px"
              preload={index < 2}
            />
          </div>
        );

        const body = (
          <div className="project-row-body">
            <p className="project-row-meta">
              {project.category} · {project.year}
            </p>
            <h2>{project.title}</h2>
            <p className="project-row-summary">{project.summary}</p>
            {project.href ? (
              <span className="project-row-cta">
                <span>Read case study</span>
                <StateIcon icon={ArrowUpRight} size={15} activeWeight="bold" />
              </span>
            ) : null}
          </div>
        );

        if (project.href) {
          return (
            <article key={project.slug} id={project.slug} className="project-row project-row-linked">
              <Link href={project.href} className="project-row-link" scroll={false} onNavigate={scrollToTop}>
                {media}
                {body}
              </Link>
            </article>
          );
        }

        return (
          <article key={project.slug} id={project.slug} className="project-row">
            {media}
            {body}
          </article>
        );
      })}
    </div>
  );
}
