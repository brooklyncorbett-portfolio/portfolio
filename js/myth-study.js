// Myth Study Interactive Features
// - Scroll-triggered animations
// - Belief change chart (Chart.js)
// - Expandable myths panel + accordion
// - Example conversation modal

function initMythScrollAnimations() {
    const sections = document.querySelectorAll('#myth-study .fade-in-section');
    if (!sections.length) return;
  
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
      }
    );
  
    sections.forEach(section => observer.observe(section));
  }
  
  function initBeliefChart() {
    const ctx = document.getElementById('beliefChangeChart');
    if (!ctx || typeof Chart === 'undefined') return;
  
    // Avoid double-initialisation
    if (ctx.dataset.initialised === 'true') return;
  
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Pre', 'Post', 'Follow-up'],
        datasets: [
          {
            label: 'AI Tutor',
            data: [90, 38, 42],
            borderColor: '#75352D',
            backgroundColor: 'rgba(117, 53, 45, 0.12)',
            borderWidth: 3,
            tension: 0.3,
            pointRadius: 6,
            pointBackgroundColor: '#75352D',
            pointBorderColor: '#fff',
            pointBorderWidth: 2
          },
          {
            label: 'Text-based Refutation',
            data: [89, 55, 60],
            borderColor: '#92A4D2',
            backgroundColor: 'rgba(146, 164, 210, 0.12)',
            borderWidth: 3,
            tension: 0.3,
            pointRadius: 6,
            pointBackgroundColor: '#92A4D2',
            pointBorderColor: '#fff',
            pointBorderWidth: 2
          },
          {
            label: 'Neutral AI Chat',
            data: [88, 77, 75],
            borderColor: '#C4A27F',
            backgroundColor: 'rgba(241, 221, 196, 0.25)',
            borderWidth: 3,
            tension: 0.3,
            pointRadius: 6,
            pointBackgroundColor: '#C4A27F',
            pointBorderColor: '#fff',
            pointBorderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'nearest',
          intersect: false
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              usePointStyle: true
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: 100,
            title: {
              display: true,
              text: 'Belief strength (0–100)'
            }
          }
        }
      }
    });
  
    ctx.dataset.initialised = 'true';
    ctx.mythChart = chart;
  }
  
  function initMythsPanel() {
    const toggleBtn = document.getElementById('toggle-myths');
    const panel = document.getElementById('myths-panel');
    if (!toggleBtn || !panel) return;
  
    const updateLabel = expanded => {
      toggleBtn.textContent = expanded ? 'Hide myths' : 'View all 16 myths';
    };
  
    updateLabel(false);
  
    toggleBtn.addEventListener('click', () => {
      const expanded = panel.classList.toggle('expanded');
      panel.classList.toggle('collapsed', !expanded);
      updateLabel(expanded);
    });
  }
  
  function initMythAccordion() {
    const cards = document.querySelectorAll('#myths-panel .myth-card');
    if (!cards.length) return;
  
    cards.forEach(card => {
      const header = card.querySelector('.myth-card-header');
      header.addEventListener('click', () => {
        card.classList.toggle('open');
      });
    });
  }
  
  function initConversationModal() {
    const openBtn = document.getElementById('open-conversation');
    const modal = document.getElementById('conversation-modal');
    if (!openBtn || !modal) return;
  
    const backdrop = modal.querySelector('.conversation-backdrop');
    const closeBtn = modal.querySelector('.conversation-close');
  
    const open = () => {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };
  
    const close = () => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };
  
    openBtn.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', close);
  
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        close();
      }
    });
  }
  
  function initMythStudy() {
    const container = document.querySelector('#myth-study .myth-study-section');
    if (!container) return;
  
    initMythScrollAnimations();
    initBeliefChart();
    initMythsPanel();
    initMythAccordion();
    initConversationModal();
  }
  
  // Because sections are loaded asynchronously via fetch(), we:
  // 1) Run once on DOMContentLoaded with a small delay
  // 2) Observe the #myth-study section for content changes and re-run
  
  document.addEventListener('DOMContentLoaded', () => {
    const mythSection = document.getElementById('myth-study');
  
    const tryInit = () => {
      initMythStudy();
    };
  
    // First attempt after a short delay
    setTimeout(tryInit, 300);
  
    if (!mythSection) return;
  
    const observer = new MutationObserver(() => {
      initMythStudy();
    });
  
    observer.observe(mythSection, { childList: true, subtree: true });
  });
  