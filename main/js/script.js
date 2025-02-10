// تأثير ظهور العناصر عند التمرير
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
};

// تأثير تحريك البار العلوي
const handleNavbar = () => {
    const nav = document.querySelector('.main-nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
            nav.classList.remove('scroll-up');
            nav.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
            nav.classList.remove('scroll-down');
            nav.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
};

// تأثير تحريك النص
const handleTextEffect = () => {
    const titles = document.querySelectorAll('.animate-text');
    titles.forEach(title => {
        const text = title.textContent;
        title.textContent = '';
        [...text].forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.animationDelay = `${i * 0.1}s`;
            title.appendChild(span);
        });
    });
};

// تفعيل قائمة الهامبرجر
const handleMenuToggle = () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        // Close menu when clicking on a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
};

// Typing Effect
class TypeWriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.element.innerHTML = this.txt;

        // Initial Type Speed
        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Hamburger Menu
const initHamburgerMenu = () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');
    const overlay = document.querySelector('.nav-overlay');

    const toggleMenu = (show) => {
        hamburger.classList.toggle('active', show);
        navLinks.classList.toggle('active', show);
        overlay.classList.toggle('active', show);
        document.body.style.overflow = show ? 'hidden' : '';
    };

    hamburger.addEventListener('click', () => {
        const isActive = navLinks.classList.contains('active');
        toggleMenu(!isActive);
    });

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu(false);
        });
    });

    // Close menu when clicking overlay
    overlay.addEventListener('click', () => {
        toggleMenu(false);
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            toggleMenu(false);
        }
    });
};

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    observeElements();
    handleNavbar();
    handleTextEffect();
    handleMenuToggle();
    initHamburgerMenu();

    const txtElement = document.querySelector('.typed-text');
    if (txtElement){
        const words = ['0xEtxtro', 'Tamem', 'Al-Azzam'];
        const wait = 3000;

        // Init TypeWriter
        new TypeWriter(txtElement, words, wait);
    }

}

// تأثير النقر على الأزرار
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const x = e.clientX - e.target.offsetLeft;
        const y = e.clientY - e.target.offsetTop;
        
        const ripple = document.createElement('span');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// Close menu when clicking a link
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// إغلاق القائمة عند التمرير
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll && isMenuOpen) {
        toggleMenu();
    }
    lastScroll = currentScroll;
}); 

// Projects Section Interactivity
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectsGrid = document.querySelector('.projects-grid');

    // Initialize Isotope for smooth filtering animations
    if (projectsGrid) {
        const iso = new Isotope(projectsGrid, {
            itemSelector: '.project-card',
            layoutMode: 'fitRows',
            transitionDuration: '0.4s',
            stagger: 30,
            fitRows: {
                gutter: 20
            }
        });

        // Filter button click handler
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filterValue = btn.getAttribute('data-filter');
                
                // Update active button state
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter projects
                iso.arrange({
                    filter: filterValue === 'all' ? '*' : `[data-category="${filterValue}"]`
                });
            });
        });
    }

    // Enhanced card interactions
    projectCards.forEach((card, index) => {
        // Set card index for staggered animations
        card.style.setProperty('--card-index', index);

        // Add tilt effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        // Reset card position
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });

        // Add click handler for mobile devices
        card.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                card.classList.toggle('active');
            }
        });
    });

    // Add scroll reveal animation
    const scrollReveal = ScrollReveal({
        distance: '60px',
        duration: 1200,
        delay: 300,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    });

    scrollReveal.reveal('.project-card', {
        origin: 'bottom',
        interval: 100
    });

    // Project links hover effect
    const projectLinks = document.querySelectorAll('.project-links a');
    projectLinks.forEach(link => {
        link.addEventListener('mouseenter', (e) => {
            const tooltip = link.getAttribute('data-tooltip');
            if (tooltip) {
                const tooltipEl = document.createElement('div');
                tooltipEl.className = 'tooltip';
                tooltipEl.textContent = tooltip;
                document.body.appendChild(tooltipEl);

                const rect = link.getBoundingClientRect();
                const tooltipRect = tooltipEl.getBoundingClientRect();
                
                tooltipEl.style.left = rect.left + (rect.width / 2) - (tooltipRect.width / 2) + 'px';
                tooltipEl.style.top = rect.top - tooltipRect.height - 10 + 'px';
                
                setTimeout(() => tooltipEl.classList.add('visible'), 10);
            }
        });

        link.addEventListener('mouseleave', () => {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.classList.remove('visible');
                setTimeout(() => tooltip.remove(), 200);
            }
        });
    });
});

// Preload project images for smooth transitions
window.addEventListener('load', () => {
    const projectImages = document.querySelectorAll('.project-image');
    projectImages.forEach(img => {
        if (img.dataset.src) {
            const image = new Image();
            image.src = img.dataset.src;
            image.onload = () => {
                img.src = img.dataset.src;
                img.classList.add('loaded');
            };
        }
    });
});

// Project Filtering
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                // Reset animation
                card.style.animation = 'none';
                card.offsetHeight; // Trigger reflow
                card.style.animation = null;

                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.8s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Add hover effect to project cards
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});

// Intersection Observer for fade-in animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

// Initialize GSAP animations
gsap.registerPlugin(ScrollTrigger);

// Animate project cards on scroll
gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: i * 0.1
    });
});

// Animate section title
gsap.from('.section-title', {
    scrollTrigger: {
        trigger: '.section-title',
        start: 'top bottom-=100'
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
});

// Initialize Isotope with GSAP animations
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.projects-grid');
    const iso = new Isotope(grid, {
        itemSelector: '.project-card',
        layoutMode: 'fitRows',
        transitionDuration: 600,
        stagger: 30
    });

    // Filter buttons functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            // Get filter value
            const filterValue = btn.getAttribute('data-filter');

            // Animate out filtered items
            const items = document.querySelectorAll('.project-card');
            items.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    gsap.to(item, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.4,
                        ease: 'power2.out',
                        clearProps: 'all'
                    });
                } else {
                    gsap.to(item, {
                        scale: 0.8,
                        opacity: 0,
                        duration: 0.4,
                        ease: 'power2.in'
                    });
                }
            });

            // Filter items
            iso.arrange({
                filter: filterValue === 'all' ? '*' : `[data-category="${filterValue}"]`
            });
        });
    });

    // Mouse move effect on project cards
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Update CSS variables for gradient position
            card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
            card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);

            // Tilt effect
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            gsap.to(card, {
                rotateX: -rotateX,
                rotateY: rotateY,
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });

    // Enhanced tooltips
    const projectLinks = document.querySelectorAll('.project-links a');
    projectLinks.forEach(link => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = link.getAttribute('data-tooltip');
        
        link.addEventListener('mouseenter', (e) => {
            document.body.appendChild(tooltip);
            const rect = link.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            
            tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltipRect.width / 2)}px`;
            tooltip.style.top = `${rect.top - tooltipRect.height - 10}px`;
            
            gsap.fromTo(tooltip, 
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
            );
        });

        link.addEventListener('mouseleave', () => {
            gsap.to(tooltip, {
                opacity: 0,
                y: 10,
                duration: 0.2,
                ease: 'power2.in',
                onComplete: () => tooltip.remove()
            });
        });
    });
});

// Smooth scroll to top when filter buttons are clicked
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const projectsSection = document.querySelector('.projects-section');
        const offset = projectsSection.offsetTop - 100;
        
        window.scrollTo({
            top: offset,
            behavior: 'smooth'
        });
    });
});

// Initialize ScrollReveal for subtle animations
ScrollReveal().reveal('.project-card', {
    delay: 200,
    distance: '30px',
    duration: 800,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    interval: 100,
    opacity: 0,
    origin: 'bottom',
    rotate: {
        x: 0,
        y: 0,
        z: 0
    },
    scale: 1,
    cleanup: true,
    container: window.document.documentElement,
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor: 0.2,
    viewOffset: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
});
