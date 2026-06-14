/* Loads content.json (edited via /admin CMS) and renders the page */
(async function () {
  const res = await fetch('content.json?v=' + Date.now());
  const c = await res.json();
  const $ = id => document.getElementById(id);
  const esc = s => { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; };

  /* Service icons (SVG, stroke-based, 32×32) */
  const icons = [
    /* הנהלת חשבונות */ `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><line x1="12" y1="7" x2="16" y2="7"/><line x1="12" y1="11" x2="16" y2="11"/></svg>`,
    /* הפקת חשבוניות */ `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
    /* גבייה */         `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    /* התאמות בנק */   `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
    /* רו"ח */         `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    /* ספקים */        `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
    /* יומן */         `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    /* טפסים */        `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg>`,
  ];

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
    `<div class="task" style="animation-delay:${i * .7}s"><span class="box"></span><span>${esc(t)}</span></div>`
  ).join('');
  function runTaskAnimation() {
    const tasks = [...stack.querySelectorAll('.task')];
    tasks.forEach(el => {
      el.classList.remove('done');
      el.style.animationName = 'none';
      el.offsetHeight;
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
  $('pain-grid').innerHTML = c.pain.items.map((p, i) =>
    `<div class="pain-card reveal" style="transition-delay:${i * .1}s"><p class="moment">${esc(p.moment)}</p><p class="interrupt">${esc(p.interrupt)}</p></div>`
  ).join('');
  $('pain-closing').textContent = c.pain.closing;

  /* About */
  $('about-eyebrow').textContent = c.about.eyebrow;
  $('about-title').textContent = c.about.title;
  $('about-body').innerHTML = c.about.body.split('\n\n').map(p => `<p>${esc(p)}</p>`).join('');
  $('about-badge').textContent = c.about.badge;
  const photo = $('about-photo');
  photo.innerHTML = `<img src="assets/illustration.svg" alt="${esc(c.site.name)}" style="width:100%;height:100%;object-fit:cover">`;

  /* Services */
  $('services-eyebrow').textContent = c.services.eyebrow;
  $('services-title').textContent = c.services.title;
  $('services-grid').innerHTML = c.services.items.map((s, i) =>
    `<div class="service-card reveal" style="transition-delay:${i * .08}s"><div class="service-icon">${icons[i] || icons[0]}</div><h3>${esc(s.title)}</h3><p>${esc(s.desc)}</p></div>`
  ).join('');
  $('services-closing').textContent = c.services.closing;

  /* Process */
  $('process-eyebrow').textContent = c.process.eyebrow;
  $('process-title').textContent = c.process.title;
  $('process-list').innerHTML = c.process.steps.map((s, i) =>
    `<li class="reveal" style="transition-delay:${i * .12}s"><h3>${esc(s.title)}</h3><p>${esc(s.desc)}</p></li>`
  ).join('');

  /* FAQ */
  $('faq-eyebrow').textContent = c.faq.eyebrow;
  $('faq-title').textContent = c.faq.title;
  $('faq-list').innerHTML = c.faq.items.map((f, i) =>
    `<details class="reveal" style="transition-delay:${i * .08}s"><summary>${esc(f.q)}</summary><p class="answer">${esc(f.a)}</p></details>`
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

  /* Animated counters */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // easeOutQuart
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }
  const counterIo = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.stat-number').forEach(animateCounter);
        counterIo.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  const statsBar = document.querySelector('.stats-bar');
  if (statsBar) counterIo.observe(statsBar);

  /* Testimonials slider */
  const testimonials = [
    { text: "שלומית הורידה לי עול עצום מהכתפיים. הגבייה שהייתה סיוט הפכה למסודרת ופשוטה — לא חוזר לנהל לבד.", name: "יוסי כ.", role: "בעל עסק לשיפוצים" },
    { text: "אחסינות מדהימה, תמיד זמינה ומדויקת. הרו״ח שלי מעיר בכל פגישה כמה החומרים מסודרים.", name: "מיכל ד.", role: "יועצת ארגונית עצמאית" },
    { text: "חיסכתי שעות בחודש ומצאתי שקט נפשי. שלומית לוקחת אחריות ועושה — בלי לרדוף אחריה.", name: "אורן ל.", role: "מנהל סטארטאפ" },
    { text: "אחרי שנים שניהלתי לבד, סוף סוף יש מישהי שאפשר לסמוך עליה לחלוטין. שווה כל שקל.", name: "ענת מ.", role: "מטפלת עצמאית" },
    { text: "הדיוק והסדר שלה חסכו לי טעויות יקרות. מומלצת בחום לכל עצמאי שרוצה לישון בלילה.", name: "רמי ש.", role: "יועץ עסקי" },
  ];
  const tOuter = document.querySelector('.testimonials-outer');
  const tDots = document.querySelector('.testimonial-dots');
  if (tOuter && tDots) {
    tOuter.innerHTML = testimonials.map((t, i) =>
      `<div class="testimonial-slide${i === 0 ? ' active' : ''}">
        <p class="testimonial-quote">${esc(t.text)}</p>
        <div><p class="testimonial-author">${esc(t.name)}</p><p class="testimonial-role">${esc(t.role)}</p></div>
      </div>`
    ).join('');
    tDots.innerHTML = testimonials.map((_, i) =>
      `<button class="testimonial-dot${i === 0 ? ' active' : ''}" aria-label="המלצה ${i + 1}"></button>`
    ).join('');
    let cur = 0;
    const slides = tOuter.querySelectorAll('.testimonial-slide');
    const dots = tDots.querySelectorAll('.testimonial-dot');
    function goTo(n) {
      slides[cur].classList.remove('active');
      dots[cur].classList.remove('active');
      cur = (n + testimonials.length) % testimonials.length;
      slides[cur].classList.add('active');
      dots[cur].classList.add('active');
    }
    let timer = setInterval(() => goTo(cur + 1), 5000);
    dots.forEach((d, i) => d.addEventListener('click', () => { goTo(i); clearInterval(timer); timer = setInterval(() => goTo(cur + 1), 5000); }));
  }

  /* 3D tilt on service cards */
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transition = 'box-shadow .2s,border-color .2s';
      card.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform .45s ease,box-shadow .2s,border-color .2s';
      card.style.transform = '';
      setTimeout(() => card.style.transition = '', 450);
    });
  });

  /* Smooth FAQ accordion */
  document.querySelectorAll('details').forEach(details => {
    const summary = details.querySelector('summary');
    const answer = details.querySelector('.answer');
    answer.style.maxHeight = '0';
    summary.addEventListener('click', e => {
      e.preventDefault();
      if (details.open) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        requestAnimationFrame(() => answer.style.maxHeight = '0');
        setTimeout(() => details.removeAttribute('open'), 350);
      } else {
        details.setAttribute('open', '');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        setTimeout(() => answer.style.maxHeight = '', 350);
      }
    });
  });

  /* Scroll reveal — IntersectionObserver */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();
