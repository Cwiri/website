document.addEventListener('DOMContentLoaded', () => {
    const placeholder = document.getElementById('navbar-placeholder');
    if (!placeholder) return;

    fetch('components/navbar.html')
        .then(response => response.text())
        .then(html => {
            placeholder.innerHTML = html;

            // Highlight the nav link matching the current page
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            placeholder.querySelectorAll('.nav-links a').forEach(link => {
                const href = link.getAttribute('href');
                const linkPage = href.split('/').pop().split('#')[0];
                if (linkPage === currentPage) {
                    link.classList.add('active');
                }
            });

            const progressBar = document.getElementById('scroll-progress-bar');
            if (!progressBar) return;

            const updateScrollProgress = () => {
                const doc = document.documentElement;
                const maxScroll = doc.scrollHeight - window.innerHeight;
                const progress = maxScroll > 0 ? (window.scrollY / maxScroll) : 0;
                progressBar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
            };

            window.addEventListener('scroll', updateScrollProgress, { passive: true });
            window.addEventListener('resize', updateScrollProgress);
            updateScrollProgress();
        })
        .catch(err => {
            console.error('Navbar load error:', err);
        });
});
