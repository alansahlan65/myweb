"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projectFilters, projects, type ProjectCategoryId } from "@/data/projects";
import { scrollToTop } from "./smooth-scroll";

export function ProjectsCatalog() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategoryId>("all");

  const visibleProjects = activeFilter === "all"
    ? projects
    : projects.filter((project) => project.filters.includes(activeFilter));

  function countFor(filterId: ProjectCategoryId) {
    if (filterId === "all") return projects.length;
    return projects.filter((project) => project.filters.includes(filterId)).length;
  }

  return (
    <>
      <div className="project-filters" role="group" aria-label="Filter projects by discipline">
        {projectFilters.map((filter) => {
          const active = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              className="project-filter-pill"
              aria-pressed={active}
              onClick={() => setActiveFilter(filter.id)}
            >
              <span>{filter.label}</span>
              <span className="project-filter-count">{countFor(filter.id)}</span>
            </button>
          );
        })}
      </div>

      <div className="projects-list" aria-live="polite">
        {visibleProjects.map((project, index) => {
          const media = (
            <div className={`project-row-media project-${project.slug}`}>
              <Image
                src={project.image}
                alt={project.alt}
                fill
                sizes="(max-width: 820px) calc(100vw - 48px), 456px"
                preload={index < 2}
              />
            </div>
          );

          const body = (
            <div className="project-row-body">
              <div className="project-row-top">
                <div className="project-row-heading">
                  <h2>{project.title}</h2>
                  <span className="project-row-year">{project.year}</span>
                </div>
                <p className="project-row-category">{project.category}</p>
                <p className="project-row-summary">{project.summary}</p>
              </div>
              <div className="project-row-bottom">
                <ul className="skill-tags project-row-tags" aria-label={`${project.title} disciplines`}>
                  {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
                {project.href ? (
                  <span className="project-row-cta">
                    <span>Read case study</span>
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                ) : (
                  <span className="project-row-status">Case study in progress</span>
                )}
              </div>
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
    </>
  );
}
