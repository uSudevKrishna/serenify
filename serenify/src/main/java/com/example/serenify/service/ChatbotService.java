package com.example.serenify.service;

import com.example.serenify.model.ChatMessage;
import com.theokanning.openai.service.OpenAiService;
import com.theokanning.openai.model.CompletionRequest;
import com.theokanning.openai.model.CompletionChoice;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ChatbotService {

    @Value("${api_key}")
    private String apiKey;

    private OpenAiService openAiService;
    
    public ChatbotService() {
        this.openAiService = new OpenAiService(apiKey);  // Initialize OpenAiService with the API key
    }

    public ChatMessage getChatbotResponse(ChatMessage message) {
        // Prepare the request using the user's message
        CompletionRequest completionRequest = CompletionRequest.builder()
            .prompt(message.getContent())  // User's message as the prompt
            .maxTokens(150)  // Limit the length of the response
            .temperature(0.7)  // Controls the randomness of the response
            .topP(1.0)  // Controls the diversity of the response
            .frequencyPenalty(0.0)  // Controls the frequency of repeated words
            .presencePenalty(0.0)  // Controls the frequency of new topics
            .build();

        // Send the request to OpenAI and get the response
        String response = openAiService.createCompletion("text-davinci-003", completionRequest).getChoices().get(0).getText();

        // Create a new ChatMessage with the chatbot's response
        ChatMessage responseMessage = new ChatMessage();
        responseMessage.setSender("Chatbot");
        responseMessage.setContent(response.trim());

        return responseMessage;
    }
}
