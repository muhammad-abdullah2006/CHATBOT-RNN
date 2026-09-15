const API_URL = "http://127.0.0.1:5000/ask";

function handleKeyPress(event) {
    if (event.key === "Enter") {
        askQuestion();
    }
}

function useSample(element) {
    document.getElementById("question").value = element.innerText;
    askQuestion();
}

async function askQuestion() {
    const inputField = document.getElementById("question");
    const answerBox = document.getElementById("answerBox");
    const questionText = inputField.value.trim();

    if (!questionText) return;

    // Append User Message to history
    appendMessage(questionText, "user");
    inputField.value = "";

    // Set loading indicator
    answerBox.innerText = "Thinking...";
    const loadingId = appendMessage("Thinking...", "bot");

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: questionText })
        });

        const data = await response.json();
        const outputAnswer = data.answer || "I don't know the answer.";

        // Update both chat bubble and dedicated Answer Box
        updateMessage(loadingId, outputAnswer);
        answerBox.innerText = outputAnswer;
    } catch (error) {
        const errorMsg = "Error connecting to Flask backend.";
        updateMessage(loadingId, errorMsg);
        answerBox.innerText = errorMsg;
    }
}

function appendMessage(text, sender) {
    const chatHistory = document.getElementById("chatHistory");
    const msgId = "msg-" + Date.now();

    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", `${sender}-message`);

    const avatarIcon = sender === "user" ? '<i class="fa-solid fa-user"></i>' : '<i class="fa-solid fa-robot"></i>';

    msgDiv.innerHTML = `
        <div class="msg-avatar">${avatarIcon}</div>
        <div class="msg-bubble" id="${msgId}">${text}</div>
    `;

    chatHistory.appendChild(msgDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;

    return msgId;
}

function updateMessage(msgId, newText) {
    const msgBubble = document.getElementById(msgId);
    if (msgBubble) {
        msgBubble.innerText = newText;
    }
}