package coforge.car_seller.chat;

import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record ChatRequest(
        @NotBlank String message,
        ChatContext context
) {
    /** Not populated by the frontend yet — the shape exists so wiring in
     *  real shortlist context later is a backend-only change. */
    public record ChatContext(List<String> shortlistCarIds) {}
}
