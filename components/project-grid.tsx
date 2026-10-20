"use client"

import Link from "next/link"
import { projects } from "@/lib/projects"
import { useLanguage } from "./language-provider"
import { ProjectMedia } from "./project-media"

export function ProjectGrid() {
  const { locale, t } = useLanguage()

  return (
    <section aria-labelledby="work-heading">
      <h2 id="work-heading" className="sr-only">
        {t.pages.work.eyebrow}
      </h2>
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {projects.map((project, index) => (
          <li key={project.slug}>
            <Link
              href={`/work/${project.slug}`}
              className="group block h-full rounded-2xl bg-muted p-2 transition-colors hover:bg-border/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ProjectMedia
                image={project.image}
                video={project.video}
                alt={project.imageAlt[locale]}
                priority={index < 2}
                className="isolate rounded-xl"
              />
              <div className="px-3 pb-3 pt-4">
                <h3 className="text-xl leading-snug tracking-tight text-balance md:text-2xl">{project.title[locale]}</h3>
                <ul className="mt-4 flex flex-wrap gap-1.5 text-xs" aria-label={t.work.disciplines}>
                  <li className="rounded-full bg-foreground px-3 py-1 text-background">{project.year}</li>
                  {project.tags.map((tag) => (
                    <li key={tag.en} className="rounded-full bg-background px-3 py-1 text-muted-foreground">
                      {tag[locale]}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
