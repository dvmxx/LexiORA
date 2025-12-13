// Camera permission

document.addEventListener('DOMContentLoaded', function() {
        // Only explorer screen
        const requestBtn = document.getElementById('requestCameraBtn');

        if (requestBtn) {
            requestBtn.addEventListener('click', requestCameraPermission);
        }
    });

async function requestCameraPermission() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });

        // Permission granted - stop stream and redirect
        stream.getTracks().forEach(track => track.stop());

        window.location.href = 'camera-screen.html';

    } catch (error) {
        alert('Camera access is required to use LexiORA. Please enable camera permissions in your browser settings.');
        console.error('Camera permission error:', error);
    }
}