// shared
console.log('Lexi ORA initialized');

// initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
})

// nav initialization
function initNavigation() {
    // take a tour - button on welcome screen
    const tourBtn = document.getElementById('tourBtn');
    if (tourBtn) {
        tourBtn.addEventListener('click', function() {
            navigateTo('explorer-screen.html');
        });
    }

    // bottom nav icons
    const navIcons = document.querySelectorAll('.nav-icon');
    navIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            if (page) {
                navigateTo(page);
            }
        });
    });
}

// nav helper
function navigateTo(page) {
    window.location.href = page;
}

// success message
function showSuccess(message) {
    const banner = document.createElement('div');
    banner.className = 'success-banner';
    banner.textContent = message;
    document.body.appendChild(banner);

    setTimeout(() => {
        banner.remove();
    }, 3000);
}