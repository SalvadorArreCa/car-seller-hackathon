import styles from "./ChatPanel.module.css";

interface ChatPanelProps {
  onClose: () => void;
}

/** The panel itself works — opens, closes, sits above the trigger button.
 *  What's inside is still a placeholder: no real conversation yet,
 *  the input is disabled until the chatbot is actually wired up. */
export function ChatPanel({ onClose }: ChatPanelProps) {
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
        <p className={styles.placeholderText}>
          Chat isn't wired up yet — this is the panel shell. Once the chatbot is
          built, this is where the conversation and updated options will show up.
        </p>
      </div>

      <div className={styles.panelInputRow}>
        <input
          type="text"
          placeholder="Type a message..."
          disabled
          className={styles.panelInput}
        />
        <button type="button" disabled className={styles.panelSend}>
          Send
        </button>
      </div>
    </div>
  );
}