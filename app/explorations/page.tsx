import type { Metadata } from "next"
import { Explorations } from "@/components/explorations"

export const metadata: Metadata = { title: "Explorations" }

export default function ExplorationsPage() {
  return <Explorations />
}
