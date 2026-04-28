// script.js - Interactions and animations for the portfolio

// Wait for the DOM to load before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    // Configuration for intersection observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Create an IntersectionObserver to handle scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe sections, cards, and badges for animation
    document.querySelectorAll('.section, .interest-card, .metric-card, .skill-badge').forEach(element => {
        observer.observe(element);
    });

    // Enhanced hover animations for project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.boxShadow = '0 24px 48px rgba(57, 255, 202, 0.2)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 16px rgba(57, 255, 202, 0.06)';
        });
    });

    // Enhanced animations for interest cards
    document.querySelectorAll('.interest-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Enhance skill badges with hover effects
    document.querySelectorAll('.skill-badge').forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Back to top button with improved styling
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.setAttribute('title', 'Return to top');
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

    // Mobile menu (hamburger) with improved accessibility
    const nav = document.querySelector('nav');
    const navUl = document.querySelector('nav ul');
    
    // Check if hamburger already exists to avoid duplication
    let hamburger = document.querySelector('.hamburger');
    if (!hamburger) {
        hamburger = document.createElement('button');
        hamburger.innerHTML = '☰';
        hamburger.className = 'hamburger';
        hamburger.setAttribute('aria-label', 'Navigation menu');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-controls', 'nav-menu');
        nav.appendChild(hamburger);
        navUl.setAttribute('id', 'nav-menu');
    }

    // Toggle mobile menu on hamburger click
    hamburger.addEventListener('click', () => {
        navUl.classList.toggle('active');
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
    });

    // Close the mobile menu on link click
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            navUl.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add counter animation for metrics
    const counterElements = document.querySelectorAll('.metric-card h3');
    const animateCounters = () => {
        counterElements.forEach(element => {
            const target = element.textContent;
            const numeric = parseInt(target);
            
            if (!isNaN(numeric)) {
                let current = 0;
                const increment = Math.ceil(numeric / 30);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numeric) {
                        element.textContent = target;
                        clearInterval(timer);
                    } else {
                        element.textContent = current + (target.match(/[+%]/)?.[0] || '');
                    }
                }, 30);
            }
        });
    };

    // Observe metrics section to trigger counter animation
    const metricsSection = document.querySelector('#metrics');
    if (metricsSection) {
        const metricsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    metricsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        metricsObserver.observe(metricsSection);
    }
});