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
    views.push(
      `<div class="pv-view" data-key="${routeKey(route)}" data-locale="${locale}" data-title="${title}" hidden>${body}</div>`,
    )
  }
}

for (const src of images.keys()) {
  images.set(src, await dataUri(`/_next/image?url=${encodeURIComponent(src)}&w=${imageWidth}&q=75`, "image/webp"))
}

let css = ""
for (const href of stylesheets) {
  let sheet = await (await get(href)).text()
  for (const url of new Set([...sheet.matchAll(/url\((\/_next\/[^)]+)\)/g)].map((m) => m[1]))) {
    sheet = sheet.replaceAll(`url(${url})`, `url(${await dataUri(url)})`)
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
try { locale = localStorage.getItem("locale") || "en"; } catch {}
let current = "home";

// Every view repeats the same ids, so only the visible view keeps its real ids.
// That way in-page anchors and popover targets resolve inside the page on screen.
views.forEach((view, i) => view.querySelectorAll("[id]").forEach((el) => {
  el.dataset.pvId = el.id;
  el.id = el.id + "--pv" + i;
}));
let observer;

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

// Mirrors the site's sticky section nav: marks the section crossing the upper third of the screen.
function trackSections(active) {
  observer?.disconnect();
  const links = [...(active?.querySelectorAll("[data-section-nav] a[href^='#']") ?? [])];
  if (!links.length) return;
  const mark = (id) => links.forEach((link) => {
    if (link.getAttribute("href") === "#" + id) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) if (entry.isIntersecting) mark(entry.target.id);
  }, { rootMargin: "-30% 0px -60% 0px" });
  links.forEach((link) => {
    const section = document.getElementById(link.getAttribute("href").slice(1));
    if (section) observer.observe(section);
  });
}

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
${views.join("\n")}
<script>${script}</script>
`

await writeFile(out, page)
console.log(`${routes.length} routes x ${locales.length} locales -> ${out} (${(page.length / 1024).toFixed(0)} KB)`)
