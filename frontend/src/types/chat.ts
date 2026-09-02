/** Not sent by the frontend yet — the backend already accepts this shape,
 *  so wiring in real shortlist awareness later is a backend-only change. */
export interface ChatContext {
  shortlistCarIds: string[];
}

export interface ChatRequest {
  message: string;
  context?: ChatContext;
}

export interface ChatResponse {
  reply: string;
}