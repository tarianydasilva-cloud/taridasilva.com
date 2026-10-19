"use client"

import Link from "next/link"
import { getProject } from "@/lib/projects"
import { useLanguage } from "./language-provider"
import { ProjectMedia } from "./project-media"

export function CaseStudyIntro({ slug }: { slug: string }) {
  const { locale, t } = useLanguage()
  const project = getProject(slug)
  if (!project) return null

  return (
    <article>
      <Link
        href="/work"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
      >
        <span aria-hidden="true">{"←"}</span>
        {t.work.allWork}
      </Link>
      <h1 className="mt-8 max-w-4xl font-serif text-4xl leading-[1.1] text-balance md:text-6xl">
        {project.title[locale]}
      </h1>
      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
        {project.summary[locale]}
      </p>
      <dl className="mt-12 flex flex-wrap gap-x-16 gap-y-6 text-sm">
        <div>
          <dt className="text-sm text-muted-foreground">{t.work.year}</dt>
          <dd className="mt-2">{project.year}</dd>
        </div>
        <div>
          <dt className="text-sm text-muted-foreground">{t.work.disciplines}</dt>
          <dd className="mt-2">{project.tags.map((tag) => tag[locale]).join(", ")}</dd>
        </div>
      </dl>
      <ProjectMedia
        image={project.image}
        video={project.video}
        alt={project.imageAlt[locale]}
        priority
        className="mt-16 rounded-lg"
      />
    </article>
  )
}
