import { PageIntro } from "@/components/page-intro"
import { ProjectGrid } from "@/components/project-grid"

export default function HomePage() {
  return (
    <>
      <PageIntro page="home" />
      <ProjectGrid />
    </>
  )
}
