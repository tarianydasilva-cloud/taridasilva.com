import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProject, projects } from "@/lib/projects"
import { CaseStudy } from "@/components/case-study"

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

  return <CaseStudy slug={project.slug} />
}
