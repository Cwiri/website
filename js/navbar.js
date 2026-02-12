document.addEventListener('DOMContentLoaded', () => {
    const placeholder = document.getElementById('navbar-placeholder');
    if (!placeholder) return;

    fetch('components/navbar.html')
        .then(response => response.text())
        .then(html => {
            placeholder.innerHTML = html;
        })
        .catch(err => {
            console.error('Navbar load error:', err);
        });
});
