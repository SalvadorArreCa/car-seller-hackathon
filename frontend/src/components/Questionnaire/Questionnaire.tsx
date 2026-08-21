import { useState } from "react";
import { DEFAULT_QUESTIONS } from "./defaultQuestions";
import { ProgressGauge } from "./ProgressGauge";
import { QuestionForm } from "./QuestionForm/QuestionForm";
import type { Answer, Question } from "../../types/questionnaire";
import styles from "./Questionnaire.module.css";

interface QuestionnaireProps {
  questions?: Question[];
  onComplete: (answers: Answer[]) => void;
}

export function Questionnaire({
  questions = DEFAULT_QUESTIONS,
  onComplete,
}: QuestionnaireProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  function handleAnswer(answer: Answer) {
    const nextAnswers = [
      ...answers.filter((a) => a.questionId !== answer.questionId),
      answer,
    ];
    setAnswers(nextAnswers);

    if (isLastQuestion) {
      onComplete(nextAnswers);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }

  function handleBack() {
    setCurrentIndex((i) => Math.max(0, i - 1));
  }

  return (
    <div className={styles.page}>
      <ProgressGauge current={currentIndex + 1} total={questions.length} />

      {currentIndex > 0 && (
        <button type="button" onClick={handleBack} className={styles.backButton}>
          ← back
        </button>
      )}

      <QuestionForm
        key={currentQuestion.id}
        question={currentQuestion}
        onAnswer={handleAnswer}
      />
    </div>
  );
}