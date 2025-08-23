// ===== Theme Toggle with persistence =====
const root = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
const saved = localStorage.getItem('theme');
if (saved) document.documentElement.setAttribute('data-theme', saved);
themeBtn.textContent = document.documentElement.getAttribute('data-theme') === 'light' ? '🌙' : '☀';
themeBtn.addEventListener('click', () => {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  const next = isLight ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeBtn.textContent = next === 'light' ? '🌙' : '☀';
  themeBtn.setAttribute('aria-pressed', String(next === 'dark'));
});

// ===== Typing effect (rotating punchlines) =====
const typing = document.getElementById('typing');
const lines = [
  'Accessible UIs', 'Performance focused', 'Pixel-perfect layouts', 'Clean, typed code'
];
let idx = 0, cursor = 0, dir = 1; // 1 typing, -1 deleting
function tick() {
  typing.textContent = lines[idx].slice(0, cursor) + (cursor % 2 ? '|' : '');
  cursor += dir;
  if (cursor === lines[idx].length + 1) { dir = -1; setTimeout(tick, 1200); return; }
  if (cursor === 0) { dir = 1; idx = (idx + 1) % lines.length; }
  setTimeout(tick, dir > 0 ? 90 : 50);
}
tick();

// ===== Scroll reveal using IntersectionObserver =====
const io = new IntersectionObserver((ents) => {
  ents.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ===== Back to top visibility =====
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  toTop.classList.toggle('show', window.scrollY > 900);
});
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== Projects: filtering, searching, and modal =====
const grid = document.getElementById('projectGrid');
const cards = [...grid.querySelectorAll('.project')];
const search = document.getElementById('search');
const filters = [...document.querySelectorAll('.filter')];

function updateFilter() {
  const term = search.value.toLowerCase().trim();
  const active = filters.find(f => f.getAttribute('aria-pressed') === 'true')?.dataset.filter || 'all';
  cards.forEach(c => {
    const text = c.textContent.toLowerCase();
    const tagHit = active === 'all' || c.dataset.tags.includes(active);
    const termHit = !term || text.includes(term);
    c.style.display = tagHit && termHit ? '' : 'none';
  });
}

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(b => b.setAttribute('aria-pressed', 'false'));
    btn.setAttribute('aria-pressed', 'true');
    updateFilter();
  });
});
search.addEventListener('input', updateFilter);

// ===== Modal open on card click/enter =====
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');

function openCard(card) {
  const title = card.querySelector('h3').textContent;
  const meta = card.querySelector('.meta').textContent;
  const desc = card.querySelector('p:last-of-type').textContent;
  modalTitle.textContent = title;
  modalBody.innerHTML = `<p><em>${meta}</em></p><p>${desc}</p>`;
  modal.showModal();
}

cards.forEach(c => {
  c.addEventListener('click', () => openCard(c));
  c.addEventListener('keypress', e => { if (e.key === 'Enter') openCard(c); });
});

// ===== Contact form mock handling =====
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
form.addEventListener('submit', e => {
  e.preventDefault();
  status.textContent = 'Sending...';
  setTimeout(() => {
    status.textContent = '✅ Message sent (mock)';
    form.reset();
  }, 1200);
});

// ===== Year in footer =====
document.getElementById('year').textContent = new Date().getFullYear();
