import type { StepConfig, StepId } from "../../../types/steps";
import styles from "./StepIndicator.module.css";

interface StepIndicatorProps {
  steps: StepConfig[];
  currentStepId: StepId;
}

/** Dots connected by a bar, one dot per step. Dots before the current
 *  step are marked done, the current one is enlarged, the rest sit idle. */
export function StepIndicator({ steps, currentStepId }: StepIndicatorProps) {
  const currentIndex = steps.findIndex((step) => step.id === currentStepId);

  return (
    <ol className={styles.list} aria-label="Progress">
      {steps.map((step, index) => {
        const isDone = index < currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <li key={step.id} className={styles.item}>
            <span
              className={`${styles.dot} ${isDone ? styles.done : ""} ${isCurrent ? styles.current : ""}`}
              aria-current={isCurrent ? "step" : undefined}
              title={step.label}
            />
            {index < steps.length - 1 && (
              <span className={`${styles.connector} ${isDone ? styles.connectorDone : ""}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}