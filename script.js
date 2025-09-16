document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Navigation (Hamburger Menu) ---
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('is-active');
        mobileNav.classList.toggle('is-active');
    });

    // Close mobile menu when a link is clicked
    mobileNav.addEventListener('click', function() {
        hamburger.classList.remove('is-active');
        this.classList.remove('is-active');
    });

    // --- Scroll Animation ---
    // Create an Intersection Observer to watch for elements entering the viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // If the element is visible
            if (entry.isIntersecting) {
                // Add the 'show' class to trigger the animation
                entry.target.classList.add('show');
            } else {
                // Optional: remove the class to re-animate on scroll up
                // entry.target.classList.remove('show'); 
            }
        });
    });

    // Get all elements with the 'hidden' class and start observing them
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

});
