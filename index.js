/* ============================
   Ducol Group — index.js
   Funciones UX mínimas
   ============================ */

// 1) Tema claro/oscuro (persistente en localStorage)
(() => {
  const KEY = 'ducol-theme';
  const root = document.documentElement;
  const btn = document.querySelector('[data-toggle-theme]');

  const apply = (t) => t ? root.setAttribute('data-theme', t) : root.removeAttribute('data-theme');
  const saved = localStorage.getItem(KEY);
  if (saved) apply(saved);

  if (btn) {
    btn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? '' : 'dark';
      apply(next);
      if (next) localStorage.setItem(KEY, next); else localStorage.removeItem(KEY);
    });
  }
})();

// 2) Año dinámico en <span id="year">
(() => {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();

// 3) Copiar correo (botón con data-copy-email y data-email="asis.sistemas@ducol.com.co")
(() => {
  document.querySelectorAll('[data-copy-email]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const email = btn.getAttribute('data-email') || 'asis.sistemas@ducol.com.co';
      try{
        await navigator.clipboard.writeText(email);
        const prev = btn.textContent;
        btn.textContent = 'Correo copiado';
        setTimeout(() => btn.textContent = prev, 1500);
      }catch(e){ console.warn('No se pudo copiar el correo', e); }
    });
  });
})();

// 4) Scroll suave para enlaces con #
(() => {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el){
        e.preventDefault();
        el.scrollIntoView({ behavior:'smooth', block:'start' });
      }
    });
  });
})();
