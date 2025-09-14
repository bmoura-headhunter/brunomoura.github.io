// script.js
/* Mobile nav toggle */
const btn = document.getElementById('navToggle');
const menu = document.getElementById('menu');
if (btn && menu){
  btn.addEventListener('click', () => {
    const open = menu.getAttribute('data-open') === 'true';
    menu.setAttribute('data-open', String(!open));
    btn.setAttribute('aria-expanded', String(!open));
  });
}

/* Smooth hash scroll respecting reduced motion */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced){
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const id = a.getAttribute('href');
      const el = document.querySelector(id);
      if (el){
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth', block:'start'});
        history.pushState(null,'',id);
      }
    });
  });
}

/* Contact form UX */
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
if (form && note){
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    note.textContent = 'Sending...';
    const data = new FormData(form);
    try{
      const res = await fetch(form.action, { method:'POST', body: data, headers:{'Accept':'application/json'}});
      if (res.ok){
        note.textContent = 'Thank you. I will reply shortly.';
        form.reset();
      } else {
        note.textContent = 'There was an error. Please email me directly.';
      }
    }catch{
      note.textContent = 'Network error. Please email me directly.';
    }
  });
}

/* Year in footer */
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();
