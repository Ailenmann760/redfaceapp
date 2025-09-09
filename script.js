document.addEventListener('DOMContentLoaded', () => {

    // --- PWA & Redirect Logic ---
    const redirectUrl = 'https://redfaceapp.netlify.app';
    const redirectFlag = 'redface-redirected';
    const stayFlag = 'stay';
    const noRedirectQuery = 'no-redirect=1';

    // Check for skip flags
    const urlParams = new URLSearchParams(window.location.search);
    const hash = window.location.hash.substring(1);

    if (hash === stayFlag || urlParams.has('no-redirect')) {
        console.log('Redirect skipped due to URL hash or query parameter.');
    } else {
        // Check localStorage for the redirect flag
        const hasRedirected = localStorage.getItem(redirectFlag);

        if (!hasRedirected) {
            console.log('First visit detected. Auto-redirecting in 6 seconds...');
            setTimeout(() => {
                localStorage.setItem(redirectFlag, 'true');
                window.location.href = redirectUrl;
            }, 6000);
        } else {
            console.log('Already redirected, skipping auto-redirect.');
        }
    }

    // --- Dynamic Year for Footer ---
    const currentYear = new Date().getFullYear();
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = currentYear;
    }

    // --- Navbar Scroll Effect & Mobile Menu ---
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            document.body.classList.add('scrolling');
        } else {
            navbar.classList.remove('scrolled');
            document.body.classList.remove('scrolling');
        }
    };
    window.addEventListener('scroll', handleScroll);

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
    });

    // Close menu on link click (for mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // --- Intersection Observer for Animations ---
    const fadeInElements = document.querySelectorAll('.fade-in, .slide-up');
    const options = {
        threshold: 0.2, // Trigger when 20% of the element is visible
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    fadeInElements.forEach(element => {
        observer.observe(element);
    });

    // --- Glass Card 3D Tilt Effect ---
    const tiltElements = document.querySelectorAll('[data-tilt]');

    const applyTiltEffect = (element) => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((centerY - y) / centerY) * 10; // Max 10 deg rotation
            const rotateY = ((x - centerX) / centerX) * 10; // Max 10 deg rotation
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        });
    };

    tiltElements.forEach(applyTiltEffect);

    // --- Back to Top Button ---
    const backToTopBtn = document.getElementById('back-to-top');

    const handleBackToTop = () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    };
    window.addEventListener('scroll', handleBackToTop);

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- FAQ Accordion ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = header.nextElementSibling;
            const isExpanded = header.getAttribute('aria-expanded') === 'true';

            // Collapse any currently open accordion item
            document.querySelectorAll('.accordion-item.active').forEach(activeItem => {
                if (activeItem !== item) {
                    activeItem.classList.remove('active');
                    activeItem.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
                    activeItem.querySelector('.accordion-content').style.maxHeight = null;
                }
            });

            // Toggle the clicked item
            item.classList.toggle('active');
            if (!isExpanded) {
                header.setAttribute('aria-expanded', 'true');
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                header.setAttribute('aria-expanded', 'false');
                content.style.maxHeight = null;
            }
        });
    });

    // --- Dark Mode Toggle (optional but good practice) ---
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Load saved mode from localStorage
    const savedMode = localStorage.getItem('redface-dark-mode');
    if (savedMode === 'disabled') {
        body.classList.add('light-mode');
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('redface-dark-mode', 'disabled');
        } else {
            localStorage.setItem('redface-dark-mode', 'enabled');
        }
    });

});
