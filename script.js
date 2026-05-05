// script.js - Advanced interactions and animations for the portfolio

// Animation counter for metrics
function animateCounter(element, target, duration = 2000) {
    const isNumber = /^\d+/.test(target.toString());
    if (!isNumber) return;
    
    let current = 0;
    const increment = target / (duration / 16);
    const startTime = Date.now();
    
    const counter = setInterval(() => {
        const elapsed = Date.now() - startTime;
        if (elapsed >= duration) {
            element.textContent = target + '+';
            clearInterval(counter);
        } else {
            current += increment;
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Wait for the DOM to load before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    // Configuration for intersection observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Create an IntersectionObserver to handle scroll animations with stagger effect
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 40);
            }
        });
    }, observerOptions);

    // Observe sections, cards, and badges for animation
    document.querySelectorAll('.section, .interest-card, .metric-card, .skill-badge, .project-card, .contact-card').forEach(element => {
        observer.observe(element);
    });

    // Animate metric counters when they come into view
    const metricsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.hasAttribute('data-counted')) {
                const h3 = entry.target.querySelector('h3');
                if (h3) {
                    const targetValue = parseInt(h3.textContent);
                    animateCounter(h3, targetValue);
                    entry.target.setAttribute('data-counted', 'true');
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.metric-card').forEach(card => {
        metricsObserver.observe(card);
    });

    // Enhanced hover animations for project cards with smooth parallax effect
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.01)';
            this.style.boxShadow = '0 20px 50px rgba(57, 255, 202, 0.18), 0 0 40px rgba(57, 255, 202, 0.08)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 16px rgba(57, 255, 202, 0.06)';
        });
        
        // Parallax effect on mouse move
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            const rotateX = (y - 0.5) * 3;
            const rotateY = (x - 0.5) * 3;
            
            this.style.transform = `translateY(-12px) scale(1.01) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
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

    // Enhance contact cards with smooth animations
    document.querySelectorAll('.contact-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Enhance skill badges with hover effects
    document.querySelectorAll('.skill-badge').forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
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

    // Add scroll-triggered animation class for custom animations
    window.addEventListener('scroll', () => {
        document.querySelectorAll('[data-scroll]').forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < window.innerHeight * 0.8) {
                element.classList.add('scroll-animate');
            }
        });
    });
});