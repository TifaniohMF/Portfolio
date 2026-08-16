// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Mobile menu =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Theme toggle (light / dark) with localStorage persistence =====
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const THEME_KEY = 'portfolio-theme';

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  themeToggle.setAttribute('aria-pressed', theme === 'dark');
  themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
}

function getPreferredTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

applyTheme(getPreferredTheme());

themeToggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem(THEME_KEY, next);
});

// Follow OS preference changes unless the user made an explicit choice
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem(THEME_KEY)) {
    applyTheme(e.matches ? 'dark' : 'light');
  }
});

// ===== Render a KaTeX formula safely =====
function renderFormula(el, formula) {
  if (formula && window.katex) {
    try {
      katex.render(formula, el, { throwOnError: false });
    } catch (e) {
      el.textContent = formula;
    }
  }
}

// ===== Render static equations already in the HTML =====
function renderStaticEquations() {
  document.querySelectorAll('.katex-eq[data-katex]').forEach(el => {
    renderFormula(el, el.getAttribute('data-katex'));
  });
}

// ===== Load projects from projects.json and build the cards =====
async function loadProjects() {
  const grid = document.getElementById('projectsGrid');
  try {
    const response = await fetch('projects.json');
    if (!response.ok) throw new Error('Network response was not ok');
    const projects = await response.json();

    grid.innerHTML = '';
    projects.forEach(project => {
      const card = document.createElement('article');
      card.className = 'proof-card reveal';

      const tags = project.tags.map(tag => `<span>${tag}</span>`).join('');

      card.innerHTML = `
        <div class="proof-card__head">
          <span class="katex-eq"></span>
          <span class="proof-card__lang">${project.lang}</span>
        </div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="proof-card__tags">${tags}</div>
        <a href="${project.url}" target="_blank" rel="noopener" class="proof-card__link">View repository ↗</a>
        <span class="qed" aria-hidden="true">∎</span>
      `;

      grid.appendChild(card);
      renderFormula(card.querySelector('.katex-eq'), project.equation);
      observeReveal(card);
    });
  } catch (error) {
    grid.innerHTML = `<p class="projects__loading">Could not load projects right now. Please visit my <a href="https://github.com/TifaniohMF" target="_blank" rel="noopener">GitHub</a> directly.</p>`;
    console.error('Failed to load projects.json:', error);
  }
}

// ===== Scroll reveal via IntersectionObserver =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

function observeReveal(el) {
  observer.observe(el);
}

function initReveal() {
  document.querySelectorAll(
    '.about, .skills, .timeline, .contact__inner, .skill-card'
  ).forEach(el => {
    el.classList.add('reveal');
    observeReveal(el);
  });
}

// ===== Boot =====
function init() {
  renderStaticEquations();
  initReveal();
  loadProjects();
}

if (window.katex) {
  init();
} else {
  window.addEventListener('load', init);
}
