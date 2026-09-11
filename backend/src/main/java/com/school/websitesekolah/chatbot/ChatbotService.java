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
 * Service untuk AI chatbot website sekolah menggunakan Google Gemini REST API.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ChatbotService {

    private static final String GEMINI_API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/";

    private final ObjectMapper objectMapper;

    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();

    @Value("${GEMINI_API_KEY:}")
    private String apiKey;

    @Value("${GEMINI_MODEL:gemini-2.5-flash}")
    private String model;

    @Value("${GEMINI_MAX_TOKENS:1024}")
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
                    "GEMINI_API_KEY belum diset. Set environment variable GEMINI_API_KEY " +
                    "sebelum menjalankan aplikasi supaya fitur chatbot bisa dipakai.");
        }

        String requestUrl = GEMINI_API_BASE_URL + model + ":generateContent?key=" + apiKey;
        String requestBody = buildRequestBody(userMessage, history);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(requestUrl))
                .timeout(Duration.ofSeconds(30))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

        try {
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                log.error("Gemini API error {}: {}", response.statusCode(), response.body());
                throw new IllegalStateException(
                        "Gagal menghubungi layanan chatbot (status " + response.statusCode() + ")");
            }

            return extractReplyText(response.body());
        } catch (java.io.IOException | InterruptedException ex) {
            Thread.currentThread().interrupt();
            log.error("Gagal memanggil Gemini API", ex);
            throw new IllegalStateException("Gagal menghubungi layanan chatbot: " + ex.getMessage());
        }
    }

    private String buildRequestBody(String userMessage, List<ChatMessageDto> history) {
        ObjectNode root = objectMapper.createObjectNode();

        // 1. System Instruction untuk Gemini API
        ObjectNode systemInstructionNode = root.putObject("systemInstruction");
        ArrayNode systemParts = systemInstructionNode.putArray("parts");
        systemParts.addObject().put("text", systemPrompt);

        // 2. Generation Config (Max Output Tokens)
        ObjectNode genConfig = root.putObject("generationConfig");
        genConfig.put("maxOutputTokens", maxTokens);

        // 3. Conversation Contents
        ArrayNode contents = root.putArray("contents");

        if (history != null) {
            for (ChatMessageDto msg : history) {
                if (msg == null || msg.getRole() == null || msg.getContent() == null) {
                    continue;
                }
                ObjectNode contentNode = contents.addObject();
                // Map role OpenAI/Anthropic "assistant" -> "model" untuk Gemini
                String role = "assistant".equalsIgnoreCase(msg.getRole()) ? "model" : msg.getRole();
                contentNode.put("role", role);

                ArrayNode parts = contentNode.putArray("parts");
                parts.addObject().put("text", msg.getContent());
            }
        }

        // Tambahkan pesan user paling baru
        ObjectNode latestUserNode = contents.addObject();
        latestUserNode.put("role", "user");
        ArrayNode parts = latestUserNode.putArray("parts");
        parts.addObject().put("text", userMessage);

        return root.toString();
    }

    private String extractReplyText(String responseBody) throws java.io.IOException {
        JsonNode root = objectMapper.readTree(responseBody);
        JsonNode candidates = root.path("candidates");

        if (candidates.isArray() && !candidates.isEmpty()) {
            JsonNode firstCandidate = candidates.get(0);
            JsonNode parts = firstCandidate.path("content").path("parts");
            if (parts.isArray() && !parts.isEmpty()) {
                String text = parts.get(0).path("text").asText();
                if (!text.isBlank()) {
                    return text;
                }
            }
        }

        throw new IllegalStateException("Respons chatbot kosong / tidak terduga: " + responseBody);
    }
}