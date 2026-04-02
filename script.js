// script.js - Interactions et animations pour le portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Animation au scroll
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

    // Observer les sections pour les animations
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Animation des cartes de projet au hover
    document.querySelectorAll('.projet-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Bouton de retour en haut
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Retour en haut de la page');
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

    // Menu mobile (hamburger)
    const nav = document.querySelector('nav');
    const navUl = document.querySelector('nav ul');
    const hamburger = document.createElement('button');
    hamburger.innerHTML = '☰';
    hamburger.className = 'hamburger';
    hamburger.setAttribute('aria-label', 'Menu de navigation');
    hamburger.setAttribute('aria-expanded', 'false');
    nav.appendChild(hamburger);

    hamburger.addEventListener('click', () => {
        navUl.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', hamburger.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    });

    // Fermer le menu mobile en cliquant sur un lien
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            navUl.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Animation des compétences (progress bars)
    const skillItems = document.querySelectorAll('.skill-category li');
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
});