import os
import string
import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.preprocessing.sequence import pad_sequences

app = Flask(__name__)
CORS(app)  # Enables requests from frontend (index.html)

# --- Helper: Text Normalization ---
def clean_text(text):
    text = text.lower()
    text = text.translate(str.maketrans("", "", string.punctuation))
    return text.strip()

# --- 1. Load Model & Dictionary Artifacts ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "..", "model") if os.path.exists(os.path.join(BASE_DIR, "..", "model")) else os.path.join(BASE_DIR, "model")

model = tf.keras.models.load_model(os.path.join(MODEL_DIR, "rnn_gk_model.keras"))
q_word_index = np.load(os.path.join(MODEL_DIR, "question_word_index.npy"), allow_pickle=True).item()
id_to_answer = np.load(os.path.join(MODEL_DIR, "id_to_answer.npy"), allow_pickle=True).item()
max_len_q = int(np.load(os.path.join(MODEL_DIR, "max_length.npy")))

# --- 2. API Endpoint ---
@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    user_question = data.get("question", "")

    if not user_question:
        return jsonify({"answer": "Please provide a valid question."})

    # Clean and tokenize incoming prompt
    cleaned_input = clean_text(user_question)
    words = cleaned_input.split()
    sequence = [q_word_index.get(w, q_word_index.get("<OOV>", 1)) for w in words]
    padded = pad_sequences([sequence], maxlen=max_len_q, padding="post")

    # Predict class probability array
    prediction = model.predict(padded, verbose=0)
    predicted_class_id = int(np.argmax(prediction[0]))

    # Lookup answer string by class ID
    answer_text = id_to_answer.get(predicted_class_id, "I don't know the answer.")

    return jsonify({"answer": answer_text})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
