export interface FinancingInputs {
  vehiclePrice: number;
  downPayment: number;
  loanTermMonths: number;
}

export interface FinancingResult {
  monthlyPayment: number;
  monthlyInterest: number;
  totalInterest: number;
  totalPrice: number;
}

/** Simplified, disclosed assumptions — not real lender underwriting.
 *  Matches the "simplified formula" scope decision: no region-specific
 *  fee breakdown, no risk-based rate. */
export const ASSUMED_APR = 0.065;
export const ESTIMATED_FEES = 500;

export const LOAN_TERM_OPTIONS = [36, 48, 60, 72] as const;

/** Standard amortizing-loan formula. Pure function — no side effects,
 *  runs entirely client-side (see conversation: no benefit to doing
 *  this server-side for the MVP). */
export function calculateFinancing({
  vehiclePrice,
  downPayment,
  loanTermMonths,
}: FinancingInputs): FinancingResult {
  const principal = Math.max(vehiclePrice - downPayment, 0);
  const monthlyRate = ASSUMED_APR / 12;

  const monthlyPayment =
    monthlyRate === 0
      ? principal / loanTermMonths
      : (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -loanTermMonths));

  const monthlyInterest = principal * monthlyRate;
  const totalInterest = monthlyPayment * loanTermMonths - principal;
  const totalPrice = vehiclePrice + totalInterest;

  return { monthlyPayment, monthlyInterest, totalInterest, totalPrice };
}