/* Purple Coffee — Main JS (Professional, Minimal) */

(function () {
  'use strict';

  /* ── Navbar scroll behaviour ── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
      document.getElementById('back-top')?.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
  }

  /* ── Back to top ── */
  document.getElementById('back-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── Mobile Nav ── */
  const hamburger  = document.querySelector('.hamburger');
  const mobileNav  = document.querySelector('.mobile-nav');
  const overlay    = document.querySelector('.nav-overlay');

  function closeMobileNav() {
    mobileNav?.classList.remove('open');
    overlay?.classList.remove('open');
  }

  hamburger?.addEventListener('click', () => {
    const open = mobileNav?.classList.toggle('open');
    overlay?.classList.toggle('open', open);
  });
  overlay?.addEventListener('click', closeMobileNav);
  mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileNav));

  /* ── Menu Tabs ── */
  document.querySelectorAll('.menu-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(target)?.classList.add('active');
    });
  });

  /* ── Table size selector ── */
  document.querySelectorAll('.table-size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.table-size-grid')
         ?.querySelectorAll('.table-size-btn')
         .forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  /* ── Modals ── */
  function openModal(id) {
    const m = document.getElementById(id);
    m?.classList.add('open');
  }
  function closeModal(id) {
    document.getElementById(id)?.classList.remove('open');
  }
  window.closeModal = closeModal;

  document.querySelectorAll('[data-modal-close]').forEach(el => {
    el.addEventListener('click', () => closeModal(el.dataset.modalClose));
  });
  document.querySelectorAll('.modal-backdrop').forEach(el => {
    el.addEventListener('click', () => el.closest('.modal')?.classList.remove('open'));
  });

  /* ── Pre-Order form ── */
  const orderForm = document.getElementById('order-form');
  if (orderForm) {
    orderForm.addEventListener('submit', e => {
      e.preventDefault();
      if (!orderForm.checkValidity()) { orderForm.reportValidity(); return; }
      openModal('order-success');
      orderForm.reset();
    });
  }

  /* ── Booking form ── */
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', e => {
      e.preventDefault();
      if (!bookingForm.checkValidity()) { bookingForm.reportValidity(); return; }
      openModal('booking-success');
      bookingForm.reset();
      document.querySelectorAll('.table-size-btn').forEach(b => b.classList.remove('active'));
    });
  }

  /* ── Contact form ── */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      if (!contactForm.checkValidity()) { contactForm.reportValidity(); return; }
      openModal('contact-success');
      contactForm.reset();
    });
  }

  /* ── Newsletter ── */
  document.querySelectorAll('.newsletter-form-el').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.btn');
      const orig = btn.textContent;
      btn.textContent = 'Subscribed';
      btn.disabled = true;
      form.querySelector('input[type=email]').value = '';
      setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 3000);
    });
  });

  /* ── Set min date for booking ── */
  const bookDate = document.getElementById('book-date');
  if (bookDate) {
    const today = new Date().toISOString().split('T')[0];
    bookDate.setAttribute('min', today);
  }

})();
const video = document.getElementById('heroBgVideo');
const btn   = document.getElementById('soundToggle');
const iconMuted = document.getElementById('iconMuted');
const iconSound = document.getElementById('iconSound');

btn.addEventListener('click', () => {
  video.muted = !video.muted;
  iconMuted.style.display = video.muted ? 'block' : 'none';
  iconSound.style.display = video.muted ? 'none'  : 'block';
});