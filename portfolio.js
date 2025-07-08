document.addEventListener('DOMContentLoaded', () => {
    // Check for saved theme preference or use device preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
        document.querySelector('.theme-switch i').classList.replace('fa-moon', 'fa-sun');
    }

    // Theme switcher
    const themeSwitch = document.querySelector('.theme-switch');
    themeSwitch.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        // Update icon
        const themeIcon = themeSwitch.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');

                // Handle special case for skills-experience section
                if (current === 'skills-experience') {
                    navItems.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#skills-experience') {
                            link.classList.add('active');
                        }
                    });
                } else {
                    navItems.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href').includes(current)) {
                            link.classList.add('active');
                        }
                    });
                }
            }
        });
    });

    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Don't prevent default - let the form submit to Formspree

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // The form will be submitted to Formspree
            // We'll add the UI feedback after submission

            // Clear success message after submission (Formspree will handle the redirect)
            setTimeout(() => {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Set copyright year
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Back to top button visibility
    const backToTopBtn = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Smooth scroll to top when clicked
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Function to open email client with form data
function openMailClient() {
    // Get form values
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Your email address
    const yourEmail = "shrivastava.shubham219@live.com";

    // Create email body with just the message (name removed)
    const emailBody = message;

    // Encode for URL
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(emailBody);

    // Create mailto link
    const mailtoLink = `mailto:${yourEmail}?subject=${encodedSubject}&body=${encodedBody}`;

    // Show sending feedback
    const submitBtn = document.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Opening Email Client...';
    submitBtn.disabled = true;

    // Open email client in a new tab
    window.open(mailtoLink, '_blank');

    // Reset button after a short delay
    setTimeout(() => {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;

        // Show success message
        const formResponse = document.getElementById('formResponse');
        formResponse.textContent = 'Email client opened. If nothing happened, please check your browser settings.';
        formResponse.className = 'form-response success';

        // Clear success message after some time
        setTimeout(() => {
            formResponse.textContent = '';
            formResponse.className = 'form-response';
        }, 5000);
    }, 1000);

        // Prevent form from actually submitting
    return false;
}

// Lightbox Gallery functionality
class LightboxGallery {
    constructor() {
        this.galleries = {
            nexdocs: {
                title: 'Nexdocs - AI-Powered Knowledge Platform',
                type: 'web', // Web application screenshots
                images: [
                    { src: 'assets/nexdocs1.png', alt: 'Nexdocs - Landing Page' },
                    { src: 'assets/nexdocs2.png', alt: 'Nexdocs - Dashboard Overview' },
                    { src: 'assets/nexdocs3.png', alt: 'Nexdocs - Knowledge Base Management' },
                    { src: 'assets/nexdocs4.png', alt: 'Nexdocs - Rich Text Editor' },
                    { src: 'assets/nexdocs5.png', alt: 'Nexdocs - AI Content Generation' },
                    { src: 'assets/nexdocs6.png', alt: 'Nexdocs - Analytics Dashboard' },
                    { src: 'assets/nexdocs7.png', alt: 'Nexdocs - Public Knowledge Base' },
                    { src: 'assets/nexdocs8.png', alt: 'Nexdocs - Settings & Configuration' }
                ]
            },
            autoresearch: {
                title: 'AutoResearch - Research Expert',
                type: 'mobile', // Mobile app screenshots
                images: [
                    { src: 'assets/autoresearch1.png', alt: 'AutoResearch App - Home Screen' },
                    { src: 'assets/autoresearch2.png', alt: 'AutoResearch App - Search Results' },
                    { src: 'assets/autoresearch3.png', alt: 'AutoResearch App - Research Analysis' },
                    { src: 'assets/autoresearch4.png', alt: 'AutoResearch App - PDF Generation' },
                    { src: 'assets/autoresearch5.png', alt: 'AutoResearch App - Settings' },
                    { src: 'assets/autoresearch6.png', alt: 'AutoResearch App - User Profile' },
                    { src: 'assets/autoresearch7.png', alt: 'AutoResearch App - Export Options' }
                ]
            },
            smsify: {
                title: 'Smsify - Free SMS Service',
                type: 'web', // Web application screenshots
                images: [
                    { src: 'assets/smsify1.png', alt: 'Smsify - Dashboard' },
                    { src: 'assets/smsify2.png', alt: 'Smsify - Send SMS Interface' },
                    { src: 'assets/smsify3.png.png', alt: 'Smsify - API Documentation' },
                    { src: 'assets/smsify4.png', alt: 'Smsify - User Settings' },
                    { src: 'assets/smsify5.png', alt: 'Smsify - Message History' }
                ]
            },
            tastysearch: {
                title: 'Search Tool for Reviews',
                type: 'web', // Web application screenshot
                images: [
                    { src: 'assets/tastysearch.png', alt: 'Review Search Tool - Main Interface' }
                ]
            },
            linkedinbot: {
                title: 'LinkedIn Bot',
                type: 'web', // Web application screenshot
                images: [
                    { src: 'assets/linkedinbot.png', alt: 'LinkedIn Bot - Data Mining Interface' }
                ]
            },
            soilmoisture: {
                title: 'Wireless Soil Moisture Sensor',
                type: 'hardware', // IoT hardware project
                images: [
                    { src: 'assets/soilmoisture.jpg', alt: 'Soil Moisture Sensor - Hardware Setup' }
                ]
            },
            aqms: {
                title: 'Air Quality Monitoring System',
                type: 'web', // Web application with IoT
                images: [
                    { src: 'assets/aqms.jpeg', alt: 'Air Quality Monitoring System - Dashboard' }
                ]
            }
        };

        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = document.getElementById('lightbox-image');
        this.lightboxTitle = document.getElementById('lightbox-title');
        this.lightboxCurrent = document.getElementById('lightbox-current');
        this.lightboxTotal = document.getElementById('lightbox-total');
        this.lightboxDots = document.getElementById('lightbox-dots');
        this.lightboxClose = document.querySelector('.lightbox-close');
        this.lightboxPrev = document.querySelector('.lightbox-prev');
        this.lightboxNext = document.querySelector('.lightbox-next');

        this.currentGallery = null;
        this.currentIndex = 0;

        this.init();
    }

    init() {
        // Add click listeners to project images
        document.querySelectorAll('.project-image[data-gallery]').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                const galleryName = trigger.getAttribute('data-gallery');
                this.openGallery(galleryName, 0);
            });
        });

        // Lightbox controls
        this.lightboxClose.addEventListener('click', () => this.closeLightbox());
        this.lightboxPrev.addEventListener('click', () => this.previousImage());
        this.lightboxNext.addEventListener('click', () => this.nextImage());

        // Close on background click
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.lightbox.classList.contains('active')) {
                switch(e.key) {
                    case 'Escape':
                        this.closeLightbox();
                        break;
                    case 'ArrowLeft':
                        this.previousImage();
                        e.preventDefault();
                        break;
                    case 'ArrowRight':
                        this.nextImage();
                        e.preventDefault();
                        break;
                }
            }
        });

        // Prevent body scroll when lightbox is open
        this.lightbox.addEventListener('transitionstart', () => {
            if (this.lightbox.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            }
        });

        this.lightbox.addEventListener('transitionend', () => {
            if (!this.lightbox.classList.contains('active')) {
                document.body.style.overflow = '';
            }
        });
    }

        openGallery(galleryName, startIndex = 0) {
        this.currentGallery = this.galleries[galleryName];
        if (!this.currentGallery) return;

        this.currentIndex = startIndex;
        this.lightboxTitle.textContent = this.currentGallery.title;
        this.lightboxTotal.textContent = this.currentGallery.images.length;

        // Apply gallery-specific styling based on type
        const lightboxContainer = this.lightbox.querySelector('.lightbox-container');
        // Remove all gallery type classes
        lightboxContainer.classList.remove('mobile-gallery', 'hardware-gallery');

        // Add appropriate class based on gallery type
        if (this.currentGallery.type === 'mobile') {
            lightboxContainer.classList.add('mobile-gallery');
        } else if (this.currentGallery.type === 'hardware') {
            lightboxContainer.classList.add('hardware-gallery');
        }

        this.createDots();
        this.updateImage();
        this.lightbox.classList.add('active');
    }

    closeLightbox() {
        this.lightbox.classList.remove('active');
        this.currentGallery = null;
        this.currentIndex = 0;
    }

    updateImage() {
        if (!this.currentGallery) return;

        const currentImage = this.currentGallery.images[this.currentIndex];
        this.lightboxImage.src = currentImage.src;
        this.lightboxImage.alt = currentImage.alt;
        this.lightboxCurrent.textContent = this.currentIndex + 1;

        // Update dots
        this.lightboxDots.querySelectorAll('.lightbox-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });

        // Hide/show navigation buttons for single images
        const showNavigation = this.currentGallery.images.length > 1;
        this.lightboxPrev.style.display = showNavigation ? 'flex' : 'none';
        this.lightboxNext.style.display = showNavigation ? 'flex' : 'none';
        this.lightboxDots.style.display = showNavigation ? 'flex' : 'none';
    }

    nextImage() {
        if (!this.currentGallery) return;
        this.currentIndex = (this.currentIndex + 1) % this.currentGallery.images.length;
        this.updateImage();
    }

    previousImage() {
        if (!this.currentGallery) return;
        this.currentIndex = (this.currentIndex - 1 + this.currentGallery.images.length) % this.currentGallery.images.length;
        this.updateImage();
    }

    createDots() {
        this.lightboxDots.innerHTML = '';
        this.currentGallery.images.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = 'lightbox-dot';
            dot.addEventListener('click', () => {
                this.currentIndex = index;
                this.updateImage();
            });
            this.lightboxDots.appendChild(dot);
        });
    }
}

// Initialize lightbox when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LightboxGallery();
});

// Toggle project description function
function toggleProjectDescription(button) {
    const projectCard = button.closest('.project-card');
    const expandableElements = projectCard.querySelectorAll('.project-description-expandable');
    const showMoreText = button.querySelector('.show-more-text');
    const chevronIcon = button.querySelector('i');
    
    const isExpanded = expandableElements[0].style.display !== 'none';
    
    expandableElements.forEach(element => {
        element.style.display = isExpanded ? 'none' : 'block';
    });
    
    showMoreText.textContent = isExpanded ? 'Show More' : 'Show Less';
    chevronIcon.classList.toggle('fa-chevron-down', isExpanded);
    chevronIcon.classList.toggle('fa-chevron-up', !isExpanded);
}
