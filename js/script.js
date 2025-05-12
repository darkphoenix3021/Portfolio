/*===== PORTFOLIO WEBSITE JAVASCRIPT =====*/

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functions
    preloader();
    stickyHeader();
    mobileMenuToggle();
    typingEffect();
    initScrollAnimation();
    initProgressBars();
    projectFilter();
    scrollToTop();
    formValidation();
    themeToggle();
    
    // Log initialization
    console.log('Portfolio website initialized successfully');
});

/*===== PRELOADER =====*/
function preloader() {
    const preloader = document.querySelector('.preloader');
    
    if (preloader) {
        // Hide preloader after the page is fully loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hide');
                
                // Enable scroll after preloader disappears
                document.body.style.overflow = 'auto';
            }, 500);
        });
        
        // Disable scroll while preloader is active
        document.body.style.overflow = 'hidden';
    }
}

/*===== STICKY HEADER =====*/
function stickyHeader() {
    const header = document.getElementById('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            // Add sticky class when scrolled beyond 50px
            if (window.scrollY > 50) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }
}

/*===== MOBILE MENU TOGGLE =====*/
function mobileMenuToggle() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && navMenu) {
        // Toggle menu when hamburger icon is clicked
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when a nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

/*===== TYPING EFFECT =====*/
function typingEffect() {
    const typedTextSpan = document.querySelector('.typed-text');
    
    if (typedTextSpan) {
        const texts = ['Web Developer', 'UI/UX Designer', 'Photographer', 'Freelancer']; // Replace with your roles
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 200; // Delay between each character typing
        
        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                // Remove character
                typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingDelay = 100; // Faster when deleting
            } else {
                // Add character
                typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingDelay = 200; // Normal speed when typing
            }
            
            // Switch between typing and deleting
            if (!isDeleting && charIndex === currentText.length) {
                // Pause at the end of typing
                typingDelay = 1500;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Move to next text after deletion
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingDelay = 500; // Pause before starting new text
            }
            
            setTimeout(type, typingDelay);
        }
        
        // Start the typing effect
        setTimeout(type, 1000);
    }
}

/*===== SCROLL ANIMATIONS USING INTERSECTION OBSERVER =====*/
function initScrollAnimation() {
    // Get all elements with animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // If no elements, exit
    if (!animatedElements.length) return;
    
    const options = {
        root: null, // Use viewport as root
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Slightly above the bottom edge
    };
    
    // Create observer for animation elements
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add show class to trigger animation
                entry.target.classList.add('show');
                
                // Add sequential delays to child elements if they exist
                const children = entry.target.querySelectorAll('.animate-on-scroll');
                if (children.length) {
                    children.forEach((child, index) => {
                        child.style.transitionDelay = `${0.1 * (index + 1)}s`;
                        child.classList.add('show');
                    });
                }
                
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    // Observe each element
    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
    
    // Zoom effect for images while scrolling
    const zoomImages = document.querySelectorAll('.zoom-on-scroll');
    
    if (zoomImages.length) {
        const zoomOptions = {
            root: null,
            threshold: [0.1, 0.5, 0.9], // Multiple thresholds for smoother effect
            rootMargin: '0px'
        };
        
        const zoomObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const ratio = entry.intersectionRatio;
                    
                    // Apply zoom effect based on how much is visible
                    if (ratio > 0.5) {
                        entry.target.classList.add('zoom-in');
                        entry.target.classList.remove('zoom-out');
                    } else {
                        entry.target.classList.add('zoom-out');
                        entry.target.classList.remove('zoom-in');
                    }
                }
            });
        }, zoomOptions);
        
        zoomImages.forEach(image => {
            zoomObserver.observe(image);
        });
    }
}

/*===== SKILL PROGRESS BARS ANIMATION =====*/
function initProgressBars() {
    const progressBars = document.querySelectorAll('.skill-progress');
    
    if (!progressBars.length) return;
    
    const options = {
        root: null,
        threshold: 0.3, // Start animation when 30% of the bar is visible
        rootMargin: '0px'
    };
    
    const progressObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.getAttribute('data-progress') || '0%';
                
                // Animate the progress bar width
                setTimeout(() => {
                    progressBar.style.width = progress;
                }, 200);
                
                // Stop observing after animation
                observer.unobserve(progressBar);
            }
        });
    }, options);
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

/*===== PROJECT FILTERING =====*/
function projectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!filterButtons.length || !projectCards.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter the project cards
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                // Hide all cards first
                card.style.transform = 'scale(0.8)';
                card.style.opacity = '0';
                
                setTimeout(() => {
                    // Show cards that match the filter
                    if (filterValue === 'all' || filterValue === cardCategory) {
                        card.style.display = 'block';
                        
                        setTimeout(() => {
                            card.style.transform = 'scale(1)';
                            card.style.opacity = '1';
                        }, 100);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });
}

/*===== SCROLL TO TOP BUTTON =====*/
function scrollToTop() {
    const scrollTopBtn = document.createElement('div');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when clicked
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/*===== FORM VALIDATION =====*/
// Initialize EmailJS
function initEmailJS() {
    emailjs.init("-684Pcp1RwfgtTWSw"); // EmailJS public key
}

// Call initialization when the DOM is loaded
document.addEventListener('DOMContentLoaded', initEmailJS);

function formValidation() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            
    // Get form elements
            const name = contactForm.querySelector('#name');
            const email = contactForm.querySelector('#email');
            const subject = contactForm.querySelector('#subject');
            const message = contactForm.querySelector('#message');
            
            // Clear previous errors
            const errorElements = contactForm.querySelectorAll('.error-message');
            errorElements.forEach(error => error.remove());
            
            // Validate name
            if (name && (!name.value.trim() || name.value.length < 2)) {
                isValid = false;
                showError(name, 'Please enter a valid name (at least 2 characters)');
            }
            
            // Validate email
            if (email && !isValidEmail(email.value)) {
                isValid = false;
                showError(email, 'Please enter a valid email address');
            }
            
            // Validate subject
            if (subject && !subject.value.trim()) {
                isValid = false;
                showError(subject, 'Please enter a subject');
            }
            
            // Validate message
            if (message && message.value.trim().length < 10) {
                isValid = false;
                showError(message, 'Please enter a message (at least 10 characters)');
            }
            
            // If form is valid, proceed with submission or show success message
            if (isValid) {
                // Show loading indicator
                const submitButton = contactForm.querySelector('.submit-button');
                const originalButtonText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                // Prepare template parameters
                const templateParams = {
                    to_email: 'akshit2022@outlook.com',
                    from_name: name.value,
                    from_email: email.value,
                    subject: subject.value,
                    message: message.value
                };
                
                // Send email using EmailJS
                emailjs.send('service_8atzf6l', 'template_iaoexua', templateParams) // Using configured service and template
                    .then(() => {
                        // Clear form fields
                        contactForm.reset();
                        
                        // Show success message
                        const formGroups = contactForm.querySelectorAll('.form-group');
                        const successMessage = document.createElement('div');
                        successMessage.className = 'success-message';
                        successMessage.textContent = 'Your message has been sent successfully!';
                        
                        contactForm.insertBefore(successMessage, formGroups[0]);
                        
                        // Reset button
                        submitButton.textContent = originalButtonText;
                        submitButton.disabled = false;
                        
                        // Remove success message after 5 seconds
                        setTimeout(() => {
                            successMessage.remove();
                        }, 5000);
                    })
                    .catch((error) => {
                        // Show error message
                        const formGroups = contactForm.querySelectorAll('.form-group');
                        const errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message';
                        errorMessage.textContent = 'Failed to send message. Please try again later.';
                        
                        contactForm.insertBefore(errorMessage, formGroups[0]);
                        
                        // Reset button
                        submitButton.textContent = originalButtonText;
                        submitButton.disabled = false;
                        
                        // Remove error message after 5 seconds
                        setTimeout(() => {
                            errorMessage.remove();
                        }, 5000);
                        
                        console.error('EmailJS error:', error);
                    });
            }
        });
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // Helper function to show error messages
    function showError(element, message) {
        const formGroup = element.closest('.form-group');
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        errorMessage.style.color = 'red';
        errorMessage.style.fontSize = '0.85em';
        errorMessage.style.marginTop = '5px';
        
        formGroup.appendChild(errorMessage);
        element.style.borderColor = 'red';
        
        // Remove error when input changes
        element.addEventListener('input', () => {
            errorMessage.remove();
            element.style.borderColor = '';
        });
    }
}

/*===== ACTIVE NAVIGATION LINK HIGHLIGHT ON SCROLL =====*/
function activeNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Listen for scroll events
    window.addEventListener('scroll', () => {
        let current = '';
        
        // Find the current section
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        // Highlight the corresponding nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Call the active nav function
activeNavOnScroll();

/*===== IMAGE LAZY LOADING =====*/
function lazyLoadImages() {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const imgOptions = {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px 200px 0px' // Load images when they're 200px before coming into view
        };
        
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                    }
                    
                    observer.unobserve(img);
                }
            });
        }, imgOptions);
        
        // Find all images with data-src attribute
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            imgObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        // Load all images at once
        lazyImages.forEach(img => {
            const src = img.getAttribute('data-src');
            if (src) {
                img.src = src;
                img.removeAttribute('data-src');
            }
        });
    }
}

// Call the lazy load function
lazyLoadImages();

/*===== THEME TOGGLE =====*/
function themeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme on initial load
    if (currentTheme === 'dark') {
        body.classList.add('dark-theme');
    }
    
    // Toggle theme when button is clicked
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            // Toggle dark class on body
            body.classList.toggle('dark-theme');
            
            // Save theme preference to localStorage
            if (body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }
}

