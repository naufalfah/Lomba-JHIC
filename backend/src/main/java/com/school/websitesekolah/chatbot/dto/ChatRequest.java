package com.school.websitesekolah.chatbot.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Request body untuk POST /api/chatbot/chat.
 * "message"  -> pesan terbaru dari pengunjung
 * "history"  -> (opsional) riwayat percakapan sebelumnya, dikirim balik oleh
 *               frontend supaya chatbot punya konteks. Urutannya dari yang
 *               paling lama ke paling baru.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatRequest {

    @NotBlank(message = "Pesan tidak boleh kosong")
    private String message;

    private List<ChatMessageDto> history;
}
