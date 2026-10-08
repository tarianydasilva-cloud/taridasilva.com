"use client"

import Link from "next/link"
import { projects } from "@/lib/projects"
import { useLanguage } from "./language-provider"
import { ProjectMedia } from "./project-media"

export function ProjectGrid() {
  const { locale, t } = useLanguage()

  return (
    <section aria-labelledby="work-heading" className="@container pb-32 md:pb-48">
      <h2 id="work-heading" className="sr-only">
        {t.pages.work.eyebrow}
      </h2>
      <ul className="grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-2 md:gap-y-24">
        {projects.map((project, index) => (
          <li key={project.slug}>
            <Link
              href={`/work/${project.slug}`}
              className="group block focus-visible:outline-none"
            >
              <ProjectMedia
                image={project.image}
                video={project.video}
                alt={project.imageAlt[locale]}
                priority={index < 2}
                className="isolate rounded-2xl group-focus-visible:ring-2 group-focus-visible:ring-accent group-focus-visible:ring-offset-4"
              />
              <div className="mt-6 flex items-start justify-between gap-6">
                <div className="min-w-0">
                  <h3 className="text-xl leading-snug tracking-tight text-balance md:text-2xl">
                    {project.title[locale]}
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label={t.work.disciplines}>
                    {project.tags.map((tag) => (
                      <li
                        key={tag.en}
                        className="rounded-full border border-border px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground"
                      >
                        {tag[locale]}
                      </li>
                    ))}
                  </ul>
                </div>
                <span
                  aria-hidden="true"
                  className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-background motion-reduce:transition-none"
                >
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    className="size-4 -translate-x-0.5 translate-y-0.5 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0 motion-reduce:transition-none"
                  >
                    <path d="M4.5 11.5l7-7M5.5 4.5h6v6" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
