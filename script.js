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
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // --- Interactive FAQ Section ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            // Check if the current item is already active
            const isActive = item.classList.contains('active');

            // Close all other active items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            // If the clicked item was not active, open it
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

});
