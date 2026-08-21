export type StepId = "questionnaire" | "shortlist" | "financing" | "booking"

export interface StepConfig {
    id: StepId;
    label: string;
}

export const STEPS: StepConfig[] = [
    { id: "questionnaire", label: "Profile" },
    { id: "shortlist", label: "Shortlist" },
    { id: "financing", label: "Financing" },
    { id: "booking", label: "Booking" }
];