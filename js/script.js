document.addEventListener('DOMContentLoaded', () => {

  // 1) Dark Mode Toggle
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;

  // Check localStorage for saved preference
  if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.textContent = 'Aydınlık Mod';
  }

  darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
      darkModeToggle.textContent = 'Aydınlık Mod';
    } else {
      localStorage.setItem('darkMode', 'disabled');
      darkModeToggle.textContent = 'Karanlık Mod';
    }
  });

  // 2) Hamburger Menu
  const hamburgerBtn = document.getElementById('hamburgerMenu');
  const mainNav = document.getElementById('mainNav');

  hamburgerBtn.addEventListener('click', () => {
    mainNav.classList.toggle('nav-open');
  });

  // Close menu when a link is clicked (mobile)
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('nav-open');
    });
  });

  // 3) IntersectionObserver for scroll animation
  const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
  });

  fadeElements.forEach(el => observer.observe(el));

});
