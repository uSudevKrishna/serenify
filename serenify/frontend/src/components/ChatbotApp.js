$(document).ready(function() {
    // Function to display a message in the chatbox
    function displayMessage(sender, message) {
        const messageElement = $('<div class="message"></div>');
        messageElement.addClass(sender); // Add sender class (user or chatbot)
        messageElement.text(message); // Set the message text
        $('#messages').append(messageElement); // Append to the message container
        scrollToBottom(); // Scroll to the bottom to show the latest message
    }

    // Function to scroll the chat window to the bottom
    function scrollToBottom() {
        const messagesDiv = $('#messages');
        messagesDiv.scrollTop(messagesDiv[0].scrollHeight);
    }

    // Handle Send button click
    $('#send-btn').click(function() {
        const userMessage = $('#user-input').val().trim();
        if (userMessage) {
            // Display user's message
            displayMessage('user', userMessage);
            $('#user-input').val(''); // Clear the input field

            // Send the message to the backend and get the chatbot's response
            $.ajax({
                url: 'http://localhost:8080/chat',  // Backend endpoint to send the message
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ content: userMessage }),
                success: function(response) {
                    // Display chatbot response
                    displayMessage('chatbot', response.content);
                },
                error: function() {
                    // Handle errors (e.g., server not responding)
                    displayMessage('chatbot', 'Oops, something went wrong! Please try again later.');
                }
            });
        }
    });

    // Handle Enter key to send message
    $('#user-input').keypress(function(event) {
        if (event.which === 13) { // Enter key
            $('#send-btn').click(); // Trigger Send button click
        }
    });

    // Initialize the chat with a greeting message (optional)
    displayMessage('chatbot', 'Hello! How can I assist you today?');
});
