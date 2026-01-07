// camera permission and functionality

const SERVER_URL = 'https://10.207.6.219:8000/detect'; // HIER IHRE IP ANPASSEN!
const DETECTION_INTERVAL = 1000; // Sende alle 1 Sekunde einen Frame

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

        videoElement.onloadedmetadata = () => {
            videoElement.play();
            document.getElementById('status').textContent = "Kamera aktiv. Starte Live-Erkennung...";
            // Sobald das Video geladen ist, starten wir die Erkennungsschleife
            setTimeout(detectionLoop, 1000);
        };

        console.log('Camera started successfully');

    } catch (error) {
        console.error('Error starting camera:', error);
        alert('Unable to access camera. Please check permissions.');
        // redirect back to explorer if camera fails
        window.location.href = 'explorer-screen.html';
    }
}

function detectionLoop() {
    captureAndSendFrame()
        .then(() => {
            // Nach erfolgreicher Verarbeitung (oder Fehler) die Schleife neu starten
            setTimeout(detectionLoop, DETECTION_INTERVAL);
        })
        .catch(error => {
            // Logik bei Fehler, Schleife wird trotzdem fortgesetzt
            console.error("Fehler in der Erkennungsschleife:", error);
            setTimeout(detectionLoop, DETECTION_INTERVAL);
        });
}

async function captureAndSendFrame() {
    const video = document.getElementById('cameraFeed');
    const canvas = document.getElementById('frameCanvas');
    const context = canvas.getContext('2d');
    const statusElement = document.getElementById('status');
    const overlayElement = document.getElementById('detectionOverlay');

    if (video.readyState < 2) { // 2 = HAVE_CURRENT_DATA
        statusElement.textContent = "Warte auf Video-Daten...";
        return Promise.reject("Video not ready");
    }

    // Canvas für Frame-Erfassung vorbereiten
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    statusElement.textContent = "Sende Frame an Server...";
    overlayElement.textContent = ""; // Overlay temporär leeren

    return new Promise((resolve, reject) => {
        // Konvertiere das Canvas-Bild in einen Blob (JPEG)
        canvas.toBlob(async (blob) => {
            if (!blob) return reject("Blob-Konvertierungsfehler");

            const formData = new FormData();
            formData.append('image', blob, 'frame.jpg');

            try {
                const response = await fetch(SERVER_URL, {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error(`HTTP Fehler! Status: ${response.status}`);
                }

                const result = await response.json();
                processServerResults(result);
                resolve();

            } catch (error) {
                statusElement.textContent = `Netzwerkfehler: ${error.message}`;
                reject(error);
            }
        }, 'image/jpeg', 0.7); // 0.7 ist die JPEG-Qualität
    });
}

function processServerResults(result) {
    const statusElement = document.getElementById('status');
    const overlayElement = document.getElementById('detectionOverlay');
    const videoElement = document.getElementById('cameraFeed');

    if (videoElement.readyState < 2) {
        statusElement.textContent = "Warte auf Video-Daten für Skalierung...";
        return;
    }

    if (result.status === 'success' && result.detections && result.detections.length > 0) {
        // Wir nehmen das erste erkannte Objekt
        const detection = result.detections[0];
        const [x1, y1, x2, y2] = detection.box; // Pixelkoordinaten vom Server

        statusElement.textContent = `Erkannt: ${detection.label} (${(detection.score * 100).toFixed(1)}%)`;

        // 1. Hole die tatsächliche Größe des Video-Elements auf dem Bildschirm
        const videoRect = videoElement.getBoundingClientRect();

        // 2. Hole die Original-Auflösung des Videos, wie es an den Server gesendet wurde (ca. 1280x720)
        const videoWidth = videoElement.videoWidth;
        const videoHeight = videoElement.videoHeight;

        // 3. Skaliere die vom Server gelieferten Pixelkoordinaten (z.B. 1280x720)
        // auf die Anzeigegröße des Browsers (z.B. 375x667).

        // Berechne die prozentuale Position des Mittelpunkts des Objekts
        const centerX = (x1 + x2) / 2;
        const centerY = (y1 + y2) / 2;

        // Skalierung: Original-Pixel / Original-Breite * Display-Breite
        const displayX = (centerX / videoWidth) * videoRect.width;
        const displayY = (centerY / videoHeight) * videoRect.height;

        // --- POSITIONIERUNG ---
        overlayElement.textContent = `${detection.label}`;
        overlayElement.style.display = 'block';

        // Setze die absolute Position relativ zum .camera-container
        // Die Positionierung muss den Transform-Ursprung (.detection-overlay) berücksichtigen.
        overlayElement.style.left = `${displayX}px`;
        overlayElement.style.top = `${displayY}px`;

    } else {
        statusElement.textContent = "Keine relevanten Objekte erkannt.";
        overlayElement.textContent = "";
        overlayElement.style.display = 'none';
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

    //for testing - sessionStorage
    sessionStorage.setItem('capturedImage', imageData);
    sessionStorage.setItem('detectedObject', 'cup'); //will be from COCO-SSD in the future

    // for now - show success message
    alert('Image captured! Object detection coming soon.');

    // navigate to result screen
    window.location.href = 'result-screen.html'
}