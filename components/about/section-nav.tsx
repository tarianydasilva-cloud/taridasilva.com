"use client"

import { sectionIds } from "@/lib/about"
import { useLanguage } from "../language-provider"
import { SectionNav } from "../section-nav"

export function AboutSectionNav({ vertical, className }: { vertical?: boolean; className?: string }) {
  const { t } = useLanguage()
  const items = sectionIds.map((id) => ({ id, label: t.about.sections[id] }))

  return <SectionNav items={items} label={t.about.sectionNav} vertical={vertical} className={className} />
}
