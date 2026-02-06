// ========================================
// GLOBAL VARIABLES
// ========================================
let scrollRevealElements = [];
let currentTestimonial = 0;
const testimonials = [
    {
        text: "ZAGRED products transformed my skincare routine completely. The results were visible within just two weeks. Their digital marketing service also helped grow my beauty salon's online presence tremendously!",
        author: "Chioma Adebayo",
        role: "Beauty Salon Owner, Lagos"
    },
    {
        text: "Outstanding quality and customer service! ZAGRED has been instrumental in helping my beauty brand establish a strong digital presence. The combination of great products and marketing expertise is unmatched.",
        author: "Adebola Okonkwo",
        role: "Beauty Brand Founder"
    },
    {
        text: "The best beauty solutions I've ever used. Professional results, eco-friendly packaging, and excellent support. ZAGRED truly understands what modern beauty brands need to succeed.",
        author: "Funke Williams",
        role: "Professional Makeup Artist"
    }
];

// ========================================
// DOM CONTENT LOADED
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initializeComponents();
    setupEventListeners();
    initializeAnimations();
});

// ========================================
// INITIALIZATION FUNCTIONS
// ========================================
function initializeComponents() {
    // Initialize scroll reveal elements
    scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    
    // Initialize counter animations
    initializeCounters();
    
    // Initialize product filters
    initializeProductFilters();
    
    // Initialize testimonial slider
    initializeTestimonialSlider();
    
    // Check scroll position on load
    checkScrollPosition();
}

function setupEventListeners() {
    // Mobile navigation toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
        
        // Close mobile menu when clicking nav links
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    mainNav.querySelector('ul').classList.remove('active');
                }
            });
        });
    }
    
    // Scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', scrollToTop);
    }
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
    
    // Newsletter forms
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', handleNewsletterSubmit);
    });
    
    // Wishlist buttons
    const wishlistButtons = document.querySelectorAll('.btn-wishlist');
    wishlistButtons.forEach(btn => {
        btn.addEventListener('click', handleWishlistClick);
    });
    
    // Add to cart buttons
    const cartButtons = document.querySelectorAll('.btn-add-cart');
    cartButtons.forEach(btn => {
        btn.addEventListener('click', handleAddToCart);
    });
    
    // Quick view buttons
    const quickViewButtons = document.querySelectorAll('.btn-quick-view');
    quickViewButtons.forEach(btn => {
        btn.addEventListener('click', handleQuickView);
    });
    
    // Testimonial navigation
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    if (prevBtn) prevBtn.addEventListener('click', () => changeTestimonial(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => changeTestimonial(1));
}

function initializeAnimations() {
    // Trigger scroll animations on page load
    revealOnScroll();
}

// ========================================
// MOBILE MENU
// ========================================
function toggleMobileMenu() {
    const mainNav = document.getElementById('mainNav');
    const navList = mainNav.querySelector('ul');
    navList.classList.toggle('active');
    
    // Animate icon
    const icon = this.querySelector('i');
    if (navList.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

// ========================================
// SCROLL HANDLERS
// ========================================
function handleScroll() {
    checkScrollPosition();
    revealOnScroll();
    updateHeaderOnScroll();
}

function checkScrollPosition() {
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
}

function updateHeaderOnScroll() {
    const header = document.querySelector('.main-header');
    if (header) {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================
function revealOnScroll() {
    scrollRevealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('revealed');
        }
    });
}

// ========================================
// COUNTER ANIMATIONS
// ========================================
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;
    
    const animateCounters = () => {
        if (countersAnimated) return;
        
        const firstCounter = counters[0];
        if (!firstCounter) return;
        
        const rect = firstCounter.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible) {
            countersAnimated = true;
            counters.forEach(counter => {
                animateCounter(counter);
            });
        }
    };
    
    window.addEventListener('scroll', animateCounters);
    animateCounters(); // Check on load
}

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            counter.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target.toLocaleString();
        }
    };
    
    updateCounter();
}

// ========================================
// PRODUCT FILTERS
// ========================================
function initializeProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            const filter = this.getAttribute('data-filter');
            filterProducts(filter);
        });
    });
}

function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');
        
        if (category === 'all' || productCategory === category) {
            product.style.display = 'block';
            setTimeout(() => {
                product.style.opacity = '1';
                product.style.transform = 'scale(1)';
            }, 10);
        } else {
            product.style.opacity = '0';
            product.style.transform = 'scale(0.8)';
            setTimeout(() => {
                product.style.display = 'none';
            }, 300);
        }
    });
}

// ========================================
// TESTIMONIAL SLIDER
// ========================================
function initializeTestimonialSlider() {
    const testimonialCard = document.querySelector('.testimonial-card');
    if (testimonialCard && testimonials.length > 0) {
        updateTestimonial(0);
        
        // Auto-rotate testimonials every 5 seconds
        setInterval(() => {
            changeTestimonial(1);
        }, 5000);
    }
}

function changeTestimonial(direction) {
    currentTestimonial += direction;
    
    if (currentTestimonial < 0) {
        currentTestimonial = testimonials.length - 1;
    } else if (currentTestimonial >= testimonials.length) {
        currentTestimonial = 0;
    }
    
    updateTestimonial(currentTestimonial);
}

function updateTestimonial(index) {
    const testimonialCard = document.querySelector('.testimonial-card');
    if (!testimonialCard) return;
    
    const testimonial = testimonials[index];
    
    // Fade out
    testimonialCard.style.opacity = '0';
    
    setTimeout(() => {
        // Update content
        const textElement = testimonialCard.querySelector('.testimonial-text');
        const authorName = testimonialCard.querySelector('.testimonial-author h4');
        const authorRole = testimonialCard.querySelector('.testimonial-author p');
        
        if (textElement) textElement.textContent = `"${testimonial.text}"`;
        if (authorName) authorName.textContent = testimonial.author;
        if (authorRole) authorRole.textContent = testimonial.role;
        
        // Fade in
        testimonialCard.style.opacity = '1';
    }, 300);
}

// ========================================
// FORM HANDLERS
// ========================================
function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.btn-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    // Validate form
    if (!validateContactForm(form)) {
        return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';
    
    // Simulate form submission
    setTimeout(() => {
        // Hide form
        form.style.display = 'none';
        
        // Show success message
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.style.display = 'block';
        }
        
        // Reset form
        form.reset();
        
        // Reset button state
        submitBtn.disabled = false;
        btnText.style.display = 'inline-block';
        btnLoader.style.display = 'none';
        
        // Reset after 5 seconds
        setTimeout(() => {
            form.style.display = 'block';
            if (successMessage) {
                successMessage.style.display = 'none';
            }
        }, 5000);
    }, 1500);
}

function validateContactForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        const errorMessage = field.parentElement.querySelector('.error-message');
        
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = 'var(--accent-color)';
            if (errorMessage) {
                errorMessage.textContent = 'This field is required';
                errorMessage.style.display = 'block';
            }
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            isValid = false;
            field.style.borderColor = 'var(--accent-color)';
            if (errorMessage) {
                errorMessage.textContent = 'Please enter a valid email';
                errorMessage.style.display = 'block';
            }
        } else {
            field.style.borderColor = 'var(--border-color)';
            if (errorMessage) {
                errorMessage.style.display = 'none';
            }
        }
    });
    
    return isValid;
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const input = form.querySelector('input[type="email"]');
    const button = form.querySelector('button');
    
    if (!input.value.trim() || !isValidEmail(input.value)) {
        input.style.borderColor = 'var(--accent-color)';
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Show loading
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    button.disabled = true;
    
    // Simulate submission
    setTimeout(() => {
        showNotification('Successfully subscribed to newsletter!', 'success');
        input.value = '';
        input.style.borderColor = '';
        button.innerHTML = originalHTML;
        button.disabled = false;
    }, 1000);
}

// ========================================
// PRODUCT INTERACTIONS
// ========================================
function handleWishlistClick(e) {
    e.preventDefault();
    const icon = this.querySelector('i');
    
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        this.style.color = 'var(--accent-color)';
        showNotification('Added to wishlist!', 'success');
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        this.style.color = '';
        showNotification('Removed from wishlist', 'info');
    }
}

function handleAddToCart(e) {
    e.preventDefault();
    
    const button = this;
    const originalText = button.textContent;
    
    // Animation
    button.textContent = 'Adding...';
    button.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        button.textContent = '✓ Added';
        button.style.background = '#28a745';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            button.style.transform = '';
        }, 1500);
        
        showNotification('Product added to cart!', 'success');
    }, 500);
}

function handleQuickView(e) {
    e.preventDefault();
    showNotification('Quick view coming soon!', 'info');
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${getNotificationIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: getNotificationColor(type),
        color: 'white',
        padding: '15px 25px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: '10000',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        animation: 'slideInRight 0.3s ease-out',
        maxWidth: '300px'
    });
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        info: '#17a2b8',
        warning: '#ffc107'
    };
    return colors[type] || colors.info;
}

// ========================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ========================================
// LAZY LOADING IMAGES
// ========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// ADD ANIMATION KEYFRAMES DYNAMICALLY
// ========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
// Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handler
const debouncedScroll = debounce(handleScroll, 10);
window.removeEventListener('scroll', handleScroll);
window.addEventListener('scroll', debouncedScroll);

// ========================================
// CONSOLE MESSAGE
// ========================================
console.log('%c🍃 Danvo/Zagred Website ', 'background: #001f3f; color: #fff; padding: 10px 20px; font-size: 16px; font-weight: bold;');
console.log('%cWebsite loaded successfully! All interactive features are enabled.', 'color: #0074D9; font-size: 14px;');
