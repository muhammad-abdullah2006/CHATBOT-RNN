````markdown
# 🧠 GK RNN Chatbot

A simple General Knowledge chatbot built using a Recurrent Neural Network.

The project uses TensorFlow and Keras to train a Simple RNN on a question and answer dataset.

## 🚀 Features

- Question and answer prediction
- Simple RNN architecture
- Word tokenization
- Word embeddings
- Streamlit web interface
- Saved trained model
- Easy to run locally

## 🧠 Model Architecture

The model uses:

Input Text
↓
Tokenization
↓
Embedding Layer
↓
Simple RNN
↓
Dense Layer
↓
Predicted Answer

## 🛠️ Technologies

- Python
- TensorFlow
- Keras
- NumPy
- Streamlit

## 📁 Project Structure

```text
RNN-GK-CHATBOT/
│
├── app.py
├── train.py
├── test.py
├── requirements.txt
├── README.md
├── 500 QnA.csv
│
├── rnn_gk_model.keras
├── question_word_index.npy
├── answer_word_index.npy
└── max_length.npy
````

## ⚙️ Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Open the project:

```bash
cd RNN-GK-CHATBOT
```

Install dependencies:

```bash
pip install -r requirements.txt
```

## ▶️ Run the Website

```bash
streamlit run app.py
```

The application will open in your browser.

## 🏋️ Train the Model

If you want to train the model again:

```bash
python train.py
```

This creates:

```text
rnn_gk_model.keras
question_word_index.npy
answer_word_index.npy
max_length.npy
```

## 🧪 Test the Model

You can also test the model from the terminal:

```bash
python test.py
```

Example:

```text
You: What is the capital of Afghanistan?

RNN: Kabul
```

## 📌 Project Goal

The goal of this project is to understand the basic workflow of an RNN:

1. Load text data
2. Tokenize text
3. Convert words into numbers
4. Train an RNN
5. Save the model
6. Load the model
7. Make predictions
8. Create a web interface

## ⚠️ Limitations

This is a beginner RNN project trained on a small dataset.

The model may produce incorrect answers for questions that are different from the training examples.

A larger dataset and a more advanced NLP architecture would improve the results.

## 👨‍💻 Author

Abdullah

```
```
