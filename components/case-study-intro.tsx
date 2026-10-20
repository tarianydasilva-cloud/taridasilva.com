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
        className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm transition-colors hover:bg-foreground hover:text-background"
      >
        <span aria-hidden="true">{"←"}</span>
        {t.work.allWork}
      </Link>
      <h1 className="mt-8 max-w-4xl text-4xl leading-[1.05] tracking-tight text-balance md:text-6xl">
        {project.title[locale]}
      </h1>
      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
        {project.summary[locale]}
      </p>
      <dl className="mt-10 flex flex-wrap gap-1.5 text-sm">
        <dt className="sr-only">{t.work.year}</dt>
        <dd className="rounded-full bg-foreground px-4 py-1.5 text-background">{project.year}</dd>
        <dt className="sr-only">{t.work.disciplines}</dt>
        {project.tags.map((tag) => (
          <dd key={tag.en} className="rounded-full bg-muted px-4 py-1.5">
            {tag[locale]}
          </dd>
        ))}
      </dl>
      <ProjectMedia
        image={project.image}
        video={project.video}
        alt={project.imageAlt?.[locale]}
        priority
        className="mt-12 rounded-2xl"
      />
    </article>
  )
}
