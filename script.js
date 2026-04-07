// script.js - Interactions and animations for the portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Scroll animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe sections for animation
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Hover animations for project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Mobile menu (hamburger)
    const nav = document.querySelector('nav');
    const navUl = document.querySelector('nav ul');
    const hamburger = document.createElement('button');
    hamburger.innerHTML = '☰';
    hamburger.className = 'hamburger';
    hamburger.setAttribute('aria-label', 'Navigation menu');
    hamburger.setAttribute('aria-expanded', 'false');
    nav.appendChild(hamburger);

    hamburger.addEventListener('click', () => {
        navUl.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', hamburger.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    });

    // Close the mobile menu on link click
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            navUl.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Animate skill items
    const skillItems = document.querySelectorAll('.skill-category li');
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
});