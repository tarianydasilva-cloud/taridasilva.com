import type { Metadata } from "next"
import { AboutHero } from "@/components/about/hero"
import { AboutSections } from "@/components/about/sections"
import { SectionNav } from "@/components/about/section-nav"

export const metadata: Metadata = { title: "About" }

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      {/* On large screens the steps sit under the name card instead (see NameCard). */}
      <SectionNav className="lg:hidden" />
      <AboutSections />
    </>
  )
}
