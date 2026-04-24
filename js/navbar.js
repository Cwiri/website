document.addEventListener('DOMContentLoaded', () => {
    const placeholder = document.getElementById('navbar-placeholder');
    if (!placeholder) return;

    fetch('components/navbar.html')
        .then(response => response.text())
        .then(html => {
            placeholder.innerHTML = html;

            const nav         = placeholder.querySelector('nav');
            const hamburger   = placeholder.querySelector('.nav-hamburger');
            const navLinks    = placeholder.querySelector('.nav-links');
            const progressBar = document.getElementById('scroll-progress-bar');

            // ── Active page highlighting ──────────────────────────────────────
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            placeholder.querySelectorAll('.nav-links a').forEach(link => {
                const href = link.getAttribute('href');
                const linkPage = href.split('/').pop().split('#')[0];
                if (linkPage === currentPage) {
                    link.classList.add('active');
                }
            });

            // ── Scroll progress bar ──────────────────────────────────────────
            const updateScrollProgress = () => {
                if (!progressBar) return;
                const doc = document.documentElement;
                const maxScroll = doc.scrollHeight - window.innerHeight;
                const progress = maxScroll > 0 ? (window.scrollY / maxScroll) : 0;
                progressBar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
            };

            window.addEventListener('scroll', updateScrollProgress, { passive: true });
            window.addEventListener('resize', updateScrollProgress);
            updateScrollProgress();

            // ── Hamburger menu helpers ───────────────────────────────────────
            const MOBILE_BP = 860;

            const isMenuOpen = () => nav && nav.classList.contains('nav-open');

            const closeMenu = () => {
                if (!nav) return;
                nav.classList.remove('nav-open');
                if (hamburger) {
                    hamburger.setAttribute('aria-expanded', 'false');
                    hamburger.setAttribute('aria-label', 'Open navigation menu');
                }
            };

            const openMenu = () => {
                if (!nav) return;
                // Don't open if nav is hidden (user scrolled down)
                nav.classList.remove('nav-hidden');
                nav.classList.add('nav-open');
                if (hamburger) {
                    hamburger.setAttribute('aria-expanded', 'true');
                    hamburger.setAttribute('aria-label', 'Close navigation menu');
                }
            };

            // Hamburger button click
            if (hamburger) {
                hamburger.addEventListener('click', () => {
                    isMenuOpen() ? closeMenu() : openMenu();
                });
            }

            // Close on Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && isMenuOpen()) {
                    closeMenu();
                    if (hamburger) hamburger.focus();
                }
            });

            // Close on outside click/tap
            document.addEventListener('pointerdown', (e) => {
                if (isMenuOpen() && nav && !nav.contains(e.target)) {
                    closeMenu();
                }
            });

            // Close when a top-level nav link is followed (not submenu toggles)
            if (navLinks) {
                navLinks.addEventListener('click', (e) => {
                    const link = e.target.closest('a');
                    if (link && !link.closest('.submenu')) {
                        // Short delay so the click registers before menu closes
                        setTimeout(closeMenu, 80);
                    }
                });
            }

            // Reset menu state when viewport grows past mobile breakpoint
            window.addEventListener('resize', () => {
                if (window.innerWidth > MOBILE_BP) {
                    closeMenu();
                    // Always keep nav visible on desktop
                    if (nav) nav.classList.remove('nav-hidden');
                }
            });

            // ── Auto-hide nav on scroll (mobile only) ───────────────────────
            const SCROLL_SHOW_THRESHOLD  = 6;   // px delta needed to reveal
            const SCROLL_HIDE_THRESHOLD  = 6;   // px delta needed to hide
            const SCROLL_TOP_GRACE       = 80;  // never hide within 80px of top
            let lastScrollY = window.scrollY;
            let rafPending  = false;

            const handleScroll = () => {
                rafPending = false;

                // Auto-hide is only active on mobile
                if (!nav || window.innerWidth > MOBILE_BP) {
                    if (nav) nav.classList.remove('nav-hidden');
                    lastScrollY = window.scrollY;
                    return;
                }

                const currentY = window.scrollY;
                const delta    = currentY - lastScrollY;

                // Near top: always show
                if (currentY <= SCROLL_TOP_GRACE) {
                    nav.classList.remove('nav-hidden');
                    lastScrollY = currentY;
                    return;
                }

                if (delta > SCROLL_HIDE_THRESHOLD) {
                    // Scrolling down — hide nav and close menu
                    nav.classList.add('nav-hidden');
                    closeMenu();
                } else if (delta < -SCROLL_SHOW_THRESHOLD) {
                    // Scrolling up — reveal nav
                    nav.classList.remove('nav-hidden');
                }

                lastScrollY = currentY;
            };

            window.addEventListener('scroll', () => {
                if (!rafPending) {
                    rafPending = true;
                    requestAnimationFrame(handleScroll);
                }
            }, { passive: true });
        })
        .catch(err => {
            console.error('Navbar load error:', err);
        });
});
