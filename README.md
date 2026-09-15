# RNN GK Chatbot

A simple General Knowledge (GK) question-answering chatbot powered by a Recurrent Neural Network (RNN). The model is trained to classify incoming questions and map them to the most likely answer from a fixed set of GK Q&A pairs. It includes a Flask backend for serving predictions and a lightweight HTML/CSS/JS frontend for chatting with the bot.

## Features

- Word-level RNN trained on 500 GK question-answer pairs
- Text preprocessing (cleaning, tokenization, padding) for consistent input to the model
- Flask API backend that loads the trained model and returns predicted answers
- Simple web-based chat interface
- Jupyter notebooks for training (`train.ipynb`) and testing (`test.ipynb`) the model

## Project Structure

```
RNN/
├── backend/
│   └── app.py                  # Flask server that loads the model and serves predictions
├── model/
│   ├── rnn_gk_model.keras      # Trained RNN model
│   ├── question_word_index.npy # Word-to-index mapping used to tokenize questions
│   ├── id_to_answer.npy        # Maps predicted class IDs back to answer text
│   └── max_length.npy          # Max sequence length used for padding
├── frontend/
│   ├── index.html              # Chat UI
│   ├── script.js               # Handles user input and API calls
│   └── style.css               # Styling for the chat interface
├── 500 QnA.csv                 # Dataset of 500 GK question-answer pairs
├── data.json                   # Q&A data in JSON format
├── train.ipynb                 # Notebook to preprocess data and train the RNN
├── test.ipynb                  # Notebook to load the trained model and test predictions
└── README.md
```

## How It Works

1. **Training** (`train.ipynb`)
   - Loads and cleans the 500 GK question-answer pairs.
   - Builds a word index from the questions and converts each question into a padded sequence of word IDs.
   - Treats each unique answer as a class label.
   - Trains an RNN (Embedding → RNN layer → Dense/softmax) to classify a question into its corresponding answer class.
   - Saves the trained model along with the word index, answer mapping, and max sequence length for later use.

2. **Inference** (`test.ipynb` / `backend/app.py`)
   - Takes a user's question as input.
   - Cleans and tokenizes it using the same word index from training.
   - Pads the sequence to match `max_length`.
   - Feeds it into the trained model to predict an answer class.
   - Maps the predicted class ID back to readable answer text using `id_to_answer`.

3. **Chat Interface**
   - The frontend sends the user's question to the Flask backend.
   - The backend returns the predicted answer, which is displayed in the chat window.

## Getting Started

Install dependencies:

```bash
pip install tensorflow flask numpy
```

### Running the Backend

```bash
cd backend
python app.py
```

The server will start and expose an endpoint the frontend can call with a user's question.

### Running the Frontend

Open `frontend/index.html` in your browser (or serve it via a simple local server), then start chatting with the bot.

### Retraining the Model

Open `train.ipynb` in Jupyter or VS Code, run all cells to reprocess `500 QnA.csv` and retrain the RNN. This will regenerate the files in `model/`.

### Testing the Model

Open `test.ipynb` to load the saved model and manually test it with sample questions.

## Dataset

`500 QnA.csv` contains 500 easy general knowledge question-answer pairs covering topics like geography, science, history, sports, and general facts. `data.json` provides the same data in JSON format for flexibility.

## Limitations

- The model treats each answer as a fixed class, so it can only return answers seen during training — it cannot generate novel answers or handle questions outside the dataset.
- With only 500 examples, the model's vocabulary and generalization are limited; performance will improve with a larger, more diverse dataset.
- Currently a classification-based approach rather than true free-form text generation.

## Possible Improvements

- Expand the dataset beyond 500 Q&A pairs.
- Replace the classification approach with a sequence-to-sequence (seq2seq) model for more flexible answer generation.
- Use LSTM/GRU layers instead of a plain RNN for better handling of longer questions.
- Add confidence thresholds so the bot can respond with "I don't know" for low-confidence predictions.

## License

This project is for educational purposes.
