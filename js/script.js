document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const toggleIcon = mobileToggle.querySelector('i');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Change icon
            if (navMenu.classList.contains('active')) {
                toggleIcon.classList.remove('fa-bars');
                toggleIcon.classList.add('fa-xmark');
            } else {
                toggleIcon.classList.remove('fa-xmark');
                toggleIcon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking a link
    const navLinksList = document.querySelectorAll('.nav-links a');
    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            toggleIcon.classList.remove('fa-xmark');
            toggleIcon.classList.add('fa-bars');
        });
    });

    // Sticky Navbar
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlighting
        let current = '';
        const sections = document.querySelectorAll('section, header');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Counter Animation
    const counters = document.querySelectorAll('.counter-val');
    let counted = false;

    // We'll wrap counter logic in a function to trigger on scroll
    const updateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // ms
            const increment = target / (duration / 16); // 60fps refresh rate

            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    };

    // Observer for counters section
    const counterSection = document.getElementById('achievements');
    if (counterSection) {
        const counterObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !counted) {
                counted = true;
                updateCounters();
            }
        }, { threshold: 0.5 });
        counterObserver.observe(counterSection);
    }

    // News Carousel
    const newsTrack = document.getElementById('news-track');
    const newsPrev = document.getElementById('news-prev');
    const newsNext = document.getElementById('news-next');
    const newsIndicators = document.querySelectorAll('.carousel-indicator');
    
    if (newsTrack) {
        let currentIndex = 0;
        const totalSlides = newsIndicators.length;
        let slideInterval;

        const updateCarousel = (index) => {
            newsTrack.style.transform = `translateX(-${index * 100}%)`;
            newsIndicators.forEach(ind => ind.classList.remove('active'));
            newsIndicators[index].classList.add('active');
            currentIndex = index;
        };

        const nextSlide = () => {
            const nextIndex = (currentIndex + 1) % totalSlides;
            updateCarousel(nextIndex);
        };

        const prevSlide = () => {
            const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel(prevIndex);
        };

        newsNext.addEventListener('click', () => {
             nextSlide();
             resetInterval();
        });
        
        newsPrev.addEventListener('click', () => {
             prevSlide();
             resetInterval();
        });

        newsIndicators.forEach(indicator => {
            indicator.addEventListener('click', (e) => {
                const targetIndex = parseInt(e.target.getAttribute('data-index'));
                updateCarousel(targetIndex);
                resetInterval();
            });
        });

        // Auto slide
        const startInterval = () => {
            slideInterval = setInterval(nextSlide, 5000);
        };

        const resetInterval = () => {
            clearInterval(slideInterval);
            startInterval();
        };

        startInterval();
    }

    // Developer Popup
    const developerPopup = document.getElementById('developer-popup');
    const closePopupBtn = document.getElementById('close-popup');

    if (developerPopup && closePopupBtn) {
        let popupTimer;

        const showPopup = () => {
            developerPopup.classList.add('show');
            // Hide after 4 seconds
            popupTimer = setTimeout(hidePopup, 4000);
        };

        const hidePopup = () => {
            developerPopup.classList.remove('show');
            // Show again after 10 seconds
            popupTimer = setTimeout(showPopup, 10000);
        };

        // Start the initial cycle after 2.5 seconds
        popupTimer = setTimeout(showPopup, 2500);

        closePopupBtn.addEventListener('click', () => {
            clearTimeout(popupTimer);
            developerPopup.classList.remove('show');
        });
    }

});
