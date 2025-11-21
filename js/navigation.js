// Tab Navigation System
const navTabs = document.querySelectorAll('.nav-tab');
const navBrand = document.querySelector('.nav-brand');
const ctaButtons = document.querySelectorAll('.cta-button');
const sections = document.querySelectorAll('section[id]');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

// Function to switch tabs
function switchTab(tabName) {
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show the selected section
    const targetSection = document.getElementById(tabName);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Update active nav button
    navTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        }
    });

    // Close mobile menu if open
    navLinks.classList.remove('active');

    // Scroll to top
    window.scrollTo(0, 0);
}

// Add click event to all nav tabs
navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        switchTab(tab.dataset.tab);
    });
});

// Add click event to brand (goes to home)
navBrand.addEventListener('click', (e) => {
    e.preventDefault();
    switchTab('home');
});

// Add click event to CTA buttons
ctaButtons.forEach(button => {
    button.addEventListener('click', () => {
        switchTab(button.dataset.tab);
    });
});

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
