// camera permission and functionality with AI object detection

let model = null; // COCO-SSD model
let detectionInterval = null;
let currentDetections = [];

// fix mobile viewport height
function setMobileViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// update on resize and orientation change
window.addEventListener('resize', setMobileViewportHeight);
window.addEventListener('orientationchange', setMobileViewportHeight);
setMobileViewportHeight(); // set initial value

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

        // wait for video to load, then start AI detection
        videoElement.onloadedmetadata = async () => {
            await loadAIModel();
            startDetection();
        };

    } catch (error) {
        console.error('Error starting camera:', error);
        alert('Unable to access camera. Please check permissions.');
        // redirect back to explorer if camera fails
        window.location.href = 'explorer-screen.html';
    }
}

// load COCO-SSD model
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

// start continuous object detection
function startDetection() {
    if (!model) return;

    const video = document.getElementById('cameraFeed');

    // run detection every 500ms
    detectionInterval = setInterval(async () => {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            await detectObjects(video);
        }
    }, 500);
}

// detect objects in video frame
async function detectObjects(video) {
    try {
        const predictions = await model.detect(video);
        currentDetections = predictions;
        displayDetections(predictions);
    } catch (error) {
        console.error('Detection error:', error);
    }
}

// display detection labels on screen
function displayDetections(predictions) {
    const labelsContainer = document.getElementById('detectionLabels');
    labelsContainer.innerHTML = ''; // clear previous labels

    if (predictions.length === 0) {
        document.getElementById('cameraHint').textContent = 'Point at an object';
        return;
    }

    // find object closest to center (inside AR frame)
    const centerObject = findCenterObject(predictions);

    predictions.forEach((prediction, index) => {
        const isPrimary = prediction === centerObject;

        // only show label if confidence > 60%
        if (prediction.score < 0.6) return;

        const label = createDetectionLabel(prediction, isPrimary);
        labelsContainer.appendChild(label);
    });

    // update hint with center object
    if (centerObject) {
        document.getElementById('cameraHint').textContent =
            `${centerObject.class} (${Math.round(centerObject.score * 100)}%)`;
    }
}

// find object closest to center of AR frame
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

// create label element for detection
function createDetectionLabel(prediction, isPrimary) {
    const label = document.createElement('div');
    label.className = isPrimary ? 'detection-label primary' : 'detection-label';

    const [x, y, width, height] = prediction.bbox;
    const video = document.getElementById('cameraFeed');

    // calculate position (center top of bounding box)
    let labelX = x + width / 2;
    let labelY = y;

    // keep label within screen bounds
    const labelWidth = 150; // approximate label width
    const labelHeight = 40; // approximate label height

    // constrain X position
    if (labelX < labelWidth / 2) labelX = labelWidth / 2;
    if (labelX > video.offsetWidth - labelWidth / 2) {
        labelX = video.offsetWidth - labelWidth / 2;
    }

    // constrain Y position
    if (labelY < labelHeight) labelY = labelHeight;

    // position label
    label.style.left = labelX + 'px';
    label.style.top = labelY + 'px';

    // show class name and confidence
    label.textContent = `${prediction.class} ${Math.round(prediction.score * 100)}%`;

    return label;
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

    // get center object (most likely what user wants)
    const centerObject = findCenterObject(currentDetections);

    if (!centerObject) {
        alert('No object detected. Please point at an object and try again.');
        return;
    }

    console.log('Captured object:', centerObject.class, 'confidence:', centerObject.score);

    // store in sessionStorage
    sessionStorage.setItem('capturedImage', imageData);
    sessionStorage.setItem('detectedObject', centerObject.class);

    // stop detection
    if (detectionInterval) {
        clearInterval(detectionInterval);
    }

    // navigate to result screen
    window.location.href = 'result-screen.html';
}