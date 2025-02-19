package com.example.serenify;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @PostMapping("/message")
    public String getResponse(@RequestBody ChatRequest request) {
        // TODO: Call Python AI model (we'll implement this next)
        return "AI Response for: " + request.getContent();
    }
}

// Helper class to handle request body
class ChatRequest {
    private String content;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}

