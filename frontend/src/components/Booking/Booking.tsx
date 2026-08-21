import { useState, type FormEvent } from "react";
import type { CarOption } from "../../types/shortlist";
import type { FinancingResult } from "../../types/financing";
import { MOCK_BRANCHES, type BookingDetails } from "../../types/booking";
import { formatCurrency } from "../../utils/format";
import styles from "./Booking.module.css";

interface BookingProps {
  car: CarOption;
  financingResult: FinancingResult | null;
  onConfirm: (details: BookingDetails) => void;
  onSkip: () => void;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+\-\s()]{7,}$/;

function getTodayDateString(): string {
  return new Date().toISOString().split("T")[0];
}

/** Confirm stays disabled until every field is present and, for email/phone,
 *  actually looks like an email/phone — matches the validation pattern used
 *  in the questionnaire (button gates on validity rather than erroring after
 *  the fact). No backend call yet: onConfirm just hands the collected data
 *  up to whoever renders this. */
export function Booking({ car, financingResult, onConfirm, onSkip }: BookingProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [branchId, setBranchId] = useState("");

  const isValid =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    EMAIL_PATTERN.test(email) &&
    PHONE_PATTERN.test(phone) &&
    date.length > 0 &&
    time.length > 0 &&
    branchId.length > 0;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!isValid) return;
    onConfirm({ firstName, lastName, email, phone, date, time, branchId });
  }

  return (
    <form onSubmit={handleSubmit} className={styles.card}>
      <div>
        <h2 className={styles.heading}>Schedule Appointment</h2>
        <p className={styles.subheading}>
          Test drive for {car.name}
          {financingResult && ` — ${formatCurrency(financingResult.monthlyPayment)}/mo`}
        </p>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="first-name" className={styles.label}>
            First Name
          </label>
          <input
            id="first-name"
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="Jane"
            className={styles.input}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="last-name" className={styles.label}>
            Last Name
          </label>
          <input
            id="last-name"
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            placeholder="Doe"
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="jane.doe@email.com"
            className={styles.input}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="phone" className={styles.label}>
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="+1 555 555 5555"
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="date" className={styles.label}>
            Date
          </label>
          <input
            id="date"
            type="date"
            min={getTodayDateString()}
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="time" className={styles.label}>
            Time
          </label>
          <input
            id="time"
            type="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="branch" className={styles.label}>
          Branch
        </label>
        <select
          id="branch"
          value={branchId}
          onChange={(event) => setBranchId(event.target.value)}
          className={styles.select}
        >
          <option value="" disabled>
            Select a branch
          </option>
          {MOCK_BRANCHES.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.label}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" disabled={!isValid} className={styles.confirmButton}>
        Confirm
      </button>

      <button type="button" onClick={onSkip} className={styles.skipButton}>
        Skip and start over
      </button>
    </form>
  );
}