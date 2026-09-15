const API_URL = "https://curtsy-sighing-sleet.ngrok-free.dev/ask";

async function askQuestion() {
    const inputField = document.getElementById("question");
    const answerBox = document.getElementById("answerBox");
    const questionText = inputField.value.trim();

    if (!questionText) return;

    appendMessage(questionText, "user");
    inputField.value = "";

    answerBox.innerText = "Thinking...";
    const loadingId = appendMessage("Thinking...", "bot");

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true"
            },
            body: JSON.stringify({ question: questionText })
        });

        const data = await response.json();
        const outputAnswer = data.answer || "I don't know the answer.";

        updateMessage(loadingId, outputAnswer);
        answerBox.innerText = outputAnswer;
    } catch (error) {
        const errorMsg = "Error connecting to Flask backend.";
        updateMessage(loadingId, errorMsg);
        answerBox.innerText = errorMsg;
    }
}