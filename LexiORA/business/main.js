console.log('Lexi ORA initialized');

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
})

function initNavigation() {
    const tourBtn = document.getElementById('tourBtn');
    if (tourBtn) {
        tourBtn.addEventListener('click', function() {
            navigateTo('explorer-screen.html');
        });
    }

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

function navigateTo(page) {
    window.location.href = page;
}

function showSuccess(message) {
    const banner = document.createElement('div');
    banner.className = 'success-banner';
    banner.textContent = message;
    document.body.appendChild(banner);

    setTimeout(() => {
        banner.remove();
    }, 3000);
}