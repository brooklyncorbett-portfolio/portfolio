/* ============================================
   GLOBAL JAVASCRIPT
   Mobile navigation, scroll animations, utilities
   Used by every page on the site
   ============================================ */

// ============================================
// MOBILE NAVIGATION TOGGLE
// ============================================
function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// ============================================
// SCROLL-TRIGGERED FADE-IN ANIMATIONS
// ============================================
function initScrollReveal() {
    const fadeElements = document.querySelectorAll('.fade-in-section');
    
    if (!fadeElements.length) return;

    // If IntersectionObserver isn't supported, just show everything
    if (!('IntersectionObserver' in window)) {
        fadeElements.forEach(el => el.classList.add('visible'));
        return;
    }

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));
}

// ============================================
// COPY TO CLIPBOARD (for Interactive Demos)
// ============================================
function copyPrompt() {
    const textarea = document.getElementById('prompt-textarea');
    if (!textarea) return;

    const text = textarea.value.trim();
    const button = document.querySelector('.copy-prompt-btn');

    navigator.clipboard.writeText(text).then(() => {
        if (button) {
            const original = button.textContent;
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = original;
            }, 1500);
        }
    }).catch(err => {
        console.error("Clipboard error:", err);
        // Fallback for older browsers
        textarea.select();
        document.execCommand('copy');
        if (button) {
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = 'Copy';
            }, 1500);
        }
    });
}

// Make copyPrompt globally available
window.copyPrompt = copyPrompt;

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initScrollReveal();
});
