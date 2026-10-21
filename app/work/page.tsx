import type { Metadata } from "next"
import { ProjectGrid } from "@/components/project-grid"

export const metadata: Metadata = { title: "Work" }

// Just the project cards, with the same top spacing as the home statement.
export default function WorkPage() {
  return (
    <div className="pt-6 md:pt-12">
      <ProjectGrid />
    </div>
  )
}
