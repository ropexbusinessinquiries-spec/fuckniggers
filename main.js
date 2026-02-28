/* ============================================================
   SELENITE 3.0 — main.js
   ============================================================ */

// ── Background Canvas ──────────────────────────────────────
(function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');

  let W, H, particles = [], lines = [];
  const PARTICLE_COUNT = 60;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(true); }
    reset(initial) {
      this.x = Math.random() * W;
      this.y = initial ? Math.random() * H : H + 10;
      this.vx = (Math.random() - 0.5) * 0.15;
      this.vy = -(Math.random() * 0.3 + 0.05);
      this.r = Math.random() * 1.2 + 0.3;
      this.alpha = Math.random() * 0.4 + 0.1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.y < -10) this.reset(false);
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
      ctx.fill();
    }
  }

  function init() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
  }

  function drawLines() {
    const maxDist = 120;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.06;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => { resize(); init(); });
  resize();
  init();
  loop();
})();


// ── Modal System ───────────────────────────────────────────
const overlay  = document.getElementById('modal-overlay');
const modalDesc   = document.getElementById('modal-desc');
const cancelBtn   = document.getElementById('modal-cancel');
const confirmBtn  = document.getElementById('modal-confirm');
let pendingUrl = '';

function openModal(url, label) {
  pendingUrl = url;
  modalDesc.textContent = `You are about to leave Selenite and visit: ${label}. Continue?`;
  overlay.classList.add('active');
}

function closeModal() {
  overlay.classList.remove('active');
  pendingUrl = '';
}

cancelBtn.addEventListener('click', closeModal);

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeModal();
});

confirmBtn.addEventListener('click', () => {
  if (pendingUrl) window.open(pendingUrl, '_blank', 'noopener,noreferrer');
  closeModal();
});


// ── Support Button ─────────────────────────────────────────
document.getElementById('support-btn').addEventListener('click', () => {
  openModal('https://discord.gg/y5m6EWUyQA', 'discord.gg/y5m6EWUyQA');
});


// ── Purchase Buttons ───────────────────────────────────────
document.querySelectorAll('.btn-purchase').forEach(btn => {
  btn.addEventListener('click', () => {
    const url = btn.dataset.url;
    openModal(url, 'reseller.best');
  });
});


// ── Download Button ────────────────────────────────────────
document.getElementById('download-btn').addEventListener('click', () => {
  openModal('https://reseller.best', 'reseller.best (purchase required)');
});


// ── Navbar scroll effect ───────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 30) {
    nav.style.background = 'rgba(10,10,10,0.95)';
  } else {
    nav.style.background = 'rgba(10,10,10,0.7)';
  }
});


// ── Scroll reveal ──────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.plan-card, .preview-card, .step, .terms-block, .download-box').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
