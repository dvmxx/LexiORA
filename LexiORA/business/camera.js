let model = null;
let detectionInterval = null;
let currentDetections = [];

function setMobileViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setMobileViewportHeight);
window.addEventListener('orientationchange', setMobileViewportHeight);
setMobileViewportHeight();

document.addEventListener('DOMContentLoaded', function() {
    const requestBtn = document.getElementById('requestCameraBtn');
    if (requestBtn) {
        requestBtn.addEventListener('click', requestCameraPermission);
    }

    const cameraFeed = document.getElementById('cameraFeed');
    if (cameraFeed) {
        startCamera();
    }

    const captureBtn = document.getElementById('captureBtn');
    if (captureBtn) {
        captureBtn.addEventListener('click', captureImage);
    }
});

async function requestCameraPermission() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
        });

        stream.getTracks().forEach(track => track.stop());
        window.location.href = 'camera-screen.html';

    } catch (error) {
        alert('Camera access is required to use LexiORA. Please enable camera permissions in your browser settings.');
        console.error('Camera permission error:', error);
    }
}

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'environment',
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        });

        const videoElement = document.getElementById('cameraFeed');
        videoElement.srcObject = stream;

        console.log('Camera started successfully');

        videoElement.onloadedmetadata = async () => {
            await loadAIModel();
            startDetection();
        };

    } catch (error) {
        console.error('Error starting camera:', error);
        alert('Unable to access camera. Please check permissions.');
        window.location.href = 'explorer-screen.html';
    }
}

async function loadAIModel() {
    const hint = document.getElementById('cameraHint');
    hint.textContent = 'Loading AI model...';

    try {
        console.log('Loading COCO-SSD model...');
        model = await cocoSsd.load();
        console.log('COCO-SSD model loaded successfully');
        hint.textContent = 'Point at an object';
    } catch (error) {
        console.error('Error loading AI model:', error);
        hint.textContent = 'AI model failed to load';
    }
}

function startDetection() {
    if (!model) return;

    const video = document.getElementById('cameraFeed');
    detectionInterval = setInterval(async () => {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            await detectObjects(video);
        }
    }, 500);
}

async function detectObjects(video) {
    try {
        const predictions = await model.detect(video);
        currentDetections = predictions;
        displayDetections(predictions);
    } catch (error) {
        console.error('Detection error:', error);
    }
}

function displayDetections(predictions) {
    const labelsContainer = document.getElementById('detectionLabels');
    labelsContainer.innerHTML = '';

    if (predictions.length === 0) {
        document.getElementById('cameraHint').textContent = 'Point at an object';
        return;
    }

    const centerObject = findCenterObject(predictions);

    predictions.forEach((prediction, index) => {
        const isPrimary = prediction === centerObject;

        if (prediction.score < 0.6) return;

        const label = createDetectionLabel(prediction, isPrimary);
        labelsContainer.appendChild(label);
    });

    if (centerObject) {
        document.getElementById('cameraHint').textContent =
            `${centerObject.class} (${Math.round(centerObject.score * 100)}%)`;
    }
}

function findCenterObject(predictions) {
    const video = document.getElementById('cameraFeed');
    const centerX = video.offsetWidth / 2;
    const centerY = video.offsetHeight / 2;

    let closestObject = null;
    let minDistance = Infinity;

    predictions.forEach(pred => {
        const [x, y, width, height] = pred.bbox;
        const objectCenterX = x + width / 2;
        const objectCenterY = y + height / 2;

        const distance = Math.sqrt(
            Math.pow(objectCenterX - centerX, 2) +
            Math.pow(objectCenterY - centerY, 2)
        );

        if (distance < minDistance && pred.score > 0.6) {
            minDistance = distance;
            closestObject = pred;
        }
    });

    return closestObject;
}

function createDetectionLabel(prediction, isPrimary) {
    const label = document.createElement('div');
    label.className = isPrimary ? 'detection-label primary' : 'detection-label';

    const [x, y, width, height] = prediction.bbox;
    const video = document.getElementById('cameraFeed');

    let labelX = x + width / 2;
    let labelY = y;

    const labelWidth = 150;
    const labelHeight = 40;

    if (labelX < labelWidth / 2) labelX = labelWidth / 2;
    if (labelX > video.offsetWidth - labelWidth / 2) {
        labelX = video.offsetWidth - labelWidth / 2;
    }

    if (labelY < labelHeight) labelY = labelHeight;

    label.style.left = labelX + 'px';
    label.style.top = labelY + 'px';

    label.textContent = `${prediction.class} ${Math.round(prediction.score * 100)}%`;

    return label;
}

function captureImage() {
    const video = document.getElementById('cameraFeed');

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL('image/jpeg');

    const centerObject = findCenterObject(currentDetections);

    if (!centerObject) {
        alert('No object detected. Please point at an object and try again.');
        return;
    }

    console.log('Captured object:', centerObject.class, 'confidence:', centerObject.score);

    sessionStorage.setItem('capturedImage', imageData);
    sessionStorage.setItem('detectedObject', centerObject.class);

    if (detectionInterval) {
        clearInterval(detectionInterval);
    }

    window.location.href = 'result-screen.html';
}