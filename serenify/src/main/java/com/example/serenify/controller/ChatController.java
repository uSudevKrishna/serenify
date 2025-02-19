package com.example.serenify.controller;

import com.example.serenify.model.ChatMessage;
import com.example.serenify.service.ChatbotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    private ChatbotService chatbotService;

    // Endpoint to handle user chat messages
    @PostMapping("/send")
    public ChatMessage sendMessage(@RequestBody ChatMessage message) {
        // Handle the user's chat message and get the chatbot's response
        return chatbotService.getChatbotResponse(message);
    }
}
