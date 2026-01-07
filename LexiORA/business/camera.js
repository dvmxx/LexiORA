// camera permission and functionality

document.addEventListener('DOMContentLoaded', function() {
    // explorer screen - permission request
    const requestBtn = document.getElementById('requestCameraBtn');
    if (requestBtn) {
        requestBtn.addEventListener('click', requestCameraPermission);
    }

    // camera screen - start stream
    const cameraFeed = document.getElementById('cameraFeed');
    if (cameraFeed) {
        startCamera();
    }

    // camera screen - capture button
    const captureBtn = document.getElementById('captureBtn');
    if (captureBtn) {
        captureBtn.addEventListener('click', captureImage);
    }
});

// request camera permission
async function requestCameraPermission() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
        });

        // permission granted - stop stream and redirect
        stream.getTracks().forEach(track => track.stop());
        window.location.href = 'camera-screen.html';

    } catch (error) {
        alert('Camera access is required to use LexiORA. Please enable camera permissions in your browser settings.');
        console.error('Camera permission error:', error);
    }
}

// start camera stream
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'environment', // use back camera on mobile
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        });

        const videoElement = document.getElementById('cameraFeed');
        videoElement.srcObject = stream;

        console.log('Camera started successfully');

    } catch (error) {
        console.error('Error starting camera:', error);
        alert('Unable to access camera. Please check permissions.');
        // redirect back to explorer if camera fails
        window.location.href = 'explorer-screen.html';
    }
}

// capture image from camera
function captureImage() {
    const video = document.getElementById('cameraFeed');

    // create canvas to capture frame
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0);

    // convert to image data
    const imageData = canvas.toDataURL('image/jpeg');

    // TODO: send to COCO-SSD for object detection
    console.log('Image captured:', imageData.substring(0, 50) + '...');

    // for now - show success message
    alert('Image captured! Object detection coming soon.');

    // TODO: navigate to result screen with detected object
}