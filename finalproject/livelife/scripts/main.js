
// Current year for footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Mobile navigation
const hamburgerBtn = document.getElementById('hamburgerBtn');
const primaryNav = document.getElementById('primaryNav');

if (hamburgerBtn && primaryNav) {
    hamburgerBtn.addEventListener('click', () => {
        primaryNav.classList.toggle('show');
        hamburgerBtn.innerHTML = primaryNav.classList.contains('show') ? '✕' : '&#9776;';
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('#primaryNav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (primaryNav.classList.contains('show')) {
            primaryNav.classList.remove('show');
            hamburgerBtn.innerHTML = '&#9776;';
        }
    });
});