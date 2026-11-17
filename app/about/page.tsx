import type { Metadata } from "next"
import { AboutProfile } from "@/components/about/profile"

export const metadata: Metadata = { title: "About" }

export default function AboutPage() {
  return <AboutProfile />
}
