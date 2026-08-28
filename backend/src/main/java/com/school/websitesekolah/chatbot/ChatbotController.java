package com.school.websitesekolah.chatbot;

import com.school.websitesekolah.chatbot.dto.ChatRequest;
import com.school.websitesekolah.chatbot.dto.ChatResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Endpoint publik untuk fitur AI chatbot di website sekolah.
 * Tidak butuh login (lihat SecurityConfig: "/api/chatbot/**" di-permitAll).
 */
@RestController
@RequestMapping("/api/chatbot")
@RequiredArgsConstructor
public class ChatbotController {

    private final ChatbotService chatbotService;

    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> chat(@Valid @RequestBody ChatRequest request) {
        String reply = chatbotService.sendMessage(request.getMessage(), request.getHistory());
        return ResponseEntity.ok(new ChatResponse(reply));
    }
}
