/* ============================================
   CYBER_AMOS — Portfolio JS
   ============================================ */

// ===================== BOOT SCREEN =====================
const bootMessages = [
  "Initializing CYBER_AMOS kernel...",
  "Loading threat detection modules...",
  "Establishing encrypted connection...",
  "Bypassing firewall layer 1...",
  "Bypassing firewall layer 2...",
  "Mounting /dev/portfolio...",
  "Running vulnerability scan...",
  "All systems nominal.",
  "Welcome, intruder."
];

function runBoot() {
  const log = document.getElementById('boot-log');
  const bar = document.getElementById('boot-bar-fill');
  const screen = document.getElementById('boot-screen');
  let i = 0;
  const interval = setInterval(() => {
    if (i < bootMessages.length) {
      log.innerHTML += `> ${bootMessages[i]}\n`;
      log.scrollTop = log.scrollHeight;
      bar.style.width = `${((i + 1) / bootMessages.length) * 100}%`;
      i++;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        screen.classList.add('hidden');
        setTimeout(() => { screen.style.display = 'none'; }, 600);
      }, 500);
    }
  }, 220);
}

// ===================== MATRIX RAIN =====================
function initMatrix() {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOP0123456789@#$%^&*';
  const fontSize = 14;
  const cols = Math.floor(canvas.width / fontSize);
  const drops = Array(cols).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(2, 13, 4, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#12d640';
    ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;
    drops.forEach((y, i) => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * fontSize, y * fontSize);
      if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }

  setInterval(draw, 50);

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ===================== CURSOR GLOW =====================
function initCursor() {
  const cursor = document.getElementById('cursor-glow');
  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });
  document.querySelectorAll('a, button, .proj-card, .cert-card, .expertise-card, .skill-icon, .social-btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '40px';
      cursor.style.height = '40px';
      cursor.style.boxShadow = '0 0 20px rgba(18,214,64,0.6)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursor.style.boxShadow = '';
    });
  });
}

// ===================== TYPING ANIMATION =====================
const typedStrings = [
  "Cybersecurity Professional",
  "Penetration Tester",
  "Security Analyst",
  "Ethical Hacker",
  "Web Developer",
  "Cinematographer"
];

const typed = {
  el: null,
  strings: typedStrings,
  currentIndex: 0,
  charIndex: 0,
  isDeleting: false,
  init() {
    this.el = document.getElementById('typing-text');
    if (this.el) this.type();
  },
  type() {
    const current = this.strings[this.currentIndex];
    if (this.isDeleting) {
      this.el.textContent = current.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.el.textContent = current.substring(0, this.charIndex + 1);
      this.charIndex++;
    }
    let speed = this.isDeleting ? 40 : 90;
    if (!this.isDeleting && this.charIndex === current.length) {
      speed = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.currentIndex = (this.currentIndex + 1) % this.strings.length;
    }
    setTimeout(() => this.type(), speed);
  }
};

// ===================== UPTIME COUNTER =====================
function initUptime() {
  const el = document.getElementById('uptime-counter');
  if (!el) return;
  const start = Date.now();
  setInterval(() => {
    const diff = Date.now() - start;
    const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
    el.textContent = `${h}:${m}:${s}`;
  }, 1000);
}

// ===================== SCROLL FADE =====================
function initScrollAnimations() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
}

// ===================== ACTIVE NAV =====================
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id], #header');
  const navLinks = document.querySelectorAll('.nav-menu a');
  const scrollPos = window.scrollY + 150;
  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach(l => l.parentElement.classList.remove('active'));
      const link = document.querySelector(`.nav-menu a[href="#${section.id}"]`);
      if (link) link.parentElement.classList.add('active');
    }
  });
}

// ===================== SMOOTH SCROLL =====================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ===================== EXPERTISE CARD COLORS =====================
function initExpertiseColors() {
  document.querySelectorAll('.expertise-card').forEach(card => {
    const color = card.dataset.color || '#12d640';
    card.style.setProperty('--c', color);
  });
}

// ===================== GLITCH EFFECT =====================
function initGlitch() {
  const name = document.querySelector('.name-main');
  if (!name) return;
  const original = name.textContent;
  const glitchChars = '!@#$%^&*[]{}<>?/\\|~`';

  name.addEventListener('mouseenter', () => {
    let iterations = 0;
    const interval = setInterval(() => {
      name.textContent = original.split('').map((char, i) => {
        if (char === '\n') return '\n';
        if (i < iterations) return original[i];
        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
      }).join('');
      if (iterations >= original.replace('\n','').length) clearInterval(interval);
      iterations += 1.5;
    }, 30);
  });
}

// ===================== INIT =====================
document.addEventListener('DOMContentLoaded', () => {
  runBoot();
  initMatrix();
  initCursor();
  typed.init();
  initUptime();
  initScrollAnimations();
  initSmoothScroll();
  initExpertiseColors();
  initGlitch();
  updateActiveNav();
});

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', () => document.body.classList.add('loaded'));