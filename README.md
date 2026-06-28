# DELE B1 Marketing Site

Static marketing website for the DELE B1 Practice iOS app.

**Live at:** https://b1.prepdele.com

## Structure

```
├── index.html              # Homepage (Spanish)
├── en/index.html           # Homepage (English)
├── blog/                   # SEO articles (Spanish)
├── en/blog/                # SEO articles (English)
├── modelo-examen/          # Free exam model page
├── en/sample-exam/         # Free exam model page (English)
├── support/                # Support & FAQ
├── en/support/             # Support & FAQ (English)
├── privacy/                # Privacy policy
├── en/privacy/             # Privacy policy (English)
├── terms/                  # Terms of use
├── en/terms/               # Terms of use (English)
├── screenshots/            # App screenshots
├── styles.css              # Global styles
├── analytics.js            # GA4 event tracking
├── smart-link.js           # App Store link routing
├── robots.txt              # Search engine directives
└── sitemap.xml             # XML sitemap
```

## Setup

1. Replace `G-XXXXXXXXXX` with your actual GA4 Measurement ID in all HTML files
2. Replace `id6772564355` with the actual App Store app ID once published
3. Add an `og-image.png` (1200×630) for social sharing

## Deployment

Static files — deploy to any static host (GitHub Pages, Cloudflare Pages, Netlify, Vercel).

For GitHub Pages with custom domain:
1. Push to `main` branch
2. Go to Settings → Pages → set source to `main` branch, root `/`
3. Add custom domain `b1.prepdele.com`
4. Add a CNAME DNS record pointing `b1.prepdele.com` to `omaracgithub.github.io`

## Contact

hello@prepdele.com
