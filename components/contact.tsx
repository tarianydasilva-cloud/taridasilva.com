"use client"

import { useState } from "react"
import { email, socials } from "@/lib/site"
import { useLanguage } from "./language-provider"

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

      <div className="mt-12 grid gap-2 md:grid-cols-3">
        <div className="flex flex-col justify-between gap-10 rounded-2xl bg-foreground p-6 text-background md:col-span-2 md:p-8">
          <p className="text-sm text-background/60">{t.contact.email}</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <a
              href={`mailto:${email}`}
              className="break-all text-3xl tracking-tight transition-colors hover:text-accent md:text-4xl"
            >
              {email}
            </a>
            <button
              type="button"
              data-copy={email}
              onClick={copyEmail}
              className="shrink-0 self-start rounded-full bg-background px-4 py-2 text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground sm:self-auto"
            >
              {copied ? t.contact.copied : t.contact.copy}
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-10 rounded-2xl bg-muted p-6 md:p-8">
          <p className="text-sm text-muted-foreground">{t.contact.elsewhere}</p>
          <ul className="flex flex-wrap gap-2">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-full bg-background px-4 py-2 transition-colors hover:bg-foreground hover:text-background"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
