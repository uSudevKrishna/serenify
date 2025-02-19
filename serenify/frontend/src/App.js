// Function to initialize the chat and handle message sending
window.onload = function() {
    const sendButton = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const messagesContainer = document.getElementById('messages');

    // Function to send the message to the backend and get the response
    function sendMessage() {
        const messageContent = userInput.value.trim();

        if (messageContent === '') return;  // Don't send empty messages

        // Display the user's message
        addMessage(messageContent, 'user');

        // Clear the input field
        userInput.value = '';

        // Make a POST request to the backend to get chatbot's response
        fetch('http://localhost:8080/chat', {  // Adjust the URL according to your API endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: messageContent,
            }),
        })
        .then(response => response.json())
        .then(data => {
            // Add chatbot's response to the chat
            const chatbotMessage = data.content || "Sorry, I didn't understand that.";
            addMessage(chatbotMessage, 'chatbot');
        })
        .catch(error => {
            console.error('Error:', error);
            addMessage("Sorry, there was an error. Please try again later.", 'chatbot');
        });
    }

    // Function to add message to the chat container
    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = message;

        // Append the new message to the container
        messagesContainer.appendChild(messageElement);

        // Scroll the messages container to the bottom to show the latest message
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Event listener for the Send button
    sendButton.addEventListener('click', sendMessage);

    // Allow user to press "Enter" to send a message
    userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
};
