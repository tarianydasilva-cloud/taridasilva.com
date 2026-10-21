"use client"

import Link from "next/link"
import type { CSSProperties, ReactNode } from "react"
import { caseStudies } from "@/lib/case-studies"
import { projects } from "@/lib/projects"
import { cn } from "@/lib/utils"
import { useLanguage } from "./language-provider"
import { ProjectMedia } from "./project-media"
import { SectionNav } from "./section-nav"

// The case study column: three quarters of the page on large screens, full width below.
const wide = "(min-width: 1024px) 75vw, 100vw"

const sectionIds = ["overview", "challenge", "approach", "solution", "results", "learnings"] as const
type SectionId = (typeof sectionIds)[number]

function Section({ id, children }: { id: SectionId; children: ReactNode }) {
  const { t } = useLanguage()

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-32">
      <h2 id={`${id}-title`} className="text-2xl tracking-tight md:text-3xl">
        {t.caseStudy.sections[id]}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  )
}

function Paragraphs({ items }: { items: { en: string; es: string }[] }) {
  const { locale } = useLanguage()

  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <p key={item.en} className="text-lead reveal text-pretty">
          {item[locale]}
        </p>
      ))}
    </div>
  )
}

// One case study: the outcome and facts first, then challenge, decisions, solution, results and learnings,
// with the same index as the About page and a link to the next project at the end.
export function CaseStudy({ slug }: { slug: string }) {
  const { locale, t } = useLanguage()
  const index = projects.findIndex((project) => project.slug === slug)
  const project = projects[index]
  const study = caseStudies[slug]
  if (!project || !study) return null

  const next = projects[(index + 1) % projects.length]
  const navItems = sectionIds.map((id) => ({ id, label: t.caseStudy.sections[id] }))
  const facts = (["client", "role", "team", "date"] as const).map((key) => ({
    label: t.caseStudy.facts[key],
    value: study.facts[key][locale],
  }))

  return (
    <article className="pt-8 md:pt-12 lg:grid lg:grid-cols-12 lg:gap-x-10">
      <aside className="hidden lg:col-span-3 lg:block">
        <div className="sticky top-32">
          <SectionNav items={navItems} label={t.caseStudy.sectionNav} vertical />
        </div>
      </aside>

      <div className="min-w-0 lg:col-span-9">
        <header>
          <h1 className="text-4xl leading-[1.05] tracking-tight text-balance md:text-6xl">
            {project.title[locale]}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{project.summary[locale]}</p>
          <ul className="mt-6 flex flex-wrap gap-1.5 text-sm" aria-label={t.work.disciplines}>
            <li className="rounded-full bg-foreground px-4 py-1.5 text-background">{project.year}</li>
            {project.tags.map((tag) => (
              <li key={tag.en} className="rounded-full bg-muted px-4 py-1.5">
                {tag[locale]}
              </li>
            ))}
          </ul>
          <ProjectMedia
            image={project.cover ?? project.image}
            video={project.video}
            alt={project.imageAlt?.[locale]}
            priority
            sizes={wide}
            className="mt-10 rounded-2xl"
          />
        </header>

        <SectionNav items={navItems} label={t.caseStudy.sectionNav} className="lg:hidden" />

        <div className="@container flex flex-col gap-24 pt-20 md:gap-32 md:pt-28">
          <Section id="overview">
            <p className="text-statement reveal text-balance">{study.statement[locale]}</p>
            <dl className="mt-10 grid grid-cols-2 gap-2 md:grid-cols-4">
              {facts.map((fact) => (
                <div key={fact.label} className="rounded-2xl bg-muted p-4">
                  <dt className="text-sm text-muted-foreground">{fact.label}</dt>
                  <dd className="mt-1 text-pretty">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <ul className="mt-2 grid gap-2 sm:grid-cols-3">
              {study.outcomes.map((outcome) => (
                <li key={outcome.label.en} className="reveal flex flex-col gap-6 rounded-2xl bg-foreground p-5 text-background">
                  <span className="text-4xl tracking-tight text-accent md:text-5xl">{outcome.value[locale]}</span>
                  <span className="text-sm text-background/70">{outcome.label[locale]}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="challenge">
            <Paragraphs items={study.challenge} />
          </Section>

          <Section id="approach">
            {/* Rows always fill: on a 6-column grid, cards take thirds, and a final pair takes halves.
                Each card spans two subgrid rows, so titles and descriptions line up across a row. */}
            <ul className="grid gap-2 sm:grid-cols-2 xl:grid-cols-6">
              {study.decisions.map((decision, i) => (
                // On phones the cards stack: each one sticks a little lower than the last and the next slides over it.
                <li
                  key={decision.title.en}
                  style={{ "--stack": i } as CSSProperties}
                  className={cn(
                    "reveal row-span-2 grid grid-rows-subgrid gap-y-3 rounded-2xl bg-muted p-6 max-sm:sticky max-sm:top-[calc(9rem+var(--stack)*0.75rem)] max-sm:shadow-[0_-12px_24px_-16px_rgba(0,0,0,0.25)] max-sm:ring-1 max-sm:ring-black/5 sm:max-xl:last:odd:col-span-2 xl:col-span-2",
                    study.decisions.length % 3 === 2 && i >= study.decisions.length - 2 && "xl:col-span-3",
                  )}
                >
                  <h3 className="text-xl tracking-tight">{decision.title[locale]}</h3>
                  <p className="leading-relaxed text-muted-foreground">{decision.body[locale]}</p>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="solution">
            {study.solution && (
              <div className="mb-10">
                <Paragraphs items={study.solution} />
              </div>
            )}
            <div className="flex flex-col gap-8">
              {study.gallery.map((item) => (
                <figure key={item.caption.en} className="reveal">
                  <ProjectMedia
                    image={item.image}
                    alt={item.caption[locale]}
                    sizes={wide}
                    className="aspect-[16/10] rounded-2xl"
                  />
                  <figcaption className="mt-3 text-sm text-muted-foreground">{item.caption[locale]}</figcaption>
                </figure>
              ))}
            </div>
          </Section>

          <Section id="results">
            <Paragraphs items={study.results} />
            {study.resultHighlights && (
              <ul className="mt-8 grid gap-2 sm:grid-cols-2">
                {study.resultHighlights.map((highlight) => (
                  // An odd last card spans the row instead of sitting alone.
                  <li key={highlight.en} className="reveal rounded-2xl bg-muted p-5 leading-relaxed sm:last:odd:col-span-2">
                    {highlight[locale]}
                  </li>
                ))}
              </ul>
            )}
          </Section>

          <Section id="learnings">
            <Paragraphs items={study.learnings} />
          </Section>

          <Link
            href={`/work/${next.slug}`}
            className="group flex items-end justify-between gap-6 rounded-2xl bg-muted p-6 transition-colors hover:bg-border/70 md:p-8"
          >
            <span>
              <span className="block text-sm text-muted-foreground">{t.caseStudy.nextProject}</span>
              <span className="mt-2 block text-3xl tracking-tight md:text-4xl">{next.title[locale]}</span>
              <span className="mt-1 block text-muted-foreground">{next.summary[locale]}</span>
            </span>
            <span aria-hidden="true" className="text-2xl text-accent transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  )
}
