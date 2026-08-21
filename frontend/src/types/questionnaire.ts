export interface QuestionOption {
    id: string;
    label: string;
}

export interface Question {
    id: string;
    prompt: string;
    helperText?: string;
    options: [QuestionOption, QuestionOption, QuestionOption];
}

export interface Answer {
    questionId: string;
    value: string;
    optionId?: string;
}