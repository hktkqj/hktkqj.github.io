/* docs.js — sidebar toggle & active-link highlight */
(function () {
  'use strict';

  /* ---- Sidebar mobile toggle ---- */
  const toggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');

  if (toggle && sidebar) {
    toggle.addEventListener('click', function () {
      sidebar.classList.toggle('open');
      const expanded = sidebar.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function (e) {
      if (
        sidebar.classList.contains('open') &&
        !sidebar.contains(e.target) &&
        !toggle.contains(e.target)
      ) {
        sidebar.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- Highlight the active sidebar link ---- */
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  const sidebarLinks = document.querySelectorAll('.sidebar a');

  sidebarLinks.forEach(function (link) {
    const linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/$/, '');
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });

  /* ---- Simple keyword filter for document lists ---- */
  const searchInput = document.querySelector('.search-bar input');
  const docItems = document.querySelectorAll('.doc-list li, .category-card');

  if (searchInput && docItems.length) {
    searchInput.addEventListener('input', function () {
      const query = this.value.trim().toLowerCase();
      docItems.forEach(function (item) {
        const text = item.textContent.toLowerCase();
        item.style.display = !query || text.includes(query) ? '' : 'none';
      });
    });
  }
})();
