// Myth Study Interactive Features
// This file handles the Chart.js visualization and accordion functionality

// Initialize Chart when section is loaded
function initMythStudyChart() {
    const canvas = document.getElementById('mythResultsChart');
    if (!canvas) return; // Exit if canvas doesn't exist yet
    
    const ctx = canvas.getContext('2d');
    
    new Chart(ctx, {
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

// Initialize Accordion functionality
function initMythStudyAccordion() {
    const accordionHeader = document.getElementById('mythAccordionHeader');
    const accordionContent = document.getElementById('mythAccordionContent');

    if (!accordionHeader || !accordionContent) return; // Exit if elements don't exist

    accordionHeader.addEventListener('click', () => {
        accordionHeader.classList.toggle('active');
        accordionContent.classList.toggle('active');
    });
}

// Initialize everything when the myth-study section becomes active
function initializeMythStudySection() {
    // Check if we're on the myth-study section
    const mythStudySection = document.getElementById('myth-study');
    if (mythStudySection && mythStudySection.classList.contains('active')) {
        // Small delay to ensure Chart.js library is loaded
        setTimeout(() => {
            if (typeof Chart !== 'undefined') {
                initMythStudyChart();
            }
            initMythStudyAccordion();
        }, 100);
    }
}

// Listen for when sections become active
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
