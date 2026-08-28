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
 * Service mandiri untuk fitur AI chatbot website sekolah.
 * Memanggil Anthropic Messages API (https://api.anthropic.com/v1/messages)
 * memakai java.net.http.HttpClient bawaan JDK, jadi tidak perlu tambahan
 * dependency apa pun di pom.xml.
 *
 * Konfigurasi (lewat environment variable, tidak wajib ada di
 * application.properties):
 *   ANTHROPIC_API_KEY   -> API key Anthropic kamu (WAJIB diisi)
 *   ANTHROPIC_MODEL     -> default: claude-sonnet-5
 *   ANTHROPIC_MAX_TOKENS-> default: 1024
 *   CHATBOT_SYSTEM_PROMPT -> instruksi peran chatbot, ada default bawaan
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ChatbotService {

    private static final String ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
    private static final String ANTHROPIC_VERSION = "2023-06-01";

    private final ObjectMapper objectMapper;

    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();

    @Value("${ANTHROPIC_API_KEY:}")
    private String apiKey;

    @Value("${ANTHROPIC_MODEL:claude-sonnet-5}")
    private String model;

    @Value("${ANTHROPIC_MAX_TOKENS:1024}")
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
                    "ANTHROPIC_API_KEY belum diset. Set environment variable ANTHROPIC_API_KEY " +
                    "sebelum menjalankan aplikasi supaya fitur chatbot bisa dipakai.");
        }

        String requestBody = buildRequestBody(userMessage, history);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(ANTHROPIC_API_URL))
                .timeout(Duration.ofSeconds(30))
                .header("Content-Type", "application/json")
                .header("x-api-key", apiKey)
                .header("anthropic-version", ANTHROPIC_VERSION)
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

        try {
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                log.error("Anthropic API error {}: {}", response.statusCode(), response.body());
                throw new IllegalStateException(
                        "Gagal menghubungi layanan chatbot (status " + response.statusCode() + ")");
            }

            return extractReplyText(response.body());
        } catch (java.io.IOException | InterruptedException ex) {
            Thread.currentThread().interrupt();
            log.error("Gagal memanggil Anthropic API", ex);
            throw new IllegalStateException("Gagal menghubungi layanan chatbot: " + ex.getMessage());
        }
    }

    private String buildRequestBody(String userMessage, List<ChatMessageDto> history) {
        ObjectNode root = objectMapper.createObjectNode();
        root.put("model", model);
        root.put("max_tokens", maxTokens);
        root.put("system", systemPrompt);

        ArrayNode messages = root.putArray("messages");

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
        JsonNode contentArray = root.path("content");

        StringBuilder reply = new StringBuilder();
        if (contentArray.isArray()) {
            for (JsonNode block : contentArray) {
                if ("text".equals(block.path("type").asText())) {
                    reply.append(block.path("text").asText());
                }
            }
        }

        if (reply.isEmpty()) {
            throw new IllegalStateException("Respons chatbot kosong / tidak terduga: " + responseBody);
        }

        return reply.toString();
    }
}
