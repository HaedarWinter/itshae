// Mobile Menu Functionality
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
        }
    });
});

// Social Media Links
const socialMediaConfig = {
    whatsapp: {
        url: 'https://wa.me/6285171699066',
        message: encodeURIComponent("Hai! Saya tertarik untuk berdiskusi lebih lanjut dengan Anda."),
        openInNewTab: true,
        trackingName: 'WhatsApp'
    },
    youtube: {
        url: 'https://youtube.com/@pplg1yaso?si=RBNTO08S8DkiF6O-',
        openInNewTab: true,
        trackingName: 'YouTube'
    },
    github: {
        url: 'https://github.com/HaedarWinter',
        openInNewTab: true,
        trackingName: 'GitHub'
    },
    linkedin: {
        url: 'https://linkedin.com/in/its-haedar-winter/',
        openInNewTab: true,
        trackingName: 'LinkedIn'
    },
    tiktok: {
        url: 'https://tiktok.com/@Haedarr09',
        openInNewTab: true,
        trackingName: 'TikTok'
    },
    instagram: {
        url: 'https://instagram.com/https://www.instagram.com/407.azell/profilecard/?igsh=bXh4b3Z1ZzJzdjd5',
        openInNewTab: true,
        trackingName: 'Instagram'
    }
};

// Social Media Click Handler
function handleSocialMediaClick(platform) {
    const config = socialMediaConfig[platform];
    
    if (!config) {
        console.error(`Configuration for ${platform} not found`);
        return;
    }

    // Analytics tracking
    trackSocialMediaClick(config.trackingName);

    // Construct the final URL
    let finalUrl = config.url;
    if (platform === 'whatsapp' && config.message) {
        finalUrl += `?text=${config.message}`;
    }

    // Open the link
    if (config.openInNewTab) {
        window.open(finalUrl, '_blank', 'noopener,noreferrer');
    } else {
        window.location.href = finalUrl;
    }
}

// Analytics tracking function
function trackSocialMediaClick(platform) {
    // You can implement your analytics tracking here
    console.log(`Social media click tracked: ${platform}`);
    // Example with Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'social_media_click', {
            'platform': platform,
            'timestamp': new Date().toISOString()
        });
    }
}

// Add click event listeners to social media icons
document.addEventListener('DOMContentLoaded', () => {
    const socialMediaIcons = document.querySelectorAll('.social-links a');
    
    socialMediaIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = icon.dataset.platform;
            handleSocialMediaClick(platform);
        });
    });
});


// Close mobile menu on scroll
window.addEventListener('scroll', () => {
    if (window.innerWidth <= 768) {
        navLinks.classList.remove('active');
    }
});

// CV Download Handler
document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.querySelector('.glass-btn');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            // Prevent default only if we want to do something before download
            // e.preventDefault();
            
            // Show download notification
            showDownloadNotification();
            
            // Optional: Track download
            trackDownload();
        });
    }
});

// Function to show download notification
function showDownloadNotification() {
    // Create notification if it doesn't exist
    if (!document.querySelector('.download-notification')) {
        const notification = document.createElement('div');
        notification.className = 'download-notification glass';
        notification.textContent = 'Download dimulai...';
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Function to track download
function trackDownload() {
    console.log('CV download tracked');
    // Uncomment below if using Google Analytics
    /*
    if (typeof gtag !== 'undefined') {
        gtag('event', 'cv_download', {
            'event_category': 'CV',
            'event_label': 'CV Download',
            'timestamp': new Date().toISOString()
        });
    }
    */
}

// Add notification styles with glass effect
const downloadStyles = document.createElement('style');
downloadStyles.textContent = `
    .download-notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: white;
        padding: 12px 24px;
        border-radius: 6px;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    @media (max-width: 768px) {
        .download-notification {
            left: 20px;
            right: 20px;
            bottom: 20px;
        }
    }
        .download-notification.scrolled {
            animation: slideOut 0.3s ease-out;
            color : black;
        
        }
    
    @keyframes slideIn {
        from {
            transform: translateY(100px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(downloadStyles);

// Smooth Scroll with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 70;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('progress')) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0';
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 100);
                }
            }
        });
    },
    { threshold: 0.1 }
);

// Observe all fade-in elements and progress bars
document.querySelectorAll('.fade-in, .progress').forEach(element => {
    observer.observe(element);
});

// Form Submission Handler
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted');
    contactForm.reset();
});

// Navigation Background Change on Scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Form field validation
function validateForm(formData) {
    const errors = [];
    
    // Name validation (minimum 2 characters)
    if (formData.name.length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    // Email validation
    if (!isValidEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Subject validation (minimum 3 characters)
    if (formData.subject.length < 3) {
        errors.push('Subject must be at least 3 characters long');
    }
    
    // Message validation (minimum 10 characters)
    if (formData.message.length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    return errors;
}

// Show alert message
function showAlert(type, message) {
    const alertElement = document.getElementById(`${type}-message`);
    if (alertElement) {
        alertElement.textContent = message;
        alertElement.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            alertElement.style.display = 'none';
        }, 5000);
    }
}

// Update button state
function updateButtonState(button, isLoading) {
    if (isLoading) {
        button.disabled = true;
        button.classList.add('loading');
        button.innerHTML = '<span class="loading-spinner"></span>Sending...';
    } else {
        button.disabled = false;
        button.classList.remove('loading');
        button.innerHTML = 'Send Message';
    }
}

// Main form submission handler
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-btn');
    const form = this;
    
    // Clear previous messages
    document.getElementById('success-message').style.display = 'none';
    document.getElementById('error-message').style.display = 'none';
    
    // Collect form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim()
    };
    
    // Validate form
    const validationErrors = validateForm(formData);
    if (validationErrors.length > 0) {
        showAlert('error', validationErrors.join('\n'));
        return;
    }
    
    // Prepare EmailJS parameters
    const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Website Owner', // Add your name here
        reply_to: formData.email
    };
    
    // Update button to loading state
    updateButtonState(submitBtn, true);
    
    try {
        // Send notification to website owner
        await emailjs.send('service_opuy3c6', 'template_xrrt72a', templateParams);
        
        // Send auto-reply to sender
        await emailjs.send('service_opuy3c6', 'template_moc834p', {
            ...templateParams,
            to_email: formData.email
        });
        
        // Show success message
        showAlert('success', 'Thank you for your message! I will get back to you soon.');
        
        // Reset form
        form.reset();
        
        // Track successful submission (if analytics is set up)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submission', {
                'event_category': 'Contact',
                'event_label': 'Success'
            });
        }
    } catch (error) {
        console.error('EmailJS Error:', error);
        showAlert('error', 'Failed to send message. Please try again later or contact me directly via email.');
        
        // Track error (if analytics is set up)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submission_error', {
                'event_category': 'Contact',
                'event_label': error.message
            });
        }
    } finally {
        // Reset button state
        updateButtonState(submitBtn, false);
    }
});

// Add these styles for better alert messages
const formStyles = document.createElement('style');
formStyles.textContent = `
    .alert {
        padding: 15px;
        margin: 15px 0;
        border-radius: 8px;
        display: none;
        font-size: 14px;
        transition: all 0.3s ease;
    }

    .success {
        background-color: rgba(75, 181, 67, 0.1);
        border: 1px solid #4bb543;
        color: #4bb543;
    }

    .error {
        background-color: rgba(239, 68, 68, 0.1);
        border: 1px solid #ef4444;
        color: #ef4444;
        white-space: pre-line;
    }

    .loading-spinner {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 3px solid rgba(255,255,255,.3);
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 1s ease-in-out infinite;
        margin-right: 10px;
        vertical-align: middle;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    #submit-btn {
        position: relative;
        transition: all 0.3s ease;
    }

    #submit-btn.loading {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;
document.head.appendChild(formStyles);
// Theme Toggle Functionality
const themeSwitch = document.getElementById('theme-switch');
const body = document.body;

themeSwitch.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const icon = themeSwitch.querySelector('i');
    const text = themeSwitch.querySelector('span');
    
    if (body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        text.textContent = 'Light Mode';
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        text.textContent = 'Dark Mode';
    }
});

// Fungsi Pilih Bahasa
const languageSwitch = document.getElementById('language-switch');
const translations = {
    en: {
        // Nambahin English translations
    },
    id: {
        // Nambahin Indonesian translations
    }
};

languageSwitch.addEventListener('change', (e) => {
    const language = e.target.value;
    updateLanguage(language);
});

function updateLanguage(language) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = translations[language][key];
    });
}

// Loading Animasi
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
});

// Blog Card Hover Animation
const blogCards = document.querySelectorAll('.blog-card');
blogCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Testimonial Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
    });
}

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Tunggu sampai DOM sepenuhnya dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi Fungsi FAQ
    initFAQ();
    
    // Inisialisasi Tombol Metode Kontak
    initContactMethods();
    
    // Inisialisasi App Utama
    App.init();
});

// Fungsi FAQ
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Tutup semua FAQ
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Buka FAQ yang diklik jika sebelumnya tidak aktif
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// Tombol Metode Kontak
function initContactMethods() {
    document.querySelectorAll('.method-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Hapus kelas active dari semua tombol
            document.querySelectorAll('.method-btn').forEach(b => {
                b.classList.remove('active');
            });
            
            // Tambah kelas active ke tombol yang diklik
            btn.classList.add('active');
            
            // Perbarui dropdown pilihan di form
            const method = btn.dataset.method;
            document.getElementById('contact-method').value = method;
        });
    });
}

const App = {
    // State management
    state: {
        currentTestimonial: 0,
        isDarkMode: false,
        currentLanguage: 'en'
    },

    // Cache DOM elements
    elements: {
        themeSwitch: null,
        languageSwitch: null,
        loadingScreen: null,
        blogCards: null,
        testimonials: null,
        body: document.body
    },

    // Translations object
    translations: {
        en: {
            darkMode: 'Dark Mode',
            lightMode: 'Light Mode',
            loading: 'Loading...'
            // Add more English translations as needed
        },
        id: {
            darkMode: 'Mode Gelap',
            lightMode: 'Mode Terang',
            loading: 'Tunggu Bentar Yaa...'
            // Add more Indonesian translations as needed
        }
    },

    // Initialize the application
    init() {
        this.cacheElements();
        this.bindEvents();
        this.initializeLoading();
        this.initializeTestimonials();
        this.initializeBlogCards();
    },

    // Cache all DOM elements
    cacheElements() {
        this.elements.themeSwitch = document.getElementById('theme-switch');
        this.elements.languageSwitch = document.getElementById('language-switch');
        this.elements.loadingScreen = document.getElementById('loading-screen');
        this.elements.blogCards = document.querySelectorAll('.blog-card');
        this.elements.testimonials = document.querySelectorAll('.testimonial-card');
    },

    // Bind all event listeners
    bindEvents() {
        // Theme switching
        this.elements.themeSwitch?.addEventListener('click', () => this.toggleTheme());

        // Language switching
        this.elements.languageSwitch?.addEventListener('change', (e) => this.updateLanguage(e.target.value));
    },

    // Theme toggling functionality
    toggleTheme() {
        this.state.isDarkMode = !this.state.isDarkMode;
        this.elements.body.classList.toggle('dark-mode');

        const icon = this.elements.themeSwitch.querySelector('i');
        const text = this.elements.themeSwitch.querySelector('span');

        if (this.state.isDarkMode) {
            icon?.classList.replace('fa-moon', 'fa-sun');
            text.textContent = this.translations[this.state.currentLanguage].lightMode;
        } else {
            icon?.classList.replace('fa-sun', 'fa-moon');
            text.textContent = this.translations[this.state.currentLanguage].darkMode;
        }
    },

    // Language switching functionality
    updateLanguage(language) {
        this.state.currentLanguage = language;
        const elements = document.querySelectorAll('[data-translate]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (this.translations[language][key]) {
                element.textContent = this.translations[language][key];
            }
        });
    },

    // Loading screen functionality
    initializeLoading() {
        window.addEventListener('DOMContentLoaded', () => {
            if (this.elements.loadingScreen) {
                setTimeout(() => {
                    this.elements.loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        this.elements.loadingScreen.style.display = 'none';
                    }, 500);
                }, 1000);
            }
        });
    },

    // Blog cards animation
    initializeBlogCards() {
        this.elements.blogCards?.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    },

    // Testimonial slider functionality
    initializeTestimonials() {
        if (this.elements.testimonials?.length) {
            this.showTestimonial(0);
            setInterval(() => {
                this.state.currentTestimonial = 
                    (this.state.currentTestimonial + 1) % this.elements.testimonials.length;
                this.showTestimonial(this.state.currentTestimonial);
            }, 5000);
        }
    },

    showTestimonial(index) {
        this.elements.testimonials?.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }
};

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());
