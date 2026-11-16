"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import { caseStudies, type GalleryItem } from "@/lib/case-studies"
import { projects } from "@/lib/projects"
import { cn } from "@/lib/utils"
import { useLanguage } from "./language-provider"
import { Quote, Scene, ServicesPhone } from "./case-study-scenes"
import { EdgeCaseSpec } from "./edge-case-spec"
import { FleetPrototype } from "./fleet-prototype"
import { ProjectMedia } from "./project-media"
import { ProjectMotion } from "./project-motion"

// One column for the whole case: a wide track for pictures, a narrow one for reading.
const wide = "(min-width: 1100px) 1036px, 100vw"
const reading = "max-w-xl"

function Text({ items, className }: { items: { en: string; es: string }[]; className?: string }) {
  const { locale } = useLanguage()

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {items.map((item) => (
        <p key={item.en} className="leading-relaxed text-pretty">
          {item[locale]}
        </p>
      ))}
    </div>
  )
}

function Chapter({
  id,
  eyebrow,
  title,
  className,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  className?: string
  children: ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn(reading, className)}>
      <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{eyebrow}</p>
      <h2 id={`${id}-title`} className="mt-3 text-2xl tracking-tight text-balance md:text-3xl">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  )
}

function Media({ item }: { item: GalleryItem }) {
  const { locale } = useLanguage()

  if (item.embed === "edge-cases") return <EdgeCaseSpec />
  if (item.embed) return <FleetPrototype />
  if (item.scene) return <Scene scene={item.scene} />
  if (item.quote) return <Quote lines={item.quote} />
  if (item.pair)
    return (
      <div className="grid gap-2 sm:grid-cols-2">
        {item.pair.map((side) =>
          typeof side === "string" ? (
            <ProjectMedia
              key={side}
              image={side}
              alt={item.caption?.[locale]}
              sizes="(min-width: 1100px) 518px, (min-width: 640px) 50vw, 100vw"
              className="aspect-[4/5] rounded-2xl ring-1 ring-black/5"
            />
          ) : (
            <ServicesPhone key={side.scene} />
          ),
        )}
      </div>
    )
  return (
    <ProjectMedia image={item.image} alt={item.caption?.[locale]} sizes={wide} className="aspect-[16/10] rounded-2xl" />
  )
}

// A case study in five beats: the headline and facts, the cover, a short summary with the decision, its
// trade-off and status, the challenge, then the work with its pictures, closing on what it taught.
export function CaseStudy({ slug }: { slug: string }) {
  const { locale, t } = useLanguage()
  const index = projects.findIndex((project) => project.slug === slug)
  const project = projects[index]
  const study = caseStudies[slug]
  if (!project || !study) return null

  const previous = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]
  const facts = (["client", "role", "team", "date"] as const).map((key) => ({
    label: t.caseStudy.facts[key],
    value: study.facts[key][locale],
  }))
  const lead = (["decision", "tradeoff", "status"] as const).map((key) => ({
    label: t.caseStudy.lead[key],
    value: study.lead[key][locale],
  }))
  const gallery = (
    <div className="flex flex-col gap-6">
      {study.gallery.map((item, i) => (
        <figure key={i} className="reveal">
          <Media item={item} />
          {item.caption && (
            <figcaption className="mt-3 text-sm text-muted-foreground">{item.caption[locale]}</figcaption>
          )}
          {/* A clear way out to the full-size version, for anything that works better with room. */}
          {item.link && (
            <Link
              href={item.link.href}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-background transition-colors hover:bg-accent"
            >
              {item.link.label[locale]}
              <span aria-hidden="true">→</span>
            </Link>
          )}
        </figure>
      ))}
    </div>
  )
  const pill = "rounded-full px-4 py-2 text-sm transition-colors hover:bg-foreground hover:text-background"

  return (
    <article className="mx-auto max-w-[1036px] pt-8 md:pt-12">
      <header>
        <p className="text-sm text-muted-foreground">{project.title[locale]}</p>
        <h1 className="mt-3 text-4xl leading-[1.05] tracking-tight text-balance md:text-6xl">
          {study.headline[locale]}
        </h1>
        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-5 md:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label} className="min-w-0">
              <dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{fact.label}</dt>
              <dd className="mt-1.5 text-sm text-pretty">{fact.value}</dd>
            </div>
          ))}
        </dl>
        {study.galleryFirst ? (
          <div className="mt-10">{gallery}</div>
        ) : project.motion && !project.cover ? (
          <ProjectMotion motion={project.motion} variant="cover" className="mt-10 aspect-video rounded-2xl" />
        ) : (
          <ProjectMedia
            image={project.cover ?? project.image}
            video={project.video}
            alt={project.imageAlt?.[locale]}
            priority
            sizes={wide}
            className="mt-10 rounded-2xl"
          />
        )}
      </header>

      <p className="text-lead mt-20 max-w-xl text-pretty md:mt-28">{study.summary[locale]}</p>

      {/* Where a case has no outcome figures, the three cells hold the decision, its cost and where it stands. */}
      <dl className="mt-14 grid overflow-hidden rounded-2xl border border-border md:grid-cols-3">
        {lead.map((cell) => (
          <div
            key={cell.label}
            className="border-border p-6 not-last:border-b md:not-last:border-r md:not-last:border-b-0"
          >
            <dt className="text-xs uppercase tracking-[0.12em] text-accent">{cell.label}</dt>
            <dd className="mt-3 leading-snug text-pretty">{cell.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-24 flex flex-col gap-24 md:mt-32 md:gap-32">
        <Chapter id="challenge" eyebrow={t.caseStudy.challenge} title={study.challengeTitle[locale]}>
          <Text items={study.challenge} />
        </Chapter>

        <Chapter id="work" eyebrow={t.caseStudy.work} title={study.workTitle[locale]}>
          <div className="flex flex-col gap-4">
            {study.solution && <Text items={study.solution} />}
            {study.decisions.map((decision) => (
              <p key={decision.title.en} className="leading-relaxed text-pretty">
                <strong className="font-medium">{decision.title[locale]}.</strong> {decision.body[locale]}
              </p>
            ))}
            <Text items={study.results} />
          </div>
        </Chapter>

        {!study.galleryFirst && gallery}

        <Text items={study.learnings} className="text-lead max-w-xl" />

        <nav aria-label={t.caseStudy.nextProject} className="flex">
          <div className="inline-flex gap-1 rounded-full bg-muted p-1">
            <Link href={`/work/${previous.slug}`} className={pill} title={previous.title[locale]}>
              <span aria-hidden="true">← </span>
              {t.caseStudy.pager.previous}
            </Link>
            <Link href="/work" className={pill}>
              {t.caseStudy.pager.close}
            </Link>
            <Link href={`/work/${next.slug}`} className={pill} title={next.title[locale]}>
              {t.caseStudy.pager.next}
              <span aria-hidden="true"> →</span>
            </Link>
          </div>
        </nav>
      </div>
    </article>
  )
}
