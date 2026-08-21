import { useState } from "react";
import { SWAP_REASONS, type CarOption } from "../../../types/shortlist";
import { CarIllustration } from "../CarIllustration";
import styles from "./CarCard.module.css";
import { formatCurrency } from "../../../utils/format";

interface CarCardProps {
  car: CarOption;
  onSelect: (car: CarOption) => void;
  onSwap: (carId: string, reasonId: string) => void;
}

/** One car in the shortlist. The image doubles as the "select this car"
 *  button. The "not this one?" control opens a small panel of quick
 *  reasons instead of just discarding the option silently — that reason
 *  is what the (future) shortlist agent uses to find a better match. */
export function CarCard({ car, onSelect, onSwap }: CarCardProps) {
  const [isSwapOpen, setIsSwapOpen] = useState(false);

  function handleReasonClick(reasonId: string) {
    setIsSwapOpen(false);
    onSwap(car.id, reasonId);
  }

  return (
    <article className={styles.card}>
      <button
        type="button"
        onClick={() => onSelect(car)}
        className={styles.imageButton}
        aria-label={`Select ${car.name}`}
      >
        <CarIllustration className={styles.illustration} />
      </button>

      <h3 className={styles.name}>{car.name}</h3>
      <p className={styles.description}>{car.description}</p>
      <p className={styles.specs}>
        {car.brand} · {car.type} · {formatCurrency(car.priceValue)}
      </p>

      <div className={styles.swapWrapper}>
        <button
          type="button"
          onClick={() => setIsSwapOpen((open) => !open)}
          className={styles.swapButton}
          aria-expanded={isSwapOpen}
        >
          Not this one?
        </button>

        {isSwapOpen && (
          <div className={styles.swapPanel} role="menu">
            <span className={styles.swapPanelTitle}>What's wrong with it?</span>
            {SWAP_REASONS.map((reason) => (
              <button
                key={reason.id}
                type="button"
                role="menuitem"
                onClick={() => handleReasonClick(reason.id)}
                className={styles.reasonChip}
              >
                {reason.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}