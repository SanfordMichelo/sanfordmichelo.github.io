// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', () => {

  // 1️⃣ Smooth scrolling for navbar/internal links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // 2️⃣ Fade-in effect for sections on scroll
  const sections = document.querySelectorAll('main section');

  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        fadeInObserver.unobserve(entry.target); // Animate once
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => {
    section.classList.add('fade-section'); // start hidden
    fadeInObserver.observe(section);
  });

});



// Contact form submission
const form = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData(form);
    const action = form.getAttribute('action');

    try {
      const response = await fetch(action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        },
      });

      if (response.ok) {
        // Show success message
        formMessage.textContent = '✅ Your message has been sent!';
        formMessage.className = 'mb-3 text-center text-success';
        form.reset(); // Clear the form
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      // Show error message
      formMessage.textContent = '⚠️ Oops! Something went wrong. Please try again.';
      formMessage.className = 'mb-3 text-center text-danger';
    }
  });
}

// Smooth scroll to index.html sections if coming from another page
if (window.location.href.includes("index.html#")) {
  const targetId = window.location.hash.substring(1);
  const targetEl = document.getElementById(targetId);
  if (targetEl) {
    setTimeout(() => {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }, 100); // small delay to allow page to render
  }
}