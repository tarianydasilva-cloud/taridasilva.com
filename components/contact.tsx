"use client"

import { useState } from "react"
import { email, socials } from "@/lib/site"
import { useLanguage } from "./language-provider"
import { ProjectMedia } from "./project-media"

// Shown next to the contact card: a picture or video of Tari. Put the file in /public/contact/.
const contactMedia: { image?: string; video?: string } = {}

export function Contact() {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard can be unavailable; the address stays selectable on the page.
    }
  }

  return (
    <section className="@container pt-6 md:pt-12">
      <h1 className="text-statement max-w-4xl text-balance">{t.contact.title}</h1>
      <p className="text-lead mt-6 max-w-2xl text-muted-foreground text-pretty">{t.contact.intro}</p>

      <div className="mt-12 grid gap-2 md:grid-cols-2">
        {/* Every way to reach Tari in one card. */}
        <div className="flex flex-col justify-between gap-12 rounded-2xl bg-foreground p-6 text-background md:min-h-[30rem] md:p-8">
          <div>
            <p className="text-sm text-background/60">{t.contact.email}</p>
            <a
              href={`mailto:${email}`}
              className="mt-3 block break-all text-3xl tracking-tight transition-colors hover:text-accent md:text-4xl"
            >
              {email}
            </a>
            <button
              type="button"
              data-copy={email}
              onClick={copyEmail}
              className="mt-5 rounded-full bg-background px-4 py-2 text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {copied ? t.contact.copied : t.contact.copy}
            </button>
          </div>
          <div>
            <p className="text-sm text-background/60">{t.contact.elsewhere}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-full bg-background/10 px-4 py-2 transition-colors hover:bg-background hover:text-foreground"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ProjectMedia
          image={contactMedia.image}
          video={contactMedia.video}
          className="aspect-[4/5] rounded-2xl md:aspect-auto md:min-h-[30rem]"
        />
      </div>
    </section>
  )
}
