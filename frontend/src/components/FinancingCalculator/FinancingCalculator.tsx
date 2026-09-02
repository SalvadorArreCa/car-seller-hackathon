import { useState } from "react";
import type { CarOption } from "../../types/shortlist";
import { CarIllustration } from "../Shortlist/CarIllustration";
import {
  ASSUMED_APR,
  ESTIMATED_FEES,
  LOAN_TERM_OPTIONS,
  calculateFinancing,
  type FinancingResult,
} from "../../types/financing";
import { formatCurrency } from "../../utils/format";
import styles from "./FinancingCalculator.module.css";

interface FinancingCalculatorProps {
  car: CarOption;
  onContinue: (result: FinancingResult) => void;
  onBack: () => void;
}

/** Vehicle price is fixed to the car the user picked in the shortlist —
 *  not editable here. Down payment and loan term are the only real
 *  inputs. Recalculates only when "Calculate" is pressed; changing an
 *  input after that clears the stale result rather than showing
 *  numbers that no longer match what's on screen.
 *
 *  MainPage mounts this with key={selectedCar.id}, so switching cars via
 *  "back to shortlist" always starts this component's state fresh rather
 *  than carrying over a stale slider position or calculated result. */
export function FinancingCalculator({ car, onContinue, onBack }: FinancingCalculatorProps) {
  const [downPayment, setDownPayment] = useState(0);
  const [loanTermMonths, setLoanTermMonths] = useState<number>(LOAN_TERM_OPTIONS[2]);
  const [result, setResult] = useState<FinancingResult | null>(null);

  function handleCalculate() {
    setResult(
      calculateFinancing({
        vehiclePrice: car.priceValue,
        downPayment,
        loanTermMonths,
      })
    );
  }

  function handleDownPaymentChange(value: number) {
    setDownPayment(value);
    setResult(null);
  }

  function handleLoanTermChange(value: number) {
    setLoanTermMonths(value);
    setResult(null);
  }

  return (
    <div className={styles.card}>
      <div>
        <h2 className={styles.heading}>Payment Plan</h2>
      </div>

      <div className={styles.carSummary}>
        <CarIllustration className={styles.carSummaryIcon} />
        <div className={styles.carSummaryInfo}>
          <p className={styles.carSummaryName}>{car.name}</p>
          <p className={styles.carSummarySpecs}>
            {car.brand} · {car.type} · {formatCurrency(car.priceValue)}
          </p>
        </div>
        <button type="button" onClick={onBack} className={styles.backLink}>
          ← not this one?
        </button>
      </div>

      <div className={styles.fieldGroup}>
        <div className={styles.field}>
          <span className={styles.label}>Vehicle Price</span>
          <span className={styles.readOnlyValue}>{formatCurrency(car.priceValue)}</span>
        </div>

        <div className={styles.field}>
          <label htmlFor="down-payment" className={styles.label}>
            Down Payment
          </label>
          <div className={styles.sliderRow}>
            <input
              id="down-payment"
              type="range"
              min={0}
              max={car.priceValue}
              step={500}
              value={downPayment}
              onChange={(event) => handleDownPaymentChange(Number(event.target.value))}
              className={styles.slider}
            />
            <span className={styles.sliderValue}>{formatCurrency(downPayment)}</span>
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="loan-term" className={styles.label}>
            Loan Term
          </label>
          <select
            id="loan-term"
            value={loanTermMonths}
            onChange={(event) => handleLoanTermChange(Number(event.target.value))}
            className={styles.select}
          >
            {LOAN_TERM_OPTIONS.map((months) => (
              <option key={months} value={months}>
                {months} months
              </option>
            ))}
          </select>
        </div>

        <p className={styles.feesNote}>
          Estimated fees: {formatCurrency(ESTIMATED_FEES)} (typical dealer &amp; registration
          fees — not included in the total below; varies by location). Assumes a fixed{" "}
          {(ASSUMED_APR * 100).toFixed(1)}% estimated interest rate, not a final loan offer.
        </p>
      </div>

      <button type="button" onClick={handleCalculate} className={styles.calculateButton}>
        Calculate
      </button>

      {result && (
        <>
          <hr className={styles.divider} />

          <div className={styles.results}>
            <div className={`${styles.resultRow} ${styles.resultRowPrimary}`}>
              <span className={styles.resultLabel}>Monthly Payment</span>
              <span className={styles.resultValue}>{formatCurrency(result.monthlyPayment)}</span>
            </div>
            <div className={styles.resultRow}>
              <span className={styles.resultLabel}>Monthly Interest</span>
              <span className={styles.resultValue}>{formatCurrency(result.monthlyInterest)}</span>
            </div>
            <div className={styles.resultRow}>
              <span className={styles.resultLabel}>Total Interest</span>
              <span className={styles.resultValue}>{formatCurrency(result.totalInterest)}</span>
            </div>
            <div className={styles.resultRow}>
              <span className={styles.resultLabel}>Total Price</span>
              <span className={styles.resultValue}>{formatCurrency(result.totalPrice)}</span>
            </div>
          </div>

          <button type="button" onClick={() => onContinue(result)} className={styles.continueButton}>
            Continue to booking →
          </button>
        </>
      )}
    </div>
  );
}