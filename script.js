// Wait for the DOM content to load
document.addEventListener("DOMContentLoaded", function () {
    // Get the input field
    var userInputField = document.getElementById("user-input");

    // Add event listener for keypress event
    userInputField.addEventListener("keypress", function (event) {
        // Check if the pressed key is Enter (key code 13)
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});

async function sendMessage() {
    var userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;

    appendMessage("user", userInput);
    try {
        var botResponse = await getBotResponse(userInput);
        appendMessage("bot", botResponse);
    } catch (error) {
        console.error("Error fetching bot response:", error);
        appendMessage("bot", "Sorry, I couldn't understand that.");
    }
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

async function getBotResponse(userInput) {
    var apiKey = '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';
    var apiUrl = 'https://api.openai.com/v1/completions';
    var response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
        },
        body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: userInput,
            max_tokens: 100
        })
    });
    if (!response.ok) {
        throw new Error('Failed to fetch bot response');
    }
    var data = await response.json();
    if (!data.choices || data.choices.length === 0) {
        throw new Error('Empty response from bot');
    }
    return data.choices[0].text.trim();
}
