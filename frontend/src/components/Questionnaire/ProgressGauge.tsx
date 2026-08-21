import styles from "./ProgressGauge.module.css";

interface ProgressGaugeProps {
  current: number;
  total: number;
}

const RADIUS = 54;
const STROKE = 8;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function ProgressGauge({ current, total }: ProgressGaugeProps) {
  const progress = total > 0 ? current / total : 0;
  const offset = CIRCUMFERENCE * (1 - progress);

  return (
    <div className={styles.gauge} role="img" aria-label={`Question ${current} of ${total}`}>
      <svg viewBox="0 0 120 120" className={styles.svg}>
        <circle cx="60" cy="60" r={RADIUS} strokeWidth={STROKE} className={styles.trackCircle} />
        <circle
          cx="60"
          cy="60"
          r={RADIUS}
          strokeWidth={STROKE}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          className={styles.progressCircle}
        />
      </svg>
      <div className={styles.labelWrap}>
        <span className={styles.current}>{String(current).padStart(2, "0")}</span>
        <span className={styles.total}>/ {String(total).padStart(2, "0")}</span>
      </div>
    </div>
  );
}