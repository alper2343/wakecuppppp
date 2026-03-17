// =============================================
// Wake Cup Alsancak - Main JavaScript
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => preloader.classList.add('hidden'), 800);
        });
        setTimeout(() => preloader.classList.add('hidden'), 3000);
    }

    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');
    if (navbar && !navbar.classList.contains('scrolled')) {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // --- Mobile menu ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    const closeMenu = () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
    };

    const openMenu = () => {
        hamburger.classList.add('active');
        navMenu.classList.add('open');
        document.body.classList.add('menu-open');
    };

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close menu on link click
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu when clicking outside (on the overlay)
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('open') &&
                !navMenu.contains(e.target) &&
                !hamburger.contains(e.target)) {
                closeMenu();
            }
        });

        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('open')) {
                closeMenu();
            }
        });
    }

    // --- Active nav link on scroll (only on index page) ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length > 0) {
        const updateActiveLink = () => {
            const scrollPos = window.scrollY + 150;
            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                const id = section.getAttribute('id');
                if (scrollPos >= top && scrollPos < top + height) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        };
        window.addEventListener('scroll', updateActiveLink, { passive: true });
    }

    // --- Scroll reveal animations ---
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -30px 0px'
            }
        );
        revealElements.forEach(el => revealObserver.observe(el));
    }

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = navbar ? navbar.offsetHeight : 0;
                const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Parallax effect on hero (disabled on mobile for performance) ---
    const hero = document.querySelector('.hero');
    if (hero && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            if (window.scrollY < window.innerHeight) {
                const offset = window.scrollY * 0.4;
                hero.style.backgroundPositionY = `calc(50% + ${offset}px)`;
            }
        }, { passive: true });
    }
});
