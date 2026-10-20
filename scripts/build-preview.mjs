// Packs the running site (`pnpm build && pnpm start`) into one self-contained
// HTML file for a clickable preview: every route in every locale, routed by URL hash.
// Usage: node scripts/build-preview.mjs <out.html> [baseUrl]
import { writeFile } from "node:fs/promises"

const [out, base = "http://localhost:3000"] = process.argv.slice(2)
if (!out) throw new Error("Usage: node scripts/build-preview.mjs <out.html> [baseUrl]")

const locales = ["en", "es"]
const imageWidth = 1200

async function get(path, { locale, accept } = {}) {
  const headers = {}
  if (locale) headers.cookie = `locale=${locale}`
  if (accept) headers.accept = accept
  const res = await fetch(base + path, { headers })
  if (!res.ok) throw new Error(`${res.status} ${path}`)
  return res
}

const dataUri = async (path, accept) => {
  const res = await get(path, { accept })
  const type = res.headers.get("content-type").split(";")[0]
  return `data:${type};base64,${Buffer.from(await res.arrayBuffer()).toString("base64")}`
}

// "/" -> "home", "/work/ledger" -> "work.ledger" (plain tokens survive in artifact hashes)
const routeKey = (path) => path.replace(/^\/|\/$/g, "").replace(/\//g, ".") || "home"

const workHtml = await (await get("/work")).text()
const slugs = [...new Set([...workHtml.matchAll(/href="\/work\/([\w-]+)"/g)].map((m) => m[1]))]
const routes = ["/", "/work", "/about", "/contact", ...slugs.map((slug) => `/work/${slug}`)]

const stylesheets = new Set()
const images = new Map()
const media = new Map()
let htmlClass = ""
let bodyClass = ""
const views = []

for (const locale of locales) {
  for (const route of routes) {
    const html = await (await get(route, { locale })).text()
    htmlClass = html.match(/<html[^>]*class="([^"]*)"/)?.[1] ?? htmlClass
    bodyClass = html.match(/<body[^>]*class="([^"]*)"/)?.[1] ?? bodyClass
    for (const m of html.matchAll(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"/g)) stylesheets.add(m[1])
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? ""

    let body = html.match(/<body[^>]*>([\s\S]*)<\/body>/)[1]
    body = body
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
      .replace(/<script\b[^>]*\/>/g, "")
      .replace(/<link\b[^>]*>/g, "")
      .replace(/\shref="(\/[^"#]*)"/g, (_, path) => ` href="#${routeKey(path)}"`)
      .replace(/<img\b[^>]*>/g, (tag) => {
        const src = decodeURIComponent(tag.match(/url=([^&"]+)/)?.[1] ?? "")
        if (!src) return tag
        images.set(src, null)
        return tag
          .replace(/\s(srcSet|sizes)="[^"]*"/g, "")
          .replace(/\ssrc="[^"]*"/, ` data-pv-src="${src}"`)
      })
    // Videos and their posters are inlined whole, like the fonts.
    for (const m of body.matchAll(/<video\b[^>]*>/g)) {
      for (const [, path] of m[0].matchAll(/\s(?:src|poster)="(\/[^"]+)"/g)) media.set(path, null)
    }
    views.push(
      `<div class="pv-view" data-key="${routeKey(route)}" data-locale="${locale}" data-title="${title}" hidden>${body}</div>`,
    )
  }
}

for (const src of images.keys()) {
  images.set(src, await dataUri(`/_next/image?url=${encodeURIComponent(src)}&w=${imageWidth}&q=75`, "image/webp"))
}

for (const path of media.keys()) media.set(path, await dataUri(path))

let css = ""
for (const href of stylesheets) {
  let sheet = await (await get(href)).text()
  // Font and image URLs may be absolute (/_next/…) or relative to the stylesheet (../media/…).
  for (const url of new Set([...sheet.matchAll(/url\(((?:\/_next\/|\.\.?\/)[^)]+)\)/g)].map((m) => m[1]))) {
    const path = new URL(url, base + href).pathname
    sheet = sheet.replaceAll(`url(${url})`, `url(${await dataUri(path)})`)
  }
  css += sheet
}

const script = `
const images = ${JSON.stringify(Object.fromEntries(images))};
const views = [...document.querySelectorAll(".pv-view")];
const keys = new Set(views.map((v) => v.dataset.key));
document.documentElement.className = ${JSON.stringify(htmlClass)};
document.body.className = ${JSON.stringify(bodyClass)};
document.querySelectorAll("img[data-pv-src]").forEach((img) => { img.src = images[img.dataset.pvSrc]; });
let locale = "en";
// Like the site: a chosen language wins, otherwise the browser's language, English by default.
try { locale = localStorage.getItem("locale") || ""; } catch {}
if (locale !== "en" && locale !== "es") locale = (navigator.language || "").toLowerCase().startsWith("es") ? "es" : "en";
let current = "home";

// Every view repeats the same ids, so only the visible view keeps its real ids.
// That way in-page anchors and popover targets resolve inside the page on screen.
views.forEach((view, i) => view.querySelectorAll("[id]").forEach((el) => {
  el.dataset.pvId = el.id;
  el.id = el.id + "--pv" + i;
}));
function render(scroll) {
  for (const view of views) view.hidden = view.dataset.key !== current || view.dataset.locale !== locale;
  const active = views.find((v) => !v.hidden);
  views.forEach((view, i) => view.querySelectorAll("[data-pv-id]").forEach((el) => {
    el.id = view === active ? el.dataset.pvId : el.dataset.pvId + "--pv" + i;
  }));
  document.documentElement.lang = locale;
  if (active) document.title = active.dataset.title;
  if (scroll) window.scrollTo(0, 0);
  trackSections(active);
}

// Mirrors the site's section nav (components/about/section-nav.tsx): a clicked step is current
// while the page scrolls to it; otherwise the last section whose top passed the active line is.
const ACTIVE_LINE = 180;
let navLinks = [];
let navScrollingTo = false;
let navTimer;

function markNav(id) {
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === "#" + id) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}

function updateNav() {
  if (navScrollingTo || !navLinks.length) return;
  const ids = [...new Set(navLinks.map((link) => link.getAttribute("href").slice(1)))];
  let current = ids[0];
  if (innerHeight + scrollY >= document.documentElement.scrollHeight - 2) current = ids[ids.length - 1];
  else for (const id of ids) {
    const section = document.getElementById(id);
    if (section && section.getBoundingClientRect().top <= ACTIVE_LINE) current = id;
  }
  markNav(current);
}

function trackSections(active) {
  navLinks = [...(active?.querySelectorAll("[data-section-nav] a[href^='#']") ?? [])];
  navScrollingTo = false;
  updateNav();
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("[data-section-nav] a[href^='#']");
  if (!link) return;
  markNav(link.getAttribute("href").slice(1));
  navScrollingTo = true;
  const release = () => { navScrollingTo = false; clearTimeout(navTimer); };
  addEventListener("scrollend", release, { once: true });
  clearTimeout(navTimer);
  navTimer = setTimeout(release, 1200);
});
addEventListener("scroll", updateNav, { passive: true });

// Mirrors the site header (components/site-header.tsx): shown near the top and bottom and on scroll up,
// hidden while scrolling down; <html data-header-shown> lets the section bar move below it.
let lastScrollY = scrollY;
document.documentElement.toggleAttribute("data-header-shown", true);
addEventListener("scroll", () => {
  const y = scrollY;
  const nearTop = y <= 80;
  const nearBottom = innerHeight + y >= document.documentElement.scrollHeight - 80;
  let hidden;
  if (nearTop || nearBottom) hidden = false;
  else if (Math.abs(y - lastScrollY) >= 4) hidden = y > lastScrollY;
  if (hidden !== undefined) {
    document.querySelectorAll("[data-autohide]").forEach((header) => header.toggleAttribute("data-hidden", hidden));
    document.documentElement.toggleAttribute("data-header-shown", !hidden);
  }
  lastScrollY = y;
}, { passive: true });
addEventListener("resize", updateNav);

function route() {
  const hash = location.hash.slice(1);
  const active = views.find((v) => !v.hidden);
  if (hash === "top") { window.scrollTo({ top: 0, behavior: "smooth" }); history.replaceState(null, "", "#" + current); return; }
  if (hash === "main") { history.replaceState(null, "", "#" + current); return; }
  // An in-page anchor of the current view: let the browser scroll to it and keep the route.
  if (hash && !keys.has(hash) && active?.querySelector("#" + CSS.escape(hash))) {
    history.replaceState(null, "", "#" + current);
    return;
  }
  current = keys.has(hash) ? hash : "home";
  render(true);
}

// The About desktop's menu bar clock shows the visitor's own time (components/about/desktop.tsx).
function tickClocks() {
  const time = new Date()
    .toLocaleString(undefined, { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })
    .replace(/,/g, "");
  document.querySelectorAll("[data-local-clock]").forEach((el) => { el.textContent = time; });
}
tickClocks();
setInterval(tickClocks, 15000);

// Copy buttons (the contact page's email).
document.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-copy]");
  if (button) navigator.clipboard?.writeText(button.dataset.copy).catch(() => {});
});

document.addEventListener("click", (event) => {
  const button = event.target.closest('[role="group"] button[lang]');
  if (!button) return;
  locale = button.lang;
  try { localStorage.setItem("locale", locale); } catch {}
  render(false);
});
window.addEventListener("hashchange", route);
route();
`

const page = `<title>Tari da Silva Portfolio</title>
<style>${css}
.pv-view{display:contents}</style>
${views.join("\n").replace(/(<video\b[^>]*>)/g, (tag) => tag.replace(/\s(src|poster)="(\/[^"]+)"/g, (_, attr, path) => ` ${attr}="${media.get(path)}"`))}
<script>${script}</script>
`

await writeFile(out, page)
console.log(`${routes.length} routes x ${locales.length} locales -> ${out} (${(page.length / 1024).toFixed(0)} KB)`)
