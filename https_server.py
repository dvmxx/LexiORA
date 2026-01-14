from flask import Flask, request, jsonify, send_from_directory
import ssl
import os
import numpy as np
from PIL import Image
import io
import cv2
import sys
from tflite_runtime import interpreter as tflite

# --- Configuration ---
HOST = "0.0.0.0"
PORT = 8000
CERT_FILE = 'server.pem'

# ML Configuration
TFLITE_MODEL_PATH = 'detect.tflite'
LABEL_PATH = 'coco_labels.txt'
MIN_CONFIDENCE = 0.50 # Mindestkonfidenz für die Erkennung
INPUT_SIZE = (416, 416) # Größe des Modells (SSDMobileNetV2)
# ---------------------

app = Flask(__name__, static_url_path='', static_folder='.')
INTERPRETER = None
LABELS = []

# --- Helper Functions for ML ---

def load_ml_model():
    """Lädt das TFLite-Modell und die Labels."""
    global INTERPRETER, LABELS

    # 1. Labels laden
    if os.path.exists(LABEL_PATH):
        with open(LABEL_PATH, 'r') as f:
            LABELS = [line.strip() for line in f.readlines()]
        print(f"✅ {len(LABELS)} Labels geladen.")
    else:
        print(f"❌ Fehler: Label-Datei {LABEL_PATH} nicht gefunden.")
        return False

    # 2. TFLite-Interpreter laden
    if os.path.exists(TFLITE_MODEL_PATH):
        # Initialisieren Sie den TFLite-Interpreter
        INTERPRETER = tflite.Interpreter(model_path=TFLITE_MODEL_PATH)
        INTERPRETER.allocate_tensors()
        print(f"✅ TFLite-Modell {TFLITE_MODEL_PATH} geladen.")
        return True
    else:
        print(f"❌ Fehler: Modell-Datei {TFLITE_MODEL_PATH} nicht gefunden.")
        return False

def run_detection(image_data):
    """Führt die Objekterkennung durch und gibt die Ergebnisse zurück."""
    if INTERPRETER is None:
        return []

    input_details = INTERPRETER.get_input_details()
    output_details = INTERPRETER.get_output_details()

    # Originalgröße speichern, um Bounding Boxes zu skalieren
    original_width, original_height = image_data.size

    # Bild vorverarbeiten
    image_resized = image_data.resize(INPUT_SIZE)
    # Bild in Numpy-Array konvertieren und normalisieren
    input_data = np.asarray(image_resized).astype(np.uint8)
    input_data = np.expand_dims(input_data, axis=0)

    # 1. Input-Tensor setzen
    INTERPRETER.set_tensor(input_details[0]['index'], input_data)

    # 2. Inferenz durchführen
    INTERPRETER.invoke()

    # 3. Output-Tensoren abrufen (Angepasst an die 3-Tensor-Struktur)

    # WARNUNG: Die Reihenfolge muss experimentell bestimmt werden,
    # aber dies ist die wahrscheinlichste Aufteilung für 3 Outputs:

    scores_tensor = INTERPRETER.get_tensor(output_details[0]['index'])[0] # Shape [18070, 81] (Scores/Classes)
    boxes_tensor_1 = INTERPRETER.get_tensor(output_details[1]['index'])[0] # Shape [18070, 4] (Bounding Boxes)
    boxes_tensor_2 = INTERPRETER.get_tensor(output_details[2]['index'])[0] # Shape [18070, 4] (Bounding Boxes)

    # Wir nehmen an, dass die Klassen-Scores und Boxen direkt aus den ersten beiden Tensoren kommen

    # Das Modell gibt die Konfidenzen für jede der 81 Klassen aus.
    # Wir müssen die Klasse mit dem höchsten Score und den Score selbst finden.
    # Wir verwenden den Tensor mit der Shape [18070, 81] als Basis.

    num_proposals = scores_tensor.shape[0] # 18070
    detections = []

    for i in range(num_proposals):
        # Klasse mit höchstem Score finden
        class_scores = scores_tensor[i]

        best_class_index_relative = np.argmax(class_scores[1:])

        class_id = best_class_index_relative + 1

        score = class_scores[class_id] # Der Score der besten Klasse (ab Index 1)

        # Nur wenn Score hoch genug ist
        if score > MIN_CONFIDENCE:
            # Wir müssen feststellen, welcher Box-Tensor der richtige ist.
            # Nehmen wir an, es ist Tensor 1 (output_details[1]).
            box = boxes_tensor_1[i]

            # Normalisierte Koordinaten [ymin, xmin, ymax, xmax] von 0 bis 1
            ymin, xmin, ymax, xmax = box

            # Skalierung auf Original-Pixelgröße
            x1 = int(xmin * original_width)
            y1 = int(ymin * original_height)
            x2 = int(xmax * original_width)
            y2 = int(ymax * original_height)

            # Label abrufen
            # Hinweis: Wir müssen Class_ID um 1 reduzieren, wenn die Klasse 0 der Hintergrund ist.
            # Wir verwenden hier class_id direkt:
            label = LABELS[class_id] if class_id < len(LABELS) else f"Unbekannt ({class_id})"

            detections.append({
                'box': [x1, y1, x2, y2], # Pixelkoordinaten
                'label': label,
                'score': float(score)
            })

    return detections

# =========================================================================
# API-Endpunkt für die Objekterkennung (Aktualisiert)
# =========================================================================
@app.route('/detect', methods=['POST'])
def detect_objects():
    if INTERPRETER is None:
        return jsonify({'error': 'ML-Modell nicht geladen. Serverfehler.'}), 500

    if 'image' not in request.files:
        return jsonify({'error': 'No image file found'}), 400

    file = request.files['image']

    try:
        # 1. Bilddaten lesen und als PIL-Image konvertieren
        image_data = file.read()
        image = Image.open(io.BytesIO(image_data)).convert("RGB")

        # 2. Objekterkennung durchführen
        detections = run_detection(image)

        # 3. Ergebnisse senden (Die Bounding Boxes sind jetzt Pixelwerte)
        return jsonify({
            'status': 'success',
            'detections': detections
        })

    except Exception as e:
        print(f"Fehler bei der Objekterkennung: {e}")
        return jsonify({'error': str(e)}), 500

# =========================================================================
# Dateiserver-Endpunkt (unverändert)
# =========================================================================
@app.route('/welcome-screen.html')
def serve_static(filename):
    # Dient statische Dateien (wie welcome-page.html, style/stylesheet.css, business/main.js etc.)
    return send_from_directory(os.getcwd(), filename)

@app.route('/')
def serve_root():
    # Leitet den Hauptpfad zur Welcome-Seite um (wie besprochen)
    return send_from_directory(os.getcwd(), 'welcome-page.html')

# =========================================================================
# Server starten mit HTTPS-Kontext
# =========================================================================
if __name__ == '__main__':
    # Initialisiere das ML-Modell beim Serverstart
    if not load_ml_model():
        print("🔴 Serverstart abgebrochen, da das ML-Modell nicht geladen werden konnte.")
    elif not os.path.exists(CERT_FILE):
        print(f"❌ Error: Certificate file '{CERT_FILE}' not found. Please run openssl command.")
    else:
        # SSL-Kontext für HTTPS
        context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
        try:
            context.load_cert_chain(CERT_FILE)
            print(f"✅ Starte Flask Server auf https://{HOST}:{PORT}")

            if (sys.argv[1] == 'insecure'):
                print("Starte HTTP-Server (ohne HTTPS).")
                app.run(host=HOST, port=PORT)
            else:
                # Flask mit HTTPS-Kontext starten
                app.run(host=HOST, port=PORT, ssl_context=context)


        except Exception as e:
            print(f"Fehler beim Starten des Servers: {e}")