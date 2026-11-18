# Eternal Optimist Combined Pre-Primary School — website

Static one-page site (HTML/CSS/JS, no build step) for GitHub Pages.

## Deploy
Repo **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)`**.
`.nojekyll` is included so files are served as-is.

## Swapping in the official logo
1. Add the logo as `assets/img/logo.png` (square, transparent background, ~512px).
2. In `index.html`, replace every `assets/img/logo-placeholder.svg` (favicon, header, footer) with `assets/img/logo.png`.

## Structure
- `index.html` — all content (hero, why us, about, classes, school life, gallery, enrolment enquiry, contact)
- `assets/css/styles.css` — brand colours are CSS variables at the top (`--orange`, `--blue`, `--sky`)
- `assets/js/main.js` — mobile menu, gallery lightbox, enquiry form (opens WhatsApp / email; nothing stored)
- `assets/img/photos/` — resized photos with metadata stripped

## Content to confirm with the school
- Fees, school hours, exact class age bands
- That 079 028 7512 is on WhatsApp
- Parental consent for the children's photos used on the site
