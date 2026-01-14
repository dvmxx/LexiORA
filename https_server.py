from flask import Flask, request, jsonify, send_from_directory
import ssl
import os
import numpy as np
from PIL import Image
import io
import cv2
import tensorflow.lite as tflite
from flask import render_template


HOST = "0.0.0.0"
PORT = 8000
CERT_FILE = 'server.pem'

# ML Configuration
TFLITE_MODEL_PATH = 'detect.tflite'
LABEL_PATH = 'coco_labels.txt'
MIN_CONFIDENCE = 0.50
INPUT_SIZE = (416, 416) # SSDMobileNetV2
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
LEXIORA_DIR = os.path.join(BASE_DIR, "LexiORA")

app = Flask(
    __name__,
    template_folder=os.path.join(LEXIORA_DIR, "templates"),
    static_folder=LEXIORA_DIR,
    static_url_path=""
)
INTERPRETER = None
LABELS = []

def load_ml_model():
    global INTERPRETER, LABELS

    if os.path.exists(LABEL_PATH):
        with open(LABEL_PATH, 'r') as f:
            LABELS = [line.strip() for line in f.readlines()]
        print(f"{len(LABELS)} loaded labels.")
    else:
        print(f"Error: Label-file {LABEL_PATH} not found.")
        return False

    if os.path.exists(TFLITE_MODEL_PATH):
        INTERPRETER = tflite.Interpreter(model_path=TFLITE_MODEL_PATH)
        INTERPRETER.allocate_tensors()
        print(f"TFLite-Model {TFLITE_MODEL_PATH} loaded.")
        return True
    else:
        print(f"Error: Model-file {TFLITE_MODEL_PATH} not found.")
        return False

def run_detection(image_data):
    if INTERPRETER is None:
        return []

    input_details = INTERPRETER.get_input_details()
    output_details = INTERPRETER.get_output_details()

    original_width, original_height = image_data.size

    image_resized = image_data.resize(INPUT_SIZE)
    input_data = np.asarray(image_resized).astype(np.uint8)
    input_data = np.expand_dims(input_data, axis=0)

    INTERPRETER.set_tensor(input_details[0]['index'], input_data)

    INTERPRETER.invoke()

    scores_tensor = INTERPRETER.get_tensor(output_details[0]['index'])[0] # Shape [18070, 81] (Scores/Classes)
    boxes_tensor_1 = INTERPRETER.get_tensor(output_details[1]['index'])[0] # Shape [18070, 4] (Bounding Boxes)
    boxes_tensor_2 = INTERPRETER.get_tensor(output_details[2]['index'])[0] # Shape [18070, 4] (Bounding Boxes)

    num_proposals = scores_tensor.shape[0] # 18070
    detections = []

    for i in range(num_proposals):
        class_scores = scores_tensor[i] #find class with highest score

        best_class_index_relative = np.argmax(class_scores[1:])

        class_id = best_class_index_relative + 1

        score = class_scores[class_id]

        if score > MIN_CONFIDENCE:
            box = boxes_tensor_1[i]

            ymin, xmin, ymax, xmax = box

            x1 = int(xmin * original_width)
            y1 = int(ymin * original_height)
            x2 = int(xmax * original_width)
            y2 = int(ymax * original_height)


            label = LABELS[class_id] if class_id < len(LABELS) else f"Not known ({class_id})"

            detections.append({
                'box': [x1, y1, x2, y2],
                'label': label,
                'score': float(score)
            })

    return detections

@app.route('/detect', methods=['POST'])
def detect_objects():
    if INTERPRETER is None:
        return jsonify({'error': 'ML-Modell not found. Servererror.'}), 500

    if 'image' not in request.files:
        return jsonify({'error': 'No image file found'}), 400

    file = request.files['image']

    try:
        image_data = file.read()
        image = Image.open(io.BytesIO(image_data)).convert("RGB")

        detections = run_detection(image)

        return jsonify({
            'status': 'success',
            'detections': detections
        })

    except Exception as e:
        print(f"Error at object recognition: {e}")
        return jsonify({'error': str(e)}), 500

@app.route("/")
def serve_root():
    return render_template("welcome-screen.html")

@app.route("/explorer-screen.html")
def explorer():
    return render_template("explorer-screen.html")

@app.route("/camera-screen.html")
def camera():
    return render_template("camera-screen.html")

@app.route("/collection-screen.html")
def collection():
    return render_template("collection-screen.html")

@app.route("/result-screen.html")
def result():
    return render_template("result-screen.html")

@app.route("/setting-screen.html")
def setting():
    return render_template("setting-screen.html")

if __name__ == '__main__':
    if not load_ml_model():
        print("Server start aborded,because no ML-Model found.")
    elif not os.path.exists(CERT_FILE):
        print(f"Error: Certificate file '{CERT_FILE}' not found. Please run openssl command.")
    else:
        context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
        try:
            context.load_cert_chain(CERT_FILE)
            print(f"Start Flask Server at https://{HOST}:{PORT}")

            app.run(host=HOST, port=PORT, ssl_context=context)

        except Exception as e:
            print(f"Could not start server: {e}")