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
            {/* Nearly a screen tall, so one row fills the view and the next row peeks in below. */}
            <Link
              href={`/work/${project.slug}`}
              className="group flex h-[calc(100svh-11rem)] max-h-[60rem] min-h-[28rem] flex-col overflow-hidden rounded-2xl bg-muted transition-colors hover:bg-border/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <div className="px-6 pb-6 pt-7 md:px-7">
                <h3 className="text-2xl leading-tight tracking-tight text-balance md:text-3xl">{project.title[locale]}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{project.year}</p>
                <p className="mt-2 line-clamp-2 max-w-md leading-relaxed text-muted-foreground">
                  {project.summary[locale]}
                </p>
              </div>
              {/* The picture bleeds to the card edges and takes all the space left below the text. */}
              <ProjectMedia
                image={project.image}
                video={project.video}
                alt={project.imageAlt?.[locale]}
                priority={index < 2}
                className="isolate aspect-auto min-h-0 flex-1"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
