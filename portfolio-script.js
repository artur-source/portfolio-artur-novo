document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');

    const getHeaderOffset = () => (header ? header.offsetHeight + 18 : 88);

    const closeMenu = () => {
        if (!menuToggle || !nav) return;
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    };

    if (menuToggle && nav) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('active');
            menuToggle.classList.toggle('active', isOpen);
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    internalLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');
            if (!href || href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            event.preventDefault();
            closeMenu();

            const top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
            window.scrollTo({ top, behavior: 'smooth' });
            history.pushState(null, '', href);
        });
    });

    const setActiveNav = () => {
        let currentId = sections[0]?.id || '';
        const offset = getHeaderOffset() + 80;

        sections.forEach((section) => {
            if (window.scrollY >= section.offsetTop - offset) {
                currentId = section.id;
            }
        });

        navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
        });
    };

    setActiveNav();
    window.addEventListener('scroll', setActiveNav, { passive: true });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });

    document.querySelectorAll('.btn').forEach((button) => {
        button.addEventListener('click', (event) => {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);

            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;
            ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
            ripple.className = 'ripple';

            button.appendChild(ripple);
            window.setTimeout(() => ripple.remove(), 560);
        });
    });
});
