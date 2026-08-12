/* ===== TAC Camping — Interactive Scripts ===== */

document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVIGATION =====
  const navbar = document.getElementById('navbar');
  const navBurger = document.getElementById('nav-burger');
  const navLinks = document.getElementById('nav-links');
  const navBackdrop = document.getElementById('nav-backdrop');
  const navAnchors = document.querySelectorAll('.nav__link');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  function toggleMenu(open) {
    const isOpen = open ?? !navLinks.classList.contains('open');
    if (isOpen) navBackdrop.style.display = 'block';
    navLinks.classList.toggle('open', isOpen);
    navBurger.classList.toggle('active', isOpen);
    navBackdrop.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (!isOpen) {
      setTimeout(() => {
        if (!navBackdrop.classList.contains('active')) {
          navBackdrop.style.display = 'none';
        }
      }, 400);
    }
  }

  navBurger.addEventListener('click', () => toggleMenu());
  navBackdrop.addEventListener('click', () => toggleMenu(false));
  navAnchors.forEach(l => l.addEventListener('click', () => toggleMenu(false)));

  // Active nav on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const link = document.querySelector(`.nav__link[href="#${section.id}"]`);
      if (link) {
        link.classList.toggle('active',
          scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight
        );
      }
    });
  }, { passive: true });

  // ===== FIREFLIES =====
  const fireflyContainer = document.getElementById('fireflies');
  if (fireflyContainer) {
    for (let i = 0; i < 25; i++) {
      const fly = document.createElement('div');
      fly.className = 'firefly';
      fly.style.left = Math.random() * 100 + '%';
      fly.style.top = Math.random() * 100 + '%';
      fly.style.setProperty('--duration', (4 + Math.random() * 6) + 's');
      fly.style.setProperty('--dx', (Math.random() * 80 - 40) + 'px');
      fly.style.setProperty('--dy', (Math.random() * 60 - 30) + 'px');
      fly.style.animationDelay = (Math.random() * 5) + 's';
      fly.style.width = (2 + Math.random() * 3) + 'px';
      fly.style.height = fly.style.width;
      fireflyContainer.appendChild(fly);
    }
  }

  // ===== SCROLL REVEAL =====
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));

  // ===== COUNTDOWN TIMER =====
  // Set target date to September 19, 2026 (Lead College Autonomous Camp)
  const targetDate = new Date('2026-09-19T09:00:00+05:30').getTime();

  function updateCountdown() {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
      document.getElementById('countdown-days').textContent = '00';
      document.getElementById('countdown-hours').textContent = '00';
      document.getElementById('countdown-mins').textContent = '00';
      document.getElementById('countdown-secs').textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('countdown-days').textContent = String(days).padStart(2, '0');
    document.getElementById('countdown-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('countdown-mins').textContent = String(mins).padStart(2, '0');
    document.getElementById('countdown-secs').textContent = String(secs).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ===== PAST TRIPS SLIDER =====
  const tripsSlider = document.getElementById('trips-slider');
  const tripsPrev = document.getElementById('trips-prev');
  const tripsNext = document.getElementById('trips-next');

  if (tripsSlider && tripsPrev && tripsNext) {
    const scrollAmount = 380;

    tripsNext.addEventListener('click', () => {
      tripsSlider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
    tripsPrev.addEventListener('click', () => {
      tripsSlider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }

  // ===== PARALLAX HERO =====
  const heroBg = document.querySelector('.hero__bg img');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `scale(1.05) translateY(${scrolled * 0.15}px)`;
      }
    }, { passive: true });
  }

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== GALLERY TILT ON HOVER =====
  document.querySelectorAll('.gallery__item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      item.style.transform = `perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) scale(1.02)`;
    });
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
      item.style.transition = 'transform 0.4s ease';
      setTimeout(() => { item.style.transition = ''; }, 400);
    });
  });

  // ===== COUNTDOWN BLOCK PULSE ON UPDATE =====
  const countdownBlocks = document.querySelectorAll('.countdown__block');
  let prevSecs = -1;
  setInterval(() => {
    const secsEl = document.getElementById('countdown-secs');
    if (secsEl && secsEl.textContent !== prevSecs) {
      prevSecs = secsEl.textContent;
      // Subtle scale pulse on seconds block
      const secsBlock = countdownBlocks[countdownBlocks.length - 1];
      if (secsBlock) {
        secsBlock.style.transform = 'scale(1.03)';
        setTimeout(() => { secsBlock.style.transform = ''; }, 300);
      }
    }
  }, 1000);

  // ===== LIGHTBOX FULLSCREEN MEDIA PREVIEW =====
  const lightbox = document.getElementById('lightbox');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const mediaContainer = document.getElementById('lightbox-media-container');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxSubtitle = document.getElementById('lightbox-subtitle');

  let galleryItemsList = [];
  let currentIndex = 0;

  // Gather items from primary marquee group
  const primaryItems = document.querySelectorAll('.gallery__marquee-group:not([aria-hidden="true"]) .gallery__item');
  
  primaryItems.forEach((item, idx) => {
    const img = item.querySelector('img');
    const vid = item.querySelector('video');
    const titleEl = item.querySelector('.gallery__item-title');
    const captionEl = item.querySelector('.gallery__item-caption');

    const mediaObj = {
      type: vid ? 'video' : 'img',
      src: vid ? vid.getAttribute('src') : (img ? img.getAttribute('src') : ''),
      poster: vid ? vid.getAttribute('poster') || '' : '',
      title: titleEl ? titleEl.textContent : 'TAC Camping',
      caption: captionEl ? captionEl.textContent : ''
    };
    galleryItemsList.push(mediaObj);

    // Attach click handlers to both primary and duplicate marquee instances
    const selector = vid ? `video[src="${mediaObj.src}"]` : `img[src="${mediaObj.src}"]`;
    document.querySelectorAll(`.gallery__item ${selector}`).forEach(el => {
      const parentCard = el.closest('.gallery__item');
      if (parentCard) {
        parentCard.style.cursor = 'pointer';
        parentCard.addEventListener('click', (e) => {
          e.preventDefault();
          openLightbox(idx);
        });
      }
    });
  });

  function openLightbox(index) {
    if (!lightbox || index < 0 || index >= galleryItemsList.length) return;
    currentIndex = index;
    renderLightboxMedia();
    lightbox.style.display = 'flex';
    requestAnimationFrame(() => {
      lightbox.classList.add('active');
    });
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (!lightbox.classList.contains('active')) {
        lightbox.style.display = 'none';
        mediaContainer.innerHTML = '';
      }
    }, 300);
  }

  function renderLightboxMedia() {
    const item = galleryItemsList[currentIndex];
    if (!item) return;

    mediaContainer.innerHTML = '';
    lightboxTitle.textContent = item.title;
    lightboxSubtitle.textContent = item.caption;

    if (item.type === 'video') {
      const videoEl = document.createElement('video');
      videoEl.src = item.src;
      if (item.poster) videoEl.poster = item.poster;
      videoEl.controls = true;
      videoEl.autoplay = true;
      videoEl.playsInline = true;
      mediaContainer.appendChild(videoEl);
    } else {
      const imgEl = document.createElement('img');
      imgEl.src = item.src;
      imgEl.alt = item.title;
      mediaContainer.appendChild(imgEl);
    }
  }

  function nextMedia() {
    currentIndex = (currentIndex + 1) % galleryItemsList.length;
    renderLightboxMedia();
  }

  function prevMedia() {
    currentIndex = (currentIndex - 1 + galleryItemsList.length) % galleryItemsList.length;
    renderLightboxMedia();
  }

  if (lightbox) {
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxBackdrop.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); nextMedia(); });
    lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); prevMedia(); });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextMedia();
      if (e.key === 'ArrowLeft') prevMedia();
    });
  }

  // ===== VIDEO AUTOPLAY ASSURANCE =====
  const galleryVideos = document.querySelectorAll('.gallery__item video');
  galleryVideos.forEach(vid => {
    vid.muted = true;
    vid.play().catch(() => {});
  });

  // ===== BODY FADE IN =====
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    galleryVideos.forEach(vid => vid.play().catch(() => {}));
  });

});
