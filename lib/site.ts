// Contact details and outbound links shared by the footer and the "Let's talk" modal.
// Links without an href are placeholders and render as plain text.

export const emails = {
  newBusiness: "hello@taridasilva.com",
  careers: "hello@taridasilva.com",
}

export const address = ["[Street and number]", "[Postcode, City]", "[Country]"]

export type SiteLink = { label: string; href?: string }

export const socials: SiteLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Instagram", href: "https://www.instagram.com/" },
]

export const groupLinks: SiteLink[] = [{ label: "[Group]" }, { label: "[Company 1]" }, { label: "[Company 2]" }]

export const letsTalkId = "lets-talk"
