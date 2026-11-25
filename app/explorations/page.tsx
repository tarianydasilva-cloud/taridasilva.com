import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Explorations } from "@/components/explorations"
import { showExplorations } from "@/lib/explorations"

export const metadata: Metadata = { title: "Explorations" }

export default function ExplorationsPage() {
  if (!showExplorations) notFound()
  return <Explorations />
}
