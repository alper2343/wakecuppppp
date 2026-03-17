// =============================================
// Wake Cup Alsancak - Menu Page JavaScript
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sections = document.querySelectorAll('.menu-page-section[data-category]');

    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show/hide sections
            sections.forEach(section => {
                if (filter === 'all' || section.dataset.category === filter) {
                    section.classList.remove('hidden-section');
                } else {
                    section.classList.add('hidden-section');
                }
            });

            // Scroll to first visible section
            const firstVisible = document.querySelector('.menu-page-section:not(.hidden-section)');
            if (firstVisible && filter !== 'all') {
                const offset = document.querySelector('.menu-filter-bar').offsetHeight + 70;
                const top = firstVisible.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
});
