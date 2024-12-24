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
        notification.textContent = 'Tunggu Bentar Yaa... File CV Sedang Di Download...';
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

// Handler utama untuk form submission
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-btn');
    const form = this;
    
    // Hapus pesan sebelumnya
    document.getElementById('success-message').style.display = 'none';
    document.getElementById('error-message').style.display = 'none';
    
    // Kumpulkan data form
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim()
    };
    
    // Validasi form
    const validationErrors = validateForm(formData);
    if (validationErrors.length > 0) {
        showAlert('error', validationErrors.join('\n'));
        return;
    }

    function createTemplateParams(formData, toName, toEmail) {
        return {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_name: toName,
            to_email: toEmail,
            reply_to: formData.email
        };
    }
    
    // Gunakan fungsi utilitas untuk membuat parameter
    const ownerTemplateParams = createTemplateParams(formData, 'Muhamad Ropi Haedar', 'owner@example.com');
    const autoReplyTemplateParams = createTemplateParams(formData, formData.name, formData.email);
    
    // Update status tombol jadi loading
    updateButtonState(submitBtn, true);
    
    try {
        // Kirim notifikasi ke pemilik website
        await emailjs.send(
            'service_opuy3c6', 
            'template_j229t4h',  // Template untuk notifikasi pemilik
            ownerTemplateParams
        );
        
        // Kirim auto-reply ke pengirim menggunakan template yang sudah ada
        await emailjs.send(
            'service_opuy3c6',
            'template_ku9aopp',  // Template untuk auto-reply
            autoReplyTemplateParams
        );
        
        // Tampilkan pesan sukses
        showAlert('success', 'Makasih atas pesan yang kamu kirimkan. Kami bakalan segera respon InsyaAllah.');
        
        // Reset form
        form.reset();
        
        // Track submission berhasil (jika analytics sudah diset)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submission', {
                'event_category': 'Contact',
                'event_label': 'Success'
            });
        }
    } catch (error) {
        console.error('EmailJS Error:', error);
        showAlert('error', 'Gagal mengirim pesan. Mohon coba lagi nanti atau hubungi saya via email.');
        
        // Track error (jika analytics sudah diset)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submission_error', {
                'event_category': 'Contact',
                'event_label': error.message
            });
        }
    } finally {
        // Reset status tombol
        updateButtonState(submitBtn, false);
    }
});

// form submission handler linkedin and whatsapp
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const contactMethod = document.getElementById('contact-method').value;

    // Success and error message elements
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    // Function to show messages
    const showMessage = (element, duration = 3000) => {
        element.style.display = 'block';
        setTimeout(() => {
            element.style.display = 'none';
        }, duration);
    };

    // Handle different contact methods
    switch(contactMethod) {
        case 'whatsapp':
            // Format message for WhatsApp
            const whatsappMessage = `*New Contact Form Submission*%0a
Name: ${name}%0a
Email: ${email}%0a
Subject: ${subject}%0a
Message: ${message}`;
            
            // Replace YOUR_PHONE_NUMBER with your actual WhatsApp business number
            const whatsappUrl = `https://wa.me/6285171699066?text=${whatsappMessage}`;
            
            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');
            showMessage(successMessage);
            e.target.reset(); // Reset form
            break;

        case 'linkedin':
            // Format message for LinkedIn
            const linkedinMessage = encodeURIComponent(`Hello, I am ${name}. ${message}`);
            
            // Replace YOUR_LINKEDIN_PROFILE_ID with your actual LinkedIn profile ID
            const linkedinUrl = `https://www.linkedin.com/messaging/compose/?to=its-haedar-winter&body=${linkedinMessage}`;
            
            // Open LinkedIn messaging in new tab
            window.open(linkedinUrl, '_blank');
            showMessage(successMessage);
            e.target.reset(); // Reset form
            break;

        default:
            // For email or any other case, let your existing EmailJS code handle it
            return true;
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

// Theme handling
const themeSwitch = document.getElementById('theme-switch');

// Get preferred theme
const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
};

// Apply theme
const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
};

// Initialize theme
applyTheme(getPreferredTheme());

// Theme toggle handler
themeSwitch.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
});
// System theme change detection
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
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
        this.elements.loadingScreen = document.getElementById('loading-screen');
        this.elements.blogCards = document.querySelectorAll('.blog-card');
        this.elements.testimonials = document.querySelectorAll('.testimonial-card');
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


//theme
