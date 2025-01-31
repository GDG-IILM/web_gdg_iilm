// Include Marked.js for Markdown rendering
// Make sure you have added this in your HTML: <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>

// Theme Toggle Functionality
const themeToggler = document.getElementById("theme-toggler");
const body = document.body;

themeToggler.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    body.classList.toggle("light-mode");
    themeToggler.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// Chatbot Toggle Functionality
const openChatButton = document.getElementById("open-chat");
const closeChatButton = document.getElementById("close-chat");
const chatbotContainer = document.getElementById("chatbot-container");

openChatButton.addEventListener("click", () => {
    chatbotContainer.classList.remove("hidden");
});

closeChatButton.addEventListener("click", () => {
    chatbotContainer.classList.add("hidden");
});

// Chat Interaction
const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const sendMessageButton = document.getElementById("send-message");

let chatHistory = [];

// Send message and handle bot response
sendMessageButton.addEventListener("click", async () => {
    const message = userInput.value.trim();
    if (!message) return;

    // Display user message
    const userMessage = document.createElement("div");
    userMessage.className = "message user-message";
    userMessage.textContent = `You: ${message}`;
    chatMessages.appendChild(userMessage);

    // Create a container for the bot's response
    const botMessageContainer = document.createElement("div");
    botMessageContainer.className = "message bot-message";
    chatMessages.appendChild(botMessageContainer);

    // Add typing animation inside the bot's message container
    const typingIndicator = document.createElement("div");
    typingIndicator.className = "typing-indicator";
    typingIndicator.innerHTML = `<span>.</span><span>.</span><span>.</span>`;
    botMessageContainer.appendChild(typingIndicator);

    // Scroll to the bottom
    scrollToBottom();

    // Simulate a delay for the bot's response
    setTimeout(async () => {
        try {
            const response = await fetch("/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: message,
                    history: chatHistory,
                }),
            });

            const data = await response.json();
            const botMessage = data.response;

            // Update chat history
            chatHistory = data.history;

            // Remove typing animation and display bot response with animation
            botMessageContainer.innerHTML = ""; // Clear typing animation
            typeBotResponse(botMessageContainer, botMessage);
        } catch (error) {
            console.error("Error:", error);
            botMessageContainer.innerHTML = ""; // Clear typing animation
            botMessageContainer.textContent = "Bot: Something went wrong. Please try again.";
        }
    }, 1000); // Simulate delay

    // Clear input field
    userInput.value = "";
});

// Function to scroll to the bottom of the chat
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to animate bot response word by word and render Markdown
function typeBotResponse(element, text) {
    const words = text.split(" "); // Split the response into words
    let currentWordIndex = 0;
    element.innerHTML = ""; // Clear the element initially

    const typingInterval = setInterval(() => {
        if (currentWordIndex < words.length) {
            const nextWord = words[currentWordIndex];
            element.innerHTML += nextWord + " "; // Append the next word
            scrollToBottom(); // Ensure the user sees the latest word
            currentWordIndex++;
        } else {
            clearInterval(typingInterval); // Stop the interval when done
            // Use Marked.js to render Markdown after typing finishes
            const markdownRendered = marked.parse(text);
            element.innerHTML = markdownRendered;
        }
    }, 100); // Adjust typing speed (in milliseconds)
}

// Trigger send on Enter key press
userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault(); // Prevent newline insertion
        sendMessageButton.click(); // Trigger the send button
    }
});