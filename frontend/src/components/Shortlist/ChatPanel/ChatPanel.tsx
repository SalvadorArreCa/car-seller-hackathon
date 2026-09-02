import { useState, type FormEvent } from "react";
import { sendChatMessage } from "../../../api/chat";
import styles from "./ChatPanel.module.css";

interface ChatPanelProps {
  onClose: () => void;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/** Wired to the real /api/chat endpoint. Each message is sent as a
 *  standalone request — no conversation history is sent to the backend
 *  yet, and no shortlist context is attached either (the wire format
 *  already supports it, see ChatContext in src/types/chat.ts — this is
 *  just not populated until the shortlist itself is real, not mocked). */
export function ChatPanel({ onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed || isSending) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setDraft("");
    setIsSending(true);
    setError(null);

    try {
      const reply = await sendChatMessage(trimmed);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setError("Couldn't reach the assistant — is the backend running?");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className={styles.panel} role="dialog" aria-label="Chat assistant">
      <div className={styles.panelHeader}>
        <span className={styles.panelTitle}>Talk it through</span>
        <button
          type="button"
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Close chat"
        >
          ×
        </button>
      </div>

      <div className={styles.panelBody}>
        {messages.length === 0 && !error && (
          <p className={styles.placeholderText}>
            Ask about the options, or tell me what you'd like to change.
          </p>
        )}
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.role === "user" ? styles.userBubble : styles.assistantBubble}
          >
            {message.content}
          </div>
        ))}
        {isSending && <p className={styles.typingIndicator}>Thinking…</p>}
        {error && <p className={styles.errorText}>{error}</p>}
      </div>

      <form onSubmit={handleSubmit} className={styles.panelInputRow}>
        <input
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Type a message..."
          disabled={isSending}
          className={styles.panelInput}
        />
        <button type="submit" disabled={isSending || !draft.trim()} className={styles.panelSend}>
          Send
        </button>
      </form>
    </div>
  );
}