package coforge.car_seller.ollama;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class OllamaService {

    private final WebClient client;

    public OllamaService(@Value("${ollama.base-url:http://localhost:11434}") String baseUrl) {
        this.client = WebClient.create(baseUrl);
    }

    /** Blocking on purpose — this only runs during the one-time catalog
     *  seeding job at startup, not on any live request path. */
    @SuppressWarnings("unchecked")
    public float[] embed(String text) {
        Map<String, Object> body = Map.of("model", "nomic-embed-text", "input", text);

        Map<String, Object> response = client.post()
                .uri("/api/embed")
                .bodyValue(body)
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        List<List<Double>> embeddings = (List<List<Double>>) response.get("embeddings");
        List<Double> embedding = embeddings.get(0);

        float[] result = new float[embedding.size()];
        for (int i = 0; i < embedding.size(); i++) {
            result[i] = embedding.get(i).floatValue();
        }
        return result;
    }

    /** Blocking on purpose — called from a normal request-handling thread
     *  in ChatController, one request at a time, which is fine at
     *  hackathon-demo scale. */
    @SuppressWarnings("unchecked")
    public String chat(String systemPrompt, String userMessage) {
        List<Map<String, String>> messages = new ArrayList<>();
        if (systemPrompt != null && !systemPrompt.isBlank()) {
            messages.add(Map.of("role", "system", "content", systemPrompt));
        }
        messages.add(Map.of("role", "user", "content", userMessage));

        Map<String, Object> body = Map.of(
                "model", "llama3.2:3b",
                "messages", messages,
                "stream", false,
                "options", Map.of("num_predict", 40)
        );

        Map<String, Object> response = client.post()
                .uri("/api/chat")
                .bodyValue(body)
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        Map<String, Object> message = (Map<String, Object>) response.get("message");
        return (String) message.get("content");
    }
}