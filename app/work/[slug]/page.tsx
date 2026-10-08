import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProject, projects } from "@/lib/projects"
import { CaseStudyIntro } from "@/components/case-study-intro"

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProject((await params).slug)
  return project ? { title: project.title.en, description: project.summary.en } : {}
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug)
  if (!project) notFound()

  return <CaseStudyIntro slug={project.slug} />
}
