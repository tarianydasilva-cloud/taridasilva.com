import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PrototypePage } from "@/components/prototype-page"

// Only Fleet Connect has a coded prototype so far.
const slugs = ["fleet-connect"]

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }))
}

export const metadata: Metadata = {
  title: "Fleet Connect prototype",
  description: "A working rebuild of two Fleet Connect widgets, coded in Claude Code with sample data.",
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  if (!slugs.includes((await params).slug)) notFound()
  return <PrototypePage />
}
