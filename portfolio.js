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
