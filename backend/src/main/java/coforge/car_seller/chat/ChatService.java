package coforge.car_seller.chat;

import coforge.car_seller.ollama.OllamaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    private static final Logger log = LoggerFactory.getLogger(ChatService.class);

    private final OllamaService ollamaService;

    public ChatService(OllamaService ollamaService) {
        this.ollamaService = ollamaService;
    }

    public String reply(ChatRequest request) {
        log.info("Processing chat message via Ollama (llama3.2:3b)...");
        long start = System.currentTimeMillis();

        String systemPrompt = buildSystemPrompt(request.context());
        String reply = ollamaService.chat(systemPrompt, request.message());

        log.info("Ollama responded in {}ms", System.currentTimeMillis() - start);
        return reply;
    }

    /** Round 3 scope: context is accepted but not yet used to personalize
     *  the prompt with real car details. Once wired up, this should look
     *  up the cars by ID (via VehicleRepository) and describe them here
     *  so the assistant can actually discuss the customer's shortlist. */
    private String buildSystemPrompt(ChatRequest.ChatContext context) {
        String base = "You are a friendly car-buying assistant helping a customer "
                + "explore vehicle options. Keep replies short and conversational.";

        if (context == null || context.shortlistCarIds() == null || context.shortlistCarIds().isEmpty()) {
            return base;
        }

        return base + " The customer is currently comparing " + context.shortlistCarIds().size() + " cars.";
    }
}