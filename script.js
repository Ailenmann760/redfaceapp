document.addEventListener('DOMContentLoaded', () => {

    // --- Dynamic Year for Footer ---
    const currentYear = new Date().getFullYear();
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = currentYear;
    }

    // --- Navbar Scroll Effect & Mobile Menu ---
    const mainHeader = document.querySelector('.main-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.getElementById('main-menu');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
    });

    // Close menu on link click (for mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // --- Launch & Login Button Logic ---
    const launchUrl = 'https://redfaceapp.netlify.app';
    const launchButtons = document.querySelectorAll('.launch-btn');
    const loginButton = document.getElementById('login-btn');

    launchButtons.forEach(button => {
        button.addEventListener('click', () => {
            window.location.href = launchUrl;
        });
    });

    if (loginButton) {
        loginButton.addEventListener('click', () => {
            // Placeholder for login action
            console.log('Login button clicked.');
            window.location.href = 'https://redfaceapp.netlify.app/login'; // Example login path
        });
    }

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

    // --- Dark/Light Mode Toggle ---
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Load saved mode from localStorage
    const savedMode = localStorage.getItem('redface-dark-mode');
    if (savedMode === 'light') {
        body.classList.add('light-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
         darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('redface-dark-mode', 'light');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            localStorage.setItem('redface-dark-mode', 'dark');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });

});
