/* ==========================================================================
   INITIALISATION ET GESTION DU PORTFOLIO (Tressi Tchouah)
   ========================================================================== */

   document.addEventListener('DOMContentLoaded', () => {
    initNavbarScroll();
    initHeroParallax();
    initScrollReveal();
});

/**
 * 1. ANIMATION DE LA NAVBAR AU SCROLL
 * Rend la barre de navigation plus opaque et ajoute une lueur subtile dès qu'on défile
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 5, 8, 0.9)';
            navbar.style.borderBottom = '1px solid rgba(139, 92, 246, 0.15)'; // Rappel du violet cyber
            navbar.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.7)';
        } else {
            navbar.style.background = 'rgba(5, 5, 8, 0.75)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.03)';
            navbar.style.boxShadow = 'none';
        }
    });
}
// À appeler dans ton bloc de départ : document.addEventListener('DOMContentLoaded', () => { ... initSkillsFilter(); });

function initSkillsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    if (!filterButtons || !skillCards) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Ajouter la classe au bouton cliqué
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            skillCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === cardCategory) {
                    card.classList.remove('hidden');
                    // Petit effet d'apparition fluide
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 50);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}
function initScrollReveal() {
    // On cible les éléments du Hero ET nos nouvelles cartes de projets
    const fadeElements = document.querySelectorAll('.hero-subtitle, .hero-title, .hero-tagline, .hero-actions, .stat-item, .project-card');
    
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0px)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach((el) => {
        // État initial invisible et légèrement décalé vers le bas
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        
        revealObserver.observe(el);
    });
}
const fadeElements = document.querySelectorAll('.hero-subtitle, .hero-title, .hero-tagline, .hero-actions, .stat-item, .project-card, .gallery-item, .info-card');
/**
 * 2. EFFET PARALLAXE SUR L'AVATAR (Mouvement 3D discret)
 * L'image de l'avatar réagit doucement aux coordonnées de la souris
 */
function initHeroParallax() {
    const avatarWrapper = document.querySelector('.hero-avatar-wrapper');
    const hero = document.querySelector('.hero');

    if (!avatarWrapper || !hero) return;

    hero.addEventListener('mousemove', (e) => {
        // Récupération des dimensions de la zone
        const { clientWidth, clientHeight } = hero;
        const { clientX, clientY } = e;

        // Calcul du déplacement (-0.5 pour centrer l'axe à 0)
        const moveX = (clientX / clientWidth - 0.5) * 30; // 30px max de déplacement
        const moveY = (clientY / clientHeight - 0.5) * 30;

        // Application de la transformation fluide
        avatarWrapper.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
        avatarWrapper.style.transition = 'transform 0.1s ease-out';
    });

    // Réinitialisation dès que la souris quitte la zone Hero
    hero.addEventListener('mouseleave', () => {
        avatarWrapper.style.transform = 'translate(0px, 0px) scale(1)';
        avatarWrapper.style.transition = 'transform 0.6s ease';
    });
}

/**
 * 3. SCROLL REVEAL (Apparition fluide des éléments)
 * Utilise IntersectionObserver pour détecter l'entrée des sections à l'écran
 */
function initScrollReveal() {
    // On cible les éléments du Hero à animer au chargement
    const fadeElements = document.querySelectorAll('.hero-subtitle, .hero-title, .hero-tagline, .hero-actions, .stat-item');
    
    // Configuration de l'observateur pour le défilement futur
    const observerOptions = {
        root: null,
        threshold: 0.1, // Déclenche dès que 10% de l'élément est visible
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // On arrête d'observer une fois animé
            }
        });
    }, observerOptions);

    // On applique une classe de départ et on observe
    fadeElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`;
        
        // On force l'intersection ou une exécution immédiate pour le Hero
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0px)';
        }, 200);
    });
}