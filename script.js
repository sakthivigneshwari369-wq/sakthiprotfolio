// ==========================================================================
// PORTFOLIO CORE JAVASCRIPT: ANIMATIONS & INTERACTIONS
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Subtle Cursor Glow Follower
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animateCursor = () => {
      currentX += (mouseX - currentX) * 0.1;
      currentY += (mouseY - currentY) * 0.1;
      cursorGlow.style.left = `${currentX}px`;
      cursorGlow.style.top = `${currentY}px`;
      requestAnimationFrame(animateCursor);
    };
    animateCursor();
  }

  // 2. Intersection Observer for Scroll Reveals
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  // 3. Header Scroll Effect
  const siteHeader = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });

  // 4. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.classList.toggle('menu-open');
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.classList.remove('menu-open');
      });
    });
  }

  // 5. Contact Form Validation & Submission
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const successResetBtn = document.getElementById('successResetBtn');

  if (contactForm) {
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const serviceInput = document.getElementById('contactService');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const serviceError = document.getElementById('serviceError');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Clear error on input
    const clearFieldError = (input, errorEl) => {
      input.addEventListener('input', () => {
        input.classList.remove('input-error');
        errorEl.classList.remove('visible');
      });
    };

    clearFieldError(nameInput, nameError);
    clearFieldError(emailInput, emailError);

    serviceInput.addEventListener('change', () => {
      serviceInput.classList.remove('input-error');
      serviceError.classList.remove('visible');
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameInput.classList.add('input-error');
        nameError.classList.add('visible');
        isValid = false;
      }

      // Validate Email
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.add('input-error');
        emailError.classList.add('visible');
        isValid = false;
      }

      // Validate Service
      if (!serviceInput.value) {
        serviceInput.classList.add('input-error');
        serviceError.classList.add('visible');
        isValid = false;
      }

      if (isValid) {
        // Show success overlay
        formSuccess.classList.add('visible');
      }
    });

    // Reset form
    if (successResetBtn) {
      successResetBtn.addEventListener('click', () => {
        formSuccess.classList.remove('visible');
        contactForm.reset();
      });
    }
  }
});
