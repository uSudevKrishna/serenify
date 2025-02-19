// Select DOM elements
const messagesContainer = document.getElementById('messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-btn');

// Event listener for the send button
sendButton.addEventListener('click', () => {
    const userMessage = userInput.value.trim(); // Get the user input

    if (userMessage) {
        // Display the user's message
        appendMessage(userMessage, 'user');
        
        // Clear the input field
        userInput.value = '';
        
        // Call the backend to get the chatbot's response
        getChatbotResponse(userMessage);
    }
});

// Event listener for pressing 'Enter' in the input field
userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});

// Function to display a message in the chat window
function appendMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(sender); // Add the sender class (user/chatbot)

    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);

    // Scroll to the bottom of the chat window to show the latest message
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Function to get the chatbot's response from the backend
function getChatbotResponse(userMessage) {
    // Display a loading message while waiting for the chatbot's response
    appendMessage('...', 'chatbot');

    // Fetch the chatbot response from the backend API (you need to adjust this URL)
    fetch('http://localhost:8080/chatbot', {  // Replace with your API endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: userMessage }),  // Send user message to the backend
    })
    .then(response => response.json())
    .then(data => {
        const chatbotMessage = data.content; // Get chatbot's response from backend
        // Remove the loading message and show the chatbot's actual response
        const loadingMessage = messagesContainer.querySelector('.message.chatbot');
        if (loadingMessage) {
            loadingMessage.remove();
        }
        
        appendMessage(chatbotMessage, 'chatbot');
    })
    .catch(error => {
        console.error('Error fetching chatbot response:', error);
        appendMessage('Sorry, something went wrong. Please try again later.', 'chatbot');
    });
}
