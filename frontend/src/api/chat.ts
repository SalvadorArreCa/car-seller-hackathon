import { postJson } from "./client";
import type { ChatRequest, ChatResponse } from "../types/chat";

export async function sendChatMessage(message: string): Promise<string> {
  const response = await postJson<ChatResponse>("/api/chat", { message } satisfies ChatRequest);
  return response.reply;
}