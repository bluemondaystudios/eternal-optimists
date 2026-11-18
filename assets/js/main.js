(() => {
  const SCHOOL_PHONE = "27790287512";
  const SCHOOL_EMAIL = "eternaloptimistpreschool@gmail.com";

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
})();
