// Ensure DOM is fully loaded before executing scripts
document.addEventListener("DOMContentLoaded", function () {

    // Theme Toggle Functionality
    // const themeToggler = document.getElementById("theme-toggler");
    // const body = document.body;

    // if (themeToggler) {
    //     themeToggler.addEventListener("click", () => {
    //         body.classList.toggle("dark-mode");
    //         body.classList.toggle("light-mode");
    //         themeToggler.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
    //     });
    // }

    // Chatbot Toggle Functionality
    const openChatButton = document.getElementById("open-chat"); // Icon to open chatbot
    const closeChatButton = document.getElementById("close-chat");
    const chatbotContainer = document.getElementById("chatbot-container");

    if (openChatButton && chatbotContainer) {
        openChatButton.addEventListener("click", () => {
            chatbotContainer.classList.toggle("hidden"); // Toggle visibility
        });
    }

    if (closeChatButton && chatbotContainer) {
        closeChatButton.addEventListener("click", () => {
            chatbotContainer.classList.add("hidden"); // Hide chat on close
        });
    }

    // Chat Interaction
    const chatMessages = document.getElementById("chat-messages");
    const userInput = document.getElementById("user-input");
    const sendMessageButton = document.getElementById("send-message");

    let chatHistory = [];

    // Function to send a message
    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        // Display user message
        appendMessage("You", message, "user-message");

        // Create a container for the bot's response
        const botMessageContainer = appendMessage("Bot", "typing...", "bot-message", true);

        // Simulate a delay for the bot's response
        try {
            const response = await fetch("http://127.0.0.1:5000/chat", {
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

            // Remove typing animation and display bot response
            botMessageContainer.innerHTML = "";
            typeBotResponse(botMessageContainer, botMessage);
        } catch (error) {
            console.error("Error:", error);
            botMessageContainer.innerHTML = "Bot: Something went wrong. Please try again.";
        }

        // Clear input field
        userInput.value = "";
    }

    // Function to append a message to the chat
    function appendMessage(sender, text, className, isTyping = false) {
        const messageDiv = document.createElement("div");
        messageDiv.className = `message ${className}`;
        messageDiv.textContent = isTyping ? text : `${sender}: ${text}`;
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
        return messageDiv;
    }

    // Function to scroll to the bottom of the chat
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to animate bot response and render Markdown
    function typeBotResponse(element, text) {
        const words = text.split(" ");
        let currentWordIndex = 0;
        element.innerHTML = "";

        const typingInterval = setInterval(() => {
            if (currentWordIndex < words.length) {
                element.innerHTML += words[currentWordIndex] + " ";
                scrollToBottom();
                currentWordIndex++;
            } else {
                clearInterval(typingInterval);
                element.innerHTML = marked.parse(text);
            }
        }, 100);
    }

    // Trigger send on Enter key press
    if (userInput && sendMessageButton) {
        userInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                sendMessage();
            }
        });

        sendMessageButton.addEventListener("click", sendMessage);
    }
});
