/* Loads content.json (edited via /admin CMS) and renders the page */
(async function () {
  const res = await fetch('content.json?v=' + Date.now());
  const c = await res.json();
  const $ = id => document.getElementById(id);
  const esc = s => { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; };

  /* WhatsApp links */
  const waUrl = `https://wa.me/${c.site.whatsapp}?text=${encodeURIComponent('היי שלומית, אשמח לשמוע על השירותים שלך')}`;
  document.querySelectorAll('[data-wa]').forEach(a => { a.href = waUrl; a.target = '_blank'; a.rel = 'noopener'; });

  /* Hero */
  $('hero-title').textContent = c.hero.title;
  $('hero-subtitle').textContent = c.hero.subtitle;
  $('hero-cta1').textContent = c.hero.cta_primary;
  $('hero-cta2').textContent = c.hero.cta_secondary;
  $('hero-badge').textContent = c.about.badge;

  /* Signature: self-checking task list */
  const stack = $('task-stack');
  stack.innerHTML = c.hero.tasks.map((t, i) =>
    `<div class="task" style="animation-delay:${i * .35}s"><span class="box"></span><span>${esc(t)}</span></div>`
  ).join('');
  function runTaskAnimation() {
    const tasks = [...stack.querySelectorAll('.task')];
    tasks.forEach(el => {
      el.classList.remove('done');
      el.style.animationName = 'none';
      el.offsetHeight; // force reflow → restart fade-in
      el.style.animationName = '';
    });
    tasks.forEach((el, i) => setTimeout(() => el.classList.add('done'), 1400 + i * 700));
    const cycleMs = 1400 + (tasks.length - 1) * 700 + 500 + 2000;
    setTimeout(runTaskAnimation, cycleMs);
  }
  runTaskAnimation();

  /* Pain */
  $('pain-eyebrow').textContent = c.pain.eyebrow;
  $('pain-title').textContent = c.pain.title;
  $('pain-grid').innerHTML = c.pain.items.map(p =>
    `<div class="pain-card"><p class="moment">${esc(p.moment)}</p><p class="interrupt">${esc(p.interrupt)}</p></div>`
  ).join('');
  $('pain-closing').textContent = c.pain.closing;

  /* About */
  $('about-eyebrow').textContent = c.about.eyebrow;
  $('about-title').textContent = c.about.title;
  $('about-body').innerHTML = c.about.body.split('\n\n').map(p => `<p>${esc(p)}</p>`).join('');
  $('about-badge').textContent = c.about.badge;
  const photo = $('about-photo');
  const img = new Image();
  img.src = c.about.photo;
  img.alt = c.site.name;
  img.onload = () => { photo.innerHTML = ''; photo.appendChild(img); };
  img.onerror = () => { photo.innerHTML = '<span class="placeholder">ש</span>'; };

  /* Services */
  $('services-eyebrow').textContent = c.services.eyebrow;
  $('services-title').textContent = c.services.title;
  $('services-grid').innerHTML = c.services.items.map(s =>
    `<div class="service-card"><div class="dot"></div><h3>${esc(s.title)}</h3><p>${esc(s.desc)}</p></div>`
  ).join('');
  $('services-closing').textContent = c.services.closing;

  /* Process */
  $('process-eyebrow').textContent = c.process.eyebrow;
  $('process-title').textContent = c.process.title;
  $('process-list').innerHTML = c.process.steps.map(s =>
    `<li><h3>${esc(s.title)}</h3><p>${esc(s.desc)}</p></li>`
  ).join('');

  /* FAQ */
  $('faq-eyebrow').textContent = c.faq.eyebrow;
  $('faq-title').textContent = c.faq.title;
  $('faq-list').innerHTML = c.faq.items.map(f =>
    `<details><summary>${esc(f.q)}</summary><p class="answer">${esc(f.a)}</p></details>`
  ).join('');

  /* Contact */
  $('contact-eyebrow').textContent = c.contact.eyebrow;
  $('contact-title').textContent = c.contact.title;
  $('contact-subtitle').textContent = c.contact.subtitle;
  $('contact-cta').textContent = c.contact.cta;
  $('contact-alt').innerHTML =
    `<a href="tel:${esc(c.site.phone)}">${esc(c.site.phone)}</a>` +
    `<a href="mailto:${esc(c.site.email)}">${esc(c.site.email)}</a>`;

  /* Footer */
  $('footer-line').textContent = `© ${new Date().getFullYear()} ${c.site.name} · ${c.site.tagline}`;
})();
