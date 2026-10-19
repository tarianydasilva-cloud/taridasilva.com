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
      <ul className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 md:gap-y-20">
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
                className="isolate rounded-lg group-focus-visible:ring-2 group-focus-visible:ring-accent group-focus-visible:ring-offset-4"
              />
              <h3 className="mt-5 text-xl leading-snug tracking-tight text-balance decoration-accent decoration-2 underline-offset-[6px] group-hover:underline md:text-2xl">
                {project.title[locale]}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {project.year} · {project.tags.map((tag) => tag[locale]).join(", ")}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
