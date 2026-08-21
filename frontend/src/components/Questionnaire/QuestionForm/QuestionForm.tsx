import { useState, type ChangeEvent } from "react";
import type { Answer, Question } from "../../../types/questionnaire";
import styles from "./QuestionForm.module.css";

interface QuestionFormProps {
  question: Question;
  onAnswer: (answer: Answer) => void;
}

const OTHER_ID = "__other__";

/** Pure display component. Renders the 3 preset options plus a 4th
 *  "something else" option, all as one radio group, with a single
 *  Next button to submit. */
export function QuestionForm({ question, onAnswer }: QuestionFormProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [customText, setCustomText] = useState("");

  const isOtherSelected = selectedId === OTHER_ID;
  const canSubmit =
    selectedId !== null && (!isOtherSelected || customText.trim().length > 0);

  function handleOptionChange(event: ChangeEvent<HTMLInputElement>) {
    setSelectedId(event.target.value);
  }

  function handleCustomTextFocus() {
    setSelectedId(OTHER_ID);
  }

  function handleNext() {
    if (!canSubmit || selectedId === null) return;

    if (isOtherSelected) {
      onAnswer({ questionId: question.id, value: customText.trim() });
      return;
    }

    const option = question.options.find((o) => o.id === selectedId);
    if (!option) return;
    onAnswer({ questionId: question.id, value: option.label, optionId: option.id });
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.prompt}>{question.prompt}</h2>
      {question.helperText && <p className={styles.helperText}>{question.helperText}</p>}

      <fieldset className={styles.optionList}>
        <legend className="sr-only">{question.prompt}</legend>

        {question.options.map((option) => (
          <label key={option.id} className={styles.optionRow}>
            <input
              type="radio"
              name={question.id}
              value={option.id}
              checked={selectedId === option.id}
              onChange={handleOptionChange}
              className={styles.radio}
            />
            <span>{option.label}</span>
          </label>
        ))}

        <label className={`${styles.optionRow} ${styles.otherRow}`}>
          <input
            type="radio"
            name={question.id}
            value={OTHER_ID}
            checked={isOtherSelected}
            onChange={handleOptionChange}
            className={styles.radio}
          />
          <input
            type="text"
            value={customText}
            onFocus={handleCustomTextFocus}
            onChange={(event) => setCustomText(event.target.value)}
            placeholder="Something else — type your own answer"
            className={styles.customInput}
          />
        </label>
      </fieldset>

      <button type="button" onClick={handleNext} disabled={!canSubmit} className={styles.nextButton}>
        Next
      </button>
    </div>
  );
}