/* ═══════════════════════════════════════════════
   WANDERFRAME — JavaScript
   Handles: Preloader, Navbar, Particles, Tilt,
   Filters, Modals, Lightbox, Counters, Timeline,
   Swiper, Contact Form, Theme Toggle, Back-to-Top
═══════════════════════════════════════════════ */

'use strict';

/* ──────────────────────────────────
   1. PRELOADER
────────────────────────────────── */
(function initPreloader() {
  const preloader = document.getElementById('preloader');
  const fill = document.getElementById('preloaderFill');
  if (!preloader || !fill) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 18;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      fill.style.width = '100%';
      setTimeout(() => {
        preloader.classList.add('done');
        document.body.style.overflow = '';
      }, 400);
    }
    fill.style.width = Math.min(progress, 100) + '%';
  }, 80);

  // Block scroll during load
  document.body.style.overflow = 'hidden';
})();


/* ──────────────────────────────────
   2. THEME TOGGLE
────────────────────────────────── */
(function initTheme() {
  const btn = document.getElementById('themeToggle');
  const html = document.documentElement;

  // Persist theme
  const saved = localStorage.getItem('wf-theme') || 'dark';
  html.setAttribute('data-theme', saved);

  btn?.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('wf-theme', next);
  });
})();


/* ──────────────────────────────────
   3. NAVBAR — scroll + hamburger
────────────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const progress = document.getElementById('scrollProgress');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  // Scroll effects
  function onScroll() {
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;

    // Scrolled class for glass bg
    if (scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    // Progress bar
    if (progress) progress.style.width = (scrollY / maxScroll * 100) + '%';

    // Back to top
    const btt = document.getElementById('btt');
    if (btt) {
      if (scrollY > 400) btt.classList.add('visible');
      else btt.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Hamburger
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('mobile-open');
    document.body.style.overflow = navLinks.classList.contains('mobile-open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('mobile-open');
      document.body.style.overflow = '';
    });
  });

  // Smooth anchor nav highlight
  const sections = document.querySelectorAll('section[id]');
  const links = navLinks?.querySelectorAll('a');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links?.forEach(l => l.classList.remove('active'));
        const active = navLinks?.querySelector(`a[href="#${e.target.id}"]`);
        active?.classList.add('active');
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(s => observer.observe(s));
})();


/* ──────────────────────────────────
   4. HERO CANVAS — Particle field
────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles;
  const PARTICLE_COUNT = 70;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.r = Math.random() * 1.5 + 0.5;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.5
        ? `rgba(30,144,255,${this.opacity})`
        : `rgba(255,122,24,${this.opacity})`;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,255,255,${(1 - dist / 100) * 0.06})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animate);
  }

  init();
  animate();
  window.addEventListener('resize', () => { resize(); particles.forEach(p => p.reset()); }, { passive: true });
})();


/* ──────────────────────────────────
   5. CARD TILT EFFECT
────────────────────────────────── */
(function initTilt() {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `perspective(800px) rotateX(${-dy * 6}deg) rotateY(${dx * 6}deg) translateZ(12px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });
})();


/* ──────────────────────────────────
   6. VIDEO FILTER TABS
────────────────────────────────── */
(function initVideoFilter() {
  const tabs = document.querySelectorAll('.ftab');
  const cards = document.querySelectorAll('.vid-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      cards.forEach(card => {
        const cat = card.dataset.cat;
        if (filter === 'all' || cat === filter) {
          card.style.display = '';
          setTimeout(() => card.classList.remove('hidden-filter'), 10);
        } else {
          card.classList.add('hidden-filter');
          setTimeout(() => card.style.display = 'none', 400);
        }
      });
    });
  });
})();


/* ──────────────────────────────────
   7. VIDEO MODAL — disabled (blog mode)
   Blog cards link directly to posts
────────────────────────────────── */


/* ──────────────────────────────────
   8. COUNTER ANIMATION
────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('.ctr-n[data-target]');
  if (!counters.length) return;

  const formatNum = (n, target) => {
    if (target >= 1000000) return (n / 1000000).toFixed(1);
    if (target >= 1000) return n >= 1000 ? (n / 1000).toFixed(0) + 'K' : n;
    return Math.round(n);
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);

      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const duration = 1800;
      const startTime = performance.now();

      function step(now) {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);
        // Ease out quart
        const eased = 1 - Math.pow(1 - t, 4);
        el.textContent = formatNum(eased * target, target);
        if (t < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();


/* ──────────────────────────────────
   9. TIMELINE ANIMATION
────────────────────────────────── */
(function initTimeline() {
  const fill = document.getElementById('tlFill');
  const cards = document.querySelectorAll('.tl-card');
  const tlWrap = document.getElementById('tlWrap');

  if (!tlWrap) return;

  // Fill line on scroll
  function updateFill() {
    const rect = tlWrap.getBoundingClientRect();
    const total = tlWrap.offsetHeight;
    const visible = Math.max(0, window.innerHeight - rect.top);
    const pct = Math.min(visible / total, 1) * 100;
    if (fill) fill.style.height = pct + '%';
  }

  window.addEventListener('scroll', updateFill, { passive: true });

  // Animate cards
  const cardObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => cardObserver.observe(card));
})();


/* ──────────────────────────────────
   10. MASONRY LIGHTBOX
────────────────────────────────── */
(function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lbBg = document.getElementById('lbBg');
  const lbImg = document.getElementById('lbImg');
  const lbCap = document.getElementById('lbCap');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');

  const items = Array.from(document.querySelectorAll('.m-item'));
  let current = 0;

  function open(index) {
    current = index;
    const item = items[index];
    lbImg.src = item.dataset.full;
    lbCap.textContent = item.dataset.cap;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function nav(dir) {
    current = (current + dir + items.length) % items.length;
    const item = items[current];
    lbImg.style.opacity = '0';
    setTimeout(() => {
      lbImg.src = item.dataset.full;
      lbCap.textContent = item.dataset.cap;
      lbImg.style.opacity = '1';
    }, 150);
    lbImg.style.transition = 'opacity 0.15s';
  }

  items.forEach((item, i) => item.addEventListener('click', () => open(i)));
  lbClose?.addEventListener('click', close);
  lbBg?.addEventListener('click', close);
  lbPrev?.addEventListener('click', () => nav(-1));
  lbNext?.addEventListener('click', () => nav(1));

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') nav(-1);
    if (e.key === 'ArrowRight') nav(1);
  });
})();


/* ──────────────────────────────────
   11. SWIPER — Testimonials
────────────────────────────────── */
(function initSwiper() {
  if (typeof Swiper === 'undefined') return;
  new Swiper('.testi-swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    autoplay: { delay: 5000, pauseOnMouseEnter: true },
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next',
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    }
  });
})();


/* ──────────────────────────────────
   12. CONTACT FORM VALIDATION
────────────────────────────────── */
(function initContactForm() {
  const btn = document.getElementById('btnSend');
  if (!btn) return;

  function getVal(id) { return (document.getElementById(id)?.value || '').trim(); }
  function setErr(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
  }
  function clearErrors() {
    ['fNameErr','fEmailErr','fSubjErr','fMsgErr'].forEach(id => setErr(id, ''));
  }
  function showMsg(type, text) {
    const el = document.getElementById('formMsg');
    if (!el) return;
    el.className = `form-msg ${type}`;
    el.textContent = text;
    el.classList.remove('hidden');
    setTimeout(() => el.classList.add('hidden'), 5000);
  }

  btn.addEventListener('click', () => {
    clearErrors();
    let valid = true;

    const name = getVal('fName');
    const email = getVal('fEmail');
    const subj = getVal('fSubj');
    const msg = getVal('fMsg');

    if (!name) { setErr('fNameErr', 'Please enter your name.'); valid = false; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr('fEmailErr', 'Please enter a valid email address.'); valid = false;
    }
    if (!subj) { setErr('fSubjErr', 'Please select a topic.'); valid = false; }
    if (msg.length < 10) { setErr('fMsgErr', 'Message must be at least 10 characters.'); valid = false; }

    if (!valid) return;

    // Simulate send
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
      showMsg('success', '✓ Message sent! I\'ll reply within 48 hours.');
      btn.textContent = 'Send Message';
      btn.disabled = false;
      ['fName','fEmail','fSubj','fMsg'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });
    }, 1500);
  });
})();


/* ──────────────────────────────────
   13. NEWSLETTER
────────────────────────────────── */
(function initNewsletter() {
  const btn = document.getElementById('nlBtn');
  const input = document.getElementById('nlEmail');
  if (!btn || !input) return;

  btn.addEventListener('click', () => {
    const email = input.value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      input.style.borderColor = '#ff5050';
      setTimeout(() => input.style.borderColor = '', 2000);
      return;
    }
    btn.textContent = '✓';
    btn.style.background = '#00c864';
    input.value = '';
    setTimeout(() => {
      btn.textContent = '→';
      btn.style.background = '';
    }, 3000);
  });
})();


/* ──────────────────────────────────
   14. BACK TO TOP
────────────────────────────────── */
(function initBackToTop() {
  document.getElementById('btt')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ──────────────────────────────────
   15. GENERAL REVEAL ON SCROLL
────────────────────────────────── */
(function initReveal() {
  // Add reveal class to section headers and about paragraphs
  const targets = document.querySelectorAll('.sec-header, .about-visual, .about-text-col, .contact-info, .contact-form-glass, .testi-card, .blog-card');
  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(el => observer.observe(el));
})();


/* ──────────────────────────────────
   16. PARALLAX — Hero image
────────────────────────────────── */
(function initParallax() {
  const heroBg = document.querySelector('.hero-bg-img');
  if (!heroBg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroBg.style.transform = `scale(1.08) translateY(${y * 0.25}px)`;
  }, { passive: true });
})();


/* ──────────────────────────────────
   17. DESTINATION CARD ENTRANCE
────────────────────────────── */
(function initDestCards() {
  const cards = document.querySelectorAll('.dest-card');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.7s ease, transform 0.7s ease`;
    observer.observe(card);
  });
})();


/* ──────────────────────────────────
   18. VIDEO CARD ENTRANCE
────────────────────────────── */
(function initVidCards() {
  const cards = document.querySelectorAll('.vid-card');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(25px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
})();


/* ──────────────────────────────────
   19. GALLERY ENTRANCE
────────────────────────────── */
(function initGallery() {
  const items = document.querySelectorAll('.m-item');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          e.target.style.opacity = '1';
          e.target.style.transform = 'scale(1)';
        }, i * 50);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.05 });

  items.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'scale(0.95)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
  });
})();


/* ──────────────────────────────────
   20. MOBILE SWIPE FOR LIGHTBOX
────────────────────────────── */
(function initSwipeGestures() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;

  let startX = 0;
  lb.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) < 50) return;
    const lbPrev = document.getElementById('lbPrev');
    const lbNext = document.getElementById('lbNext');
    if (dx > 0) lbPrev?.click();
    else lbNext?.click();
  }, { passive: true });
})();

/* ──────────────────────────────────
   END
────────────────────────────── */
