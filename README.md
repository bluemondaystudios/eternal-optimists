# Eternal Optimist Combined Pre-Primary School: website

Static one-page site (HTML/CSS/JS, no build step) for GitHub Pages.

## Deploy
Repo **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)`**.
`.nojekyll` is included so files are served as-is.

## Logo
Cropped from the school's registration poster (low-resolution source).
- `assets/img/logo.png`: 512px master, transparent outside the circle
- `assets/img/logo-sm.png`: used in header/footer
- `assets/img/favicon.png`, `assets/img/apple-touch-icon.png`: browser/home-screen icons

If the school can supply the original high-res logo file, regenerate these from it.

## Structure
- `index.html`: all content (hero, why us, about, classes, school life, gallery, enrolment enquiry, contact)
- `assets/css/styles.css`: brand colours are CSS variables at the top (`--orange`, `--blue`, `--sky`)
- `assets/js/main.js`: mobile menu, gallery lightbox, enquiry form (opens WhatsApp / email; nothing stored)
- `assets/img/photos/`: resized photos with metadata stripped (long edge max 1280-1400px). Every photo in this folder is used on the page; the newest school-supplied set leads the hero, About, Classes, School life and gallery.

## Content to confirm with the school
- Fees, school hours, exact class age bands
- That 079 028 7512 is on WhatsApp
- Parental consent for the older photos (Career Day, Baking Day, concert, Gold Reef City). The school supplied the November 2026 photo set itself and confirmed consent for it.
