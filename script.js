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

// Social Media Links Configuration
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


// Add these styles to your CSS
const styles = document.createElement('style');
styles.textContent = `
    .alert {
        padding: 15px;
        margin: 15px 0;
        border-radius: 4px;
        display: none;
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
    }

    #submit-btn.loading {
        opacity: 0.7;
        cursor: not-allowed;
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
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(styles);

// Pastikan EmailJS sudah diinisialisasi
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi EmailJS dengan public key Anda
    emailjs.init("service_opuy3c6"); // Ganti dengan public key Anda
});

// Form submission handler
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Elements
    const form = this;
    const submitBtn = document.getElementById('submit-btn');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    
    // Validate form
    if (!validateForm()) {
        showError('Please fill in all required fields correctly.');
        return;
    }
    
    // Set loading state
    setLoadingState(true);
    hideMessages();
    
    // Prepare email parameters
    const templateParams = {
        from_name: document.getElementById('name').value.trim(),
        from_email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim()
    };
    
    try {
        // Kirim email ke pemilik website
        await emailjs.send(
            'service_opuy3c6', 
            'template_xrrt72a', 
            templateParams
        );
        
        // Kirim auto-reply ke pengirim
        await emailjs.send(
            'service_opuy3c6', 
            'template_moc834p', 
            templateParams
        );
        
        // Success handling
        showSuccess('Pesan berhasil terkirim! Terima kasih telah menghubungi saya.');
        form.reset();
        
    } catch (error) {
        console.error('EmailJS Error:', error);
        showError('Gagal mengirim pesan. Silakan coba lagi nanti.');
    } finally {
        setLoadingState(false);
    }
});

// Helper Functions
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        return false;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return false;
    }
    
    return true;
}

function setLoadingState(isLoading) {
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = isLoading;
    submitBtn.classList.toggle('loading', isLoading);
    submitBtn.innerHTML = isLoading ? 
        '<span class="loading-spinner"></span>Sending...' : 
        'Send Message';
}

function showSuccess(message) {
    const successMessage = document.getElementById('success-message');
    successMessage.textContent = message;
    successMessage.style.display = 'block';
}

function showError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

function hideMessages() {
    document.getElementById('success-message').style.display = 'none';
    document.getElementById('error-message').style.display = 'none';
}