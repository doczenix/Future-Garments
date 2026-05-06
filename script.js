/* Future Garments — Site JS */

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('mobile-open');
    });

    // Close mobile menu when clicking a link
    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('mobile-open');
      });
    });
  }

  // Scroll reveal animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Contact form handler
  const form = document.querySelector('.contact-form form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const success = form.querySelector('.form-success');
      if (success) {
        success.classList.add('show');
        form.reset();
        setTimeout(() => success.classList.remove('show'), 6000);
      }
    });
  }

  // Sample claim button
  const sampleBtn = document.querySelector('[data-sample-claim]');
  if (sampleBtn) {
    sampleBtn.addEventListener('click', () => {
      window.location.href = 'contact.html?subject=sample';
    });
  }

  // Pre-fill contact form if coming from sample claim
  const params = new URLSearchParams(window.location.search);
  if (params.get('subject') === 'sample') {
    const reqField = document.querySelector('select[name="requirement"]');
    const msgField = document.querySelector('textarea[name="message"]');
    if (reqField) {
      Array.from(reqField.options).forEach(opt => {
        if (opt.value === 'sports') opt.selected = true;
      });
    }
    if (msgField) {
      msgField.value = "I would like to claim my complimentary sports uniform sample. Please share the next steps.";
    }
  }
});
