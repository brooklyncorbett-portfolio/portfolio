// Section Loader Utility
async function loadSection(sectionId) {
    const sectionContainer = document.getElementById(sectionId);
    
    if (!sectionContainer) {
        console.error(`Section container #${sectionId} not found`);
        return;
    }
    
    // If already loaded, don't reload
    if (sectionContainer.dataset.loaded === 'true') {
        return;
    }
    
    try {
        const response = await fetch(`sections/${sectionId}.html`);
        if (!response.ok) {
            throw new Error(`Failed to load ${sectionId}.html`);
        }
        const html = await response.text();
        sectionContainer.innerHTML = html;
        sectionContainer.dataset.loaded = 'true';
        
        // Re-attach event listeners for CTA buttons if this is the home section
        if (sectionId === 'home') {
            const ctaButtons = sectionContainer.querySelectorAll('.cta-button');
            ctaButtons.forEach(button => {
                button.addEventListener('click', () => {
                    switchTab(button.dataset.tab);
                });
            });
        }
    } catch (error) {
        console.error(`Error loading section ${sectionId}:`, error);
        sectionContainer.innerHTML = `<p>Error loading content. Please refresh the page.</p>`;
    }
}

// Load all sections on page load
async function loadAllSections() {
    const sections = ['home', 'about', 'research', 'ai-education', 'data-viz', 'rigour'];
    await Promise.all(sections.map(section => loadSection(section)));
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadAllSections);
