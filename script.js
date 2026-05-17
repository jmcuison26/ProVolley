// ══════════════════════════════════════
// NAVBAR — hamburger toggle
// ══════════════════════════════════════
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');

hamburger.addEventListener('click', () => {
  navMobile.classList.toggle('open');
});

// Close mobile nav when a link is clicked
navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navMobile.classList.remove('open'));
});

// ══════════════════════════════════════
// NAVBAR — shrink on scroll
// ══════════════════════════════════════
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.style.boxShadow = '0 4px 24px rgba(28,43,106,0.10)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

// ══════════════════════════════════════
// HOW IT WORKS — tab switcher
// ══════════════════════════════════════
function switchTab(tab) {
  const buyerSteps  = document.getElementById('buyerSteps');
  const sellerSteps = document.getElementById('sellerSteps');
  const btns        = document.querySelectorAll('.tab-btn');

  if (tab === 'buyer') {
    buyerSteps.classList.remove('hidden');
    sellerSteps.classList.add('hidden');
    btns[0].classList.add('active');
    btns[1].classList.remove('active');
  } else {
    sellerSteps.classList.remove('hidden');
    buyerSteps.classList.add('hidden');
    btns[1].classList.add('active');
    btns[0].classList.remove('active');
  }
}

// ══════════════════════════════════════
// SCROLL ANIMATIONS — fade in on scroll
// ══════════════════════════════════════
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add fade-in class to animatable elements
document.querySelectorAll(
  '.feature-card, .step, .screen-card, .testi-card, .hero-stats .stat'
).forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
  observer.observe(el);
});

// Inject visible style
const style = document.createElement('style');
style.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

// ══════════════════════════════════════
// SMOOTH ACTIVE NAV LINK on scroll
// ══════════════════════════════════════
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active-link');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active-link');
    }
  });
});

// Add active-link style
const linkStyle = document.createElement('style');
linkStyle.textContent = `.nav-links a.active-link { color: #1C2B6A !important; font-weight: 700; }`;
document.head.appendChild(linkStyle);

// ══════════════════════════════════════
// COUNTER ANIMATION for hero stats
// ══════════════════════════════════════
function animateCounter(el, target, suffix) {
  let current = 0;
  const step  = Math.ceil(target / 60);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current + suffix;
  }, 20);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      nums.forEach(num => {
        const text   = num.textContent;
        const value  = parseInt(text);
        const suffix = text.replace(/[0-9]/g, '');
        animateCounter(num, value, suffix);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);
