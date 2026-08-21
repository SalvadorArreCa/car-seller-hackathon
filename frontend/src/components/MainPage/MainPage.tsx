import { useState } from "react";
import { Questionnaire } from "../Questionnaire/Questionnaire";
import { Shortlist } from "../Shortlist/Shortlist";
import { FinancingCalculator } from "../FinancingCalculator/FinancingCalculator";
import { Booking } from "../Booking/Booking";
import { StepIndicator } from "./StepIndicator/StepIndicator";
import { STEPS } from "../../types/steps";
import type { Answer } from "../../types/questionnaire";
import type { CarOption } from "../../types/shortlist";
import type { FinancingResult } from "../../types/financing";
import type { BookingDetails } from "../../types/booking";
import styles from "./MainPage.module.css";

export function MainPage() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedCar, setSelectedCar] = useState<CarOption | null>(null);
  const [financingResult, setFinancingResult] = useState<FinancingResult | null>(null);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  const currentStep = STEPS[currentStepIndex];

  function goToNextStep() {
    setCurrentStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  }

  function handleQuestionnaireComplete(answers: Answer[]) {
    // Round 2 scope: not consumed by anything downstream yet — the real
    // shortlist agent (Round 3) will take these as its input instead of
    // MainPage just holding onto them unused.
    console.log("questionnaire answers", answers);
    goToNextStep();
  }

  function handleSelectCar(car: CarOption) {
    setSelectedCar(car);
    goToNextStep();
  }

  function handleFinancingContinue(result: FinancingResult) {
    setFinancingResult(result);
    goToNextStep();
  }

  function handleBookingConfirm(details: BookingDetails) {
    // Round 2 scope: no backend call yet — just recording that it happened.
    console.log("booking confirmed", details);
    setIsBookingConfirmed(true);
  }

  function handleRestart() {
    setCurrentStepIndex(0);
    setSelectedCar(null);
    setFinancingResult(null);
    setIsBookingConfirmed(false);
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <img src="/logo.png" alt="Car Seller logo" className={styles.logo} />
          <span className={styles.title}>Car Seller</span>
        </div>

        <StepIndicator steps={STEPS} currentStepId={currentStep.id} />
      </header>

      <main className={styles.content}>
        {currentStep.id === "questionnaire" && (
          <Questionnaire onComplete={handleQuestionnaireComplete} />
        )}

        {currentStep.id === "shortlist" && <Shortlist onSelectCar={handleSelectCar} />}

        {currentStep.id === "financing" && selectedCar && (
          <FinancingCalculator car={selectedCar} onContinue={handleFinancingContinue} />
        )}

        {currentStep.id === "booking" && selectedCar && (
          isBookingConfirmed ? (
            <div className={styles.placeholder}>
              <p>Appointment confirmed. (Round 2 scope — not sent anywhere real yet.)</p>
              <button type="button" onClick={handleRestart} className={styles.restartButton}>
                ← start over
              </button>
            </div>
          ) : (
            <Booking
              car={selectedCar}
              financingResult={financingResult}
              onConfirm={handleBookingConfirm}
              onSkip={handleRestart}
            />
          )
        )}
      </main>
    </div>
  );
}