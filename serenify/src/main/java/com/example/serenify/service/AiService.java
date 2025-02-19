package com.example.serenify.service;

import com.theokanning.openai.completion.CompletionRequest;
import com.theokanning.openai.service.OpenAiService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AiService {

    @Value("${openai.api.key}")
    private String openaiApiKey;

    private OpenAiService openAiService;

    public AiService() {
        // Initialize OpenAiService with the API key
        this.openAiService = new OpenAiService(openaiApiKey);
    }

    /**
     * Generate a response from OpenAI's GPT model.
     *
     * @param prompt the prompt or user input for the AI model
     * @return the generated response from the model
     */
    public String generateResponse(String prompt) {
        // Create a request object with the prompt
        CompletionRequest completionRequest = CompletionRequest.builder()
                .prompt(prompt)
                .maxTokens(150) // Control the length of the response
                .temperature(0.7) // Control creativity of the model's output
                .build();

        // Get the completion result from OpenAI
        String response = openAiService.createCompletion(completionRequest)
                .getChoices()
                .get(0)
                .getText();

        return response.trim(); // Return the response text after trimming extra spaces
    }
}
