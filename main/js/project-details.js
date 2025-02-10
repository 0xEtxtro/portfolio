document.addEventListener('DOMContentLoaded', () => {
    // Slideshow functionality
    const slideshows = document.querySelectorAll('.slideshow');
    
    slideshows.forEach(slideshow => {
        const slides = slideshow.querySelectorAll('.slide');
        const dotsContainer = slideshow.querySelector('.slide-dots');
        const prevButton = slideshow.querySelector('.prev-slide');
        const nextButton = slideshow.querySelector('.next-slide');
        let currentSlide = 0;

        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.dot');

        function updateSlides() {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function goToSlide(index) {
            currentSlide = index;
            updateSlides();
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlides();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlides();
        }

        // Event listeners
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);

        // Initialize first slide
        updateSlides();
    });

    // Lightbox functionality
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-content img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    let currentLightboxSlideshow = null;
    let currentLightboxIndex = 0;

    // Open lightbox
    document.querySelectorAll('.lightbox-trigger').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            const slideshow = this.closest('.slideshow');
            const slides = Array.from(slideshow.querySelectorAll('.slide img'));
            currentLightboxSlideshow = slides;
            currentLightboxIndex = slides.indexOf(this);
            
            updateLightboxImage();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function updateLightboxImage() {
        const img = currentLightboxSlideshow[currentLightboxIndex];
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
    }

    function nextLightboxImage() {
        currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxSlideshow.length;
        updateLightboxImage();
    }

    function prevLightboxImage() {
        currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxSlideshow.length) % currentLightboxSlideshow.length;
        updateLightboxImage();
    }

    // Event listeners for lightbox
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });

    lightboxNext.addEventListener('click', nextLightboxImage);
    lightboxPrev.addEventListener('click', prevLightboxImage);

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
                break;
            case 'ArrowLeft':
                prevLightboxImage();
                break;
            case 'ArrowRight':
                nextLightboxImage();
                break;
        }
    });
});
