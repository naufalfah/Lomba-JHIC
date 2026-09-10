package com.school.websitesekolah.chatbot;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.school.websitesekolah.chatbot.dto.ChatMessageDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.List;

/**
 * Service untuk AI chatbot website sekolah menggunakan OpenAI Chat Completions API.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ChatbotService {

    private static final String OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

    private final ObjectMapper objectMapper;

    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();

    @Value("${OPENAI_API_KEY:}")
    private String apiKey;

    @Value("${OPENAI_MODEL:gpt-4o-mini}")
    private String model;

    @Value("${OPENAI_MAX_TOKENS:1024}")
    private int maxTokens;

    @Value("${CHATBOT_SYSTEM_PROMPT:Kamu adalah asisten virtual di website sekolah ini. "
            + "Jawab pertanyaan pengunjung (siswa, orang tua, calon siswa) seputar sekolah "
            + "dengan ramah, singkat, dan dalam Bahasa Indonesia. Jika kamu tidak tahu jawaban "
            + "pastinya (misalnya data spesifik sekolah yang tidak kamu ketahui), sarankan "
            + "pengunjung menghubungi pihak sekolah langsung.}")
    private String systemPrompt;

    public String sendMessage(String userMessage, List<ChatMessageDto> history) {
        if (apiKey == null || apiKey.isBlank()) {
            throw new IllegalStateException(
                    "OPENAI_API_KEY belum diset. Set environment variable OPENAI_API_KEY " +
                    "sebelum menjalankan aplikasi supaya fitur chatbot bisa dipakai.");
        }

        String requestBody = buildRequestBody(userMessage, history);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(OPENAI_API_URL))
                .timeout(Duration.ofSeconds(30))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + apiKey)
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

        try {
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                log.error("OpenAI API error {}: {}", response.statusCode(), response.body());
                throw new IllegalStateException(
                        "Gagal menghubungi layanan chatbot (status " + response.statusCode() + ")");
            }

            return extractReplyText(response.body());
        } catch (java.io.IOException | InterruptedException ex) {
            Thread.currentThread().interrupt();
            log.error("Gagal memanggil OpenAI API", ex);
            throw new IllegalStateException("Gagal menghubungi layanan chatbot: " + ex.getMessage());
        }
    }

    private String buildRequestBody(String userMessage, List<ChatMessageDto> history) {
        ObjectNode root = objectMapper.createObjectNode();
        root.put("model", model);
        root.put("max_tokens", maxTokens);

        ArrayNode messages = root.putArray("messages");

        // Pada OpenAI API, System Prompt ditaruh di dalam array messages dengan role "system"
        ObjectNode systemNode = messages.addObject();
        systemNode.put("role", "system");
        systemNode.put("content", systemPrompt);

        if (history != null) {
            for (ChatMessageDto msg : history) {
                if (msg == null || msg.getRole() == null || msg.getContent() == null) {
                    continue;
                }
                ObjectNode node = messages.addObject();
                node.put("role", msg.getRole());
                node.put("content", msg.getContent());
            }
        }

        ObjectNode latest = messages.addObject();
        latest.put("role", "user");
        latest.put("content", userMessage);

        return root.toString();
    }

    private String extractReplyText(String responseBody) throws java.io.IOException {
        JsonNode root = objectMapper.readTree(responseBody);
        JsonNode choices = root.path("choices");

        if (choices.isArray() && !choices.isEmpty()) {
            JsonNode firstChoice = choices.get(0);
            String content = firstChoice.path("message").path("content").asText();
            if (!content.isBlank()) {
                return content;
            }
        }

        throw new IllegalStateException("Respons chatbot kosong / tidak terduga: " + responseBody);
    }
}