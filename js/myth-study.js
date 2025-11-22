// Myth Study Interactive Features
// This file handles the Chart.js visualization, accordion functionality, and animations

// ============================================
// SCROLL-TRIGGERED FADE-IN ANIMATIONS
// ============================================
function initScrollAnimations() {
    const fadeInSections = document.querySelectorAll('.fade-in-section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    fadeInSections.forEach(section => {
        observer.observe(section);
    });
}

// ============================================
// ANIMATED GAUGE COUNTERS
// ============================================
function animateGauge(gaugeElement, targetValue) {
    const duration = 2000; // 2 seconds
    const startValue = 0;
    const startTime = performance.now();
    
    function updateGauge(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out cubic)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.round(startValue + (targetValue - startValue) * easeOut);
        
        gaugeElement.textContent = currentValue + '%';
        
        if (progress < 1) {
            requestAnimationFrame(updateGauge);
        }
    }
    
    requestAnimationFrame(updateGauge);
}

function initGaugeAnimations() {
    const gaugeCards = document.querySelectorAll('.gauge-card');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                const gaugeValue = entry.target.querySelector('.gauge-value');
                const targetValue = parseInt(gaugeValue.dataset.target);
                
                animateGauge(gaugeValue, targetValue);
                entry.target.dataset.animated = 'true';
            }
        });
    }, observerOptions);
    
    gaugeCards.forEach(card => {
        observer.observe(card);
    });
}

// ============================================
// CHART INITIALIZATION AND ANIMATION
// ============================================
let chartInstance = null;

function initMythStudyChart() {
    const canvas = document.getElementById('mythResultsChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Destroy existing chart if it exists
    if (chartInstance) {
        chartInstance.destroy();
    }
    
    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Pre-Test', 'Immediate Post-Test', '10 Days Later', '2 Months Later'],
            datasets: [
                {
                    label: 'Misconception AI Dialogue',
                    data: [91, 52, 50, 57],
                    borderColor: '#75352D',
                    backgroundColor: 'rgba(117, 53, 45, 0.1)',
                    borderWidth: 4,
                    tension: 0.3,
                    pointRadius: 8,
                    pointBackgroundColor: '#75352D',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 3,
                    pointHoverRadius: 10
                },
                {
                    label: 'Textbook Refutation',
                    data: [93, 62, 64, 66],
                    borderColor: '#92A4D2',
                    backgroundColor: 'rgba(146, 164, 210, 0.1)',
                    borderWidth: 4,
                    tension: 0.3,
                    pointRadius: 8,
                    pointBackgroundColor: '#92A4D2',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 3,
                    pointHoverRadius: 10
                },
                {
                    label: 'Neutral AI (Control)',
                    data: [89, 85, 78, 75],
                    borderColor: '#A0AEC0',
                    backgroundColor: 'rgba(160, 174, 192, 0.1)',
                    borderWidth: 4,
                    tension: 0.3,
                    pointRadius: 8,
                    pointBackgroundColor: '#A0AEC0',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 3,
                    pointHoverRadius: 10
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart',
                delay: (context) => {
                    let delay = 0;
                    if (context.type === 'data' && context.mode === 'default') {
                        delay = context.dataIndex * 200 + context.datasetIndex * 100;
                    }
                    return delay;
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: {
                            size: 14,
                            family: 'Inter',
                            weight: '600'
                        },
                        color: '#3A1213',
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(58, 18, 19, 0.95)',
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 13
                    },
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        font: {
                            size: 13,
                            family: 'Inter'
                        },
                        color: '#75352D',
                        callback: function(value) {
                            return value;
                        }
                    },
                    grid: {
                        color: 'rgba(146, 164, 210, 0.2)',
                        drawBorder: false
                    },
                    title: {
                        display: true,
                        text: 'Belief in Myth (0-100 Scale)',
                        font: {
                            size: 14,
                            family: 'Inter',
                            weight: '600'
                        },
                        color: '#3A1213'
                    }
                },
                x: {
                    ticks: {
                        font: {
                            size: 13,
                            family: 'Inter',
                            weight: '500'
                        },
                        color: '#75352D'
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Trigger chart animation when scrolled into view
function initChartAnimation() {
    const chartContainer = document.querySelector('.chart-container');
    if (!chartContainer) return;
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                if (typeof Chart !== 'undefined') {
                    initMythStudyChart();
                    entry.target.dataset.animated = 'true';
                }
            }
        });
    }, observerOptions);
    
    observer.observe(chartContainer);
}

// ============================================
// ACCORDION FUNCTIONALITY
// ============================================
function initMythStudyAccordion() {
    const accordionHeader = document.getElementById('mythAccordionHeader');
    const accordionContent = document.getElementById('mythAccordionContent');

    if (!accordionHeader || !accordionContent) return;

    accordionHeader.addEventListener('click', () => {
        accordionHeader.classList.toggle('active');
        accordionContent.classList.toggle('active');
    });
}

// ============================================
// INITIALIZE ALL FEATURES
// ============================================
function initializeMythStudySection() {
    const mythStudySection = document.getElementById('myth-study');
    if (mythStudySection && mythStudySection.classList.contains('active')) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
            initScrollAnimations();
            initGaugeAnimations();
            initChartAnimation();
            initMythStudyAccordion();
        }, 100);
    }
}

// ============================================
// EVENT LISTENERS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize if already on myth-study page
    initializeMythStudySection();
    
    // Re-initialize when navigating to myth-study
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target.id === 'myth-study' && 
                mutation.target.classList.contains('active')) {
                initializeMythStudySection();
            }
        });
    });

    // Observe all sections for class changes
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        observer.observe(section, { attributes: true, attributeFilter: ['class'] });
    });
});

// Re-initialize scroll animations when window is resized
window.addEventListener('resize', () => {
    const mythStudySection = document.getElementById('myth-study');
    if (mythStudySection && mythStudySection.classList.contains('active')) {
        initScrollAnimations();
    }
});
