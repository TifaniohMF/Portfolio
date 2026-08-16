# Portfolio — Tifanioh Randrianoelina

Personal portfolio built with plain HTML, CSS and JavaScript (no framework, no build step).
Live at: https://tifaniohmf.github.io/Portfolio/

## Structure

```
.
├── index.html        Main page (markup + content structure)
├── style.css          Design system (CSS custom properties, light/dark theme)
├── script.js          Interactivity: theme toggle, project loading, animations
├── projects.json      Project data, loaded at runtime via fetch()
├── favicon.svg        Site icon
├── manifest.json      Web app manifest (installable / PWA metadata)
├── robots.txt         Search engine crawling rules
├── sitemap.xml         Sitemap for search engines
└── 404.html           Custom "page not found" page (GitHub Pages picks this up automatically)
```

## Tech used

- **HTML5** — semantic structure, meta tags for SEO and social sharing (Open Graph)
- **CSS3** — custom properties (variables) for a full light/dark theme system, CSS Grid & Flexbox, `prefers-reduced-motion` support
- **JavaScript (vanilla)**
  - `fetch()` + JSON to separate content from markup (`projects.json`)
  - `IntersectionObserver` for scroll-reveal animations
  - `localStorage` + `matchMedia` for a persistent dark/light theme toggle
- **KaTeX** (CDN) — renders real LaTeX math notation directly in the browser
- **Google Fonts** — Literata (display), Inter (body), JetBrains Mono (code/labels), Caveat (handwritten accents)

## Run locally

No build step needed. Any static file server works, for example:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000

## Deploy

Push to the `main` branch of a repository named for GitHub Pages
(or enable Pages in the repo settings pointing at `main` / root).
The site will be published automatically.

## Customize

- Edit content directly in `index.html` (About, Skills, Education, Contact).
- Add or edit projects in `projects.json` — no HTML editing required.
- Colors and typography live in `style.css` under `:root[data-theme="light"]`
  and `:root[data-theme="dark"]`.
