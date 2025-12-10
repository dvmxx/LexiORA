// shared
console.log('Lexi ORA initialized');

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