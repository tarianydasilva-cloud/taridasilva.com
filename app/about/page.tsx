import type { Metadata } from "next"
import { AboutHero } from "@/components/about/hero"
import { AboutSections } from "@/components/about/sections"
import { SectionNav } from "@/components/about/section-nav"

export const metadata: Metadata = { title: "About" }

// Editorial layout: a sticky index in the left margin, the page in the remaining columns.
export default function AboutPage() {
  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-x-10">
      <aside className="hidden lg:col-span-3 lg:block">
        <div className="sticky top-28">
          <SectionNav vertical />
        </div>
      </aside>
      <div className="min-w-0 lg:col-span-9">
        <AboutHero />
        <SectionNav className="lg:hidden" />
        <AboutSections />
      </div>
    </div>
  )
}
