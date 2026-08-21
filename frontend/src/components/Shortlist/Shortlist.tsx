import { useState } from "react";
import { CarCard } from "./CarCard/CarCard";
import { ChatPanel } from "./ChatPanel/ChatPanel";
import { MOCK_SHORTLIST } from "./mockCars";
import type { CarOption } from "../../types/shortlist";
import styles from "./Shortlist.module.css";

interface ShortlistProps {
  cars?: CarOption[];
  onSelectCar: (car: CarOption) => void;
}

export function Shortlist({ cars = MOCK_SHORTLIST, onSelectCar }: ShortlistProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  function handleSwap(carId: string, reasonId: string) {
    // Round 2 scope: no real replacement yet — just reporting the intent.
    // Later this calls the backend with the reason and swaps in a new CarOption.
    console.log("swap requested", { carId, reasonId });
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {cars.map((car) => (
          <CarCard key={car.id} car={car} onSelect={onSelectCar} onSwap={handleSwap} />
        ))}
      </div>

      {isChatOpen && <ChatPanel onClose={() => setIsChatOpen(false)} />}

      <button
        type="button"
        onClick={() => setIsChatOpen((open) => !open)}
        className={styles.chatTrigger}
        aria-expanded={isChatOpen}
      >
        <span>
          Not convinced? <strong>Talk to me</strong>
        </span>
        <span className={styles.chatIcon} aria-hidden="true">
          {isChatOpen ? "×" : "^"}
        </span>
      </button>
    </div>
  );
}