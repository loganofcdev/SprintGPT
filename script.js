function sendMessage() {
    var userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;

    appendMessage("user", userInput);
    getUserResponse(userInput);
    document.getElementById("user-input").value = "";
}

function appendMessage(sender, message) {
    var chatBox = document.getElementById("chat-box");
    var chatBubble = document.createElement("div");
    chatBubble.classList.add("chat-bubble");
    if (sender === "user") {
        chatBubble.classList.add("user");
    } else {
        chatBubble.classList.add("bot");
    }
    chatBubble.textContent = message;
    chatBox.appendChild(chatBubble);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getUserResponse(userInput) {
    // Here you can add logic to process the user input and generate a response
    // For now, let's just echo the user's input
    var botResponse = "You said: " + userInput;
    setTimeout(function() {
        appendMessage("bot", botResponse);
    }, 1000);
}
