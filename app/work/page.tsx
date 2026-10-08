import type { Metadata } from "next"
import { PageIntro } from "@/components/page-intro"
import { ProjectGrid } from "@/components/project-grid"

export const metadata: Metadata = { title: "Work" }

export default function WorkPage() {
  return (
    <>
      <PageIntro page="work" />
      <ProjectGrid />
    </>
  )
}
