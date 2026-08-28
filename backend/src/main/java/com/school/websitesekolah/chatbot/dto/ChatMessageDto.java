package com.school.websitesekolah.chatbot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Satu pesan dalam riwayat percakapan chatbot.
 * role: "user" atau "assistant"
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageDto {
    private String role;
    private String content;
}
