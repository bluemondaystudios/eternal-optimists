(() => {
  const SCHOOL_PHONE = "27790287512";
  const SCHOOL_EMAIL = "eternaloptimistpreschool@gmail.com";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Year in footer
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Mobile nav
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (toggle && nav) {
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("open", open);
    };
    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
  }

  // Enrolment enquiry -> WhatsApp or email (static site, nothing stored)
  const form = document.getElementById("enrol-form");
  if (form) {
    const err = document.getElementById("form-error");
    let via = "whatsapp";
    form.querySelectorAll("button[type=submit]").forEach((b) =>
      b.addEventListener("click", () => { via = b.dataset.via; })
    );
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      form.querySelectorAll("[required]").forEach((el) => {
        const bad = !el.value.trim();
        el.setAttribute("aria-invalid", String(bad));
        if (bad) ok = false;
      });
      err.hidden = ok;
      if (!ok) { form.querySelector("[aria-invalid=true]").focus(); return; }

      const d = Object.fromEntries(new FormData(form));
      const lines = [
        "Hello Eternal Optimist, I would like to enquire about registration for 2027.",
        "",
        `Parent/guardian: ${d.parent.trim()}`,
        `Phone: ${d.phone.trim()}`,
        `Child: ${d.child.trim()}`,
        `Class: ${d.grade}`,
      ];
      if (d.msg.trim()) lines.push("", d.msg.trim());
      const text = lines.join("\n");

      if (via === "email") {
        const subject = `2027 registration enquiry - ${d.child.trim()}`;
        window.location.href = `mailto:${SCHOOL_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
      } else {
        window.open(`https://wa.me/${SCHOOL_PHONE}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
      }
    });
  }

  // Gallery lightbox
  const dlg = document.getElementById("lightbox");
  const items = [...document.querySelectorAll(".g-item")];
  if (dlg && items.length && typeof dlg.showModal === "function") {
    const img = dlg.querySelector("img");
    let i = 0;
    const show = (n) => {
      i = (n + items.length) % items.length;
      const src = items[i].querySelector("img");
      img.src = items[i].dataset.full;
      img.alt = src.alt;
    };
    items.forEach((b, n) => b.addEventListener("click", () => { show(n); dlg.showModal(); }));
    dlg.querySelector(".lightbox-close").addEventListener("click", () => dlg.close());
    dlg.querySelector(".prev").addEventListener("click", () => show(i - 1));
    dlg.querySelector(".next").addEventListener("click", () => show(i + 1));
    dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") show(i - 1);
      if (e.key === "ArrowRight") show(i + 1);
    });
  }

  // Header shadow, back-to-top button and current-section menu highlight
  const header = document.querySelector(".site-header");
  const toTop = document.querySelector(".to-top");
  const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]:not(.btn)')];
  const targets = navLinks
    .map((a) => [a, document.getElementById(a.getAttribute("href").slice(1))])
    .filter(([, s]) => s);
  const spy = () => {
    const mid = window.innerHeight * 0.45;
    let current = null;
    targets.forEach(([a, s]) => {
      const r = s.getBoundingClientRect();
      if (r.top <= mid && r.bottom > mid) current = a; // later (nested) sections win
    });
    navLinks.forEach((a) => a.classList.toggle("active", a === current));
  };
  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 10);
    if (toTop) toTop.classList.toggle("show", y > 700);
    if (!ticking) { ticking = true; requestAnimationFrame(() => { spy(); ticking = false; }); }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      history.replaceState(null, "", location.pathname + location.search);
      const brand = document.querySelector(".brand");
      if (brand) brand.focus({ preventScroll: true });
    });
  }

  // Fade lazy photos in as they load
  document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
    if (img.complete && img.naturalWidth) return;
    img.classList.add("fade");
    const done = () => img.classList.add("loaded");
    img.addEventListener("load", done, { once: true });
    img.addEventListener("error", done, { once: true });
  });

  // Reveal cards and panels as they scroll into view
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 70}ms`;
      io.observe(el);
    });
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }
})();
