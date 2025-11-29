/* ============================================
   MYTH STUDY PAGE JAVASCRIPT
   Expandable cards, Chart.js visualization, accordion
   Only used by research/myth-study.html
   ============================================ */

// ============================================
// EXPANDABLE MYTH CARDS
// ============================================
function initMythCards() {
    const mythCards = document.querySelectorAll('.myth-card');
    
    mythCards.forEach(card => {
        const header = card.querySelector('.myth-card-header');
        
        if (!header) return;
        
        header.addEventListener('click', () => {
            card.classList.toggle('expanded');
        });
    });
}

// ============================================
// CONVERSATION ACCORDION
// ============================================
function initAccordion() {
    const accordionHeader = document.getElementById('mythAccordionHeader');
    const accordionContent = document.getElementById('mythAccordionContent');

    if (!accordionHeader || !accordionContent) return;

    accordionHeader.addEventListener('click', () => {
        accordionHeader.classList.toggle('active');
        accordionContent.classList.toggle('active');
    });
}

// ============================================
// CHART.JS VISUALIZATION
// ============================================
let chartInstance = null;

function initChart() {
    const canvas = document.getElementById('mythResultsChart');
    if (!canvas) return;
    
    // Wait for Chart.js to load
    if (typeof Chart === 'undefined') {
        setTimeout(initChart, 100);
        return;
    }
    
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
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 13 },
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
                        font: { size: 13, family: 'Inter' },
                        color: '#75352D'
                    },
                    grid: {
                        color: 'rgba(146, 164, 210, 0.2)',
                        drawBorder: false
                    },
                    title: {
                        display: true,
                        text: 'Belief in Myth (0-100 Scale)',
                        font: { size: 14, family: 'Inter', weight: '600' },
                        color: '#3A1213'
                    }
                },
                x: {
                    ticks: {
                        font: { size: 13, family: 'Inter', weight: '500' },
                        color: '#75352D'
                    },
                    grid: { display: false }
                }
            }
        }
    });
}

// Initialize chart when scrolled into view
function initChartOnScroll() {
    const chartContainer = document.querySelector('.chart-container');
    if (!chartContainer) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                initChart();
                entry.target.dataset.animated = 'true';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(chartContainer);
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initMythCards();
    initAccordion();
    initChartOnScroll();
});
