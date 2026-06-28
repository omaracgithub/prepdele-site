/**
 * Tags every CTA + store-badge link with a data-cta attribute and adds
 * UTM parameters to App Store links so we can attribute installs in App Store Connect.
 *
 * Run: node scripts/tag-ctas.js
 *
 * Idempotent: safe to run multiple times.
 */
const fs = require("fs");
const path = require("path");

const WEB_DIR = path.join(__dirname, "..");

function patch(file) {
  let html = fs.readFileSync(file, "utf-8");
  const orig = html;

  // Compute the page slug for the CTA name
  const rel = path.relative(WEB_DIR, file).replace(/[\\/]?index\.html$/, "").replace(/\\/g, "/");
  const slug = rel === "" ? "home" : rel.replace(/\//g, "_");

  // Tag in-page download CTA boxes (anchors with btn-primary that don't already have data-cta)
  html = html.replace(
    /<a([^>]*class="btn btn-primary"[^>]*)>/g,
    (full, attrs) => {
      if (/data-cta=/.test(attrs)) return full;
      // Pull href to decide what kind of CTA this is
      const hrefMatch = attrs.match(/href="([^"]+)"/);
      const href = hrefMatch ? hrefMatch[1] : "";
      let name = "cta_" + slug;
      if (/#download/.test(href)) name = "download_" + slug;
      else if (/sample-exam|modelo-examen/.test(href)) name = "sample_" + slug;
      return `<a${attrs} data-cta="${name}">`;
    }
  );

  // Tag App Store badge links + add UTM source
  html = html.replace(
    /<a([^>]*href="https:\/\/apps\.apple\.com[^"]*)("[^>]*)>/g,
    (full, before, after) => {
      // Skip if already tagged
      if (/data-cta=/.test(full)) return full;

      // Add UTM if missing
      let beforeFixed = before;
      if (!/[?&]utm_source=/.test(before)) {
        const sep = before.includes("?") ? "&" : "?";
        beforeFixed = `${before}${sep}utm_source=site&utm_medium=organic&utm_campaign=${slug}`;
      }
      return `<a${beforeFixed}${after} data-cta="ios_badge_${slug}">`;
    }
  );

  if (html !== orig) {
    fs.writeFileSync(file, html);
    console.log("tagged", path.relative(WEB_DIR, file));
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== "scripts" && entry.name !== ".git") walk(full);
    else if (entry.name.endsWith(".html")) patch(full);
  }
}

walk(WEB_DIR);
console.log("done");
