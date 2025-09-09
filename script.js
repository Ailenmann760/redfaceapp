document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar & Mobile Menu ---
    const mainHeader = document.querySelector('.main-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.getElementById('main-menu');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // --- Launch Button Logic ---
    const launchUrl = 'https://redfaceapp.netlify.app';
    const launchButtons = document.querySelectorAll('.launch-btn');

    launchButtons.forEach(button => {
        button.addEventListener('click', () => {
            window.location.href = launchUrl;
        });
    });

    // --- Intersection Observer for Animations ---
    const fadeInElements = document.querySelectorAll('.fade-in');
    const options = {
        threshold: 0.1
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

    // --- Dark/Light Mode Toggle ---
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

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
