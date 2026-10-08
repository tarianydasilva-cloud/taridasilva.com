import type { Metadata } from "next"
import { PageIntro } from "@/components/page-intro"

export const metadata: Metadata = { title: "About" }

export default function AboutPage() {
  return <PageIntro page="about" />
}
