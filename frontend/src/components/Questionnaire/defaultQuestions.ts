import type { Question } from "../../types/questionnaire";

/** Hardcoded for now — Round 2 scope. Swap for a fetched question set
 *  once the backend exposes a real endpoint for this. */
export const DEFAULT_QUESTIONS: Question[] = [
  {
    id: "usage",
    prompt: "What will you mainly use this vehicle for?",
    helperText: "Pick whichever fits most of your driving.",
    options: [
      { id: "commuting", label: "Daily commuting" },
      { id: "family", label: "Family trips & errands" },
      { id: "adventure", label: "Off-road or road trips" },
    ],
  },
  {
    id: "budget",
    prompt: "What's your budget range?",
    options: [
      { id: "under-25k", label: "Under $25,000" },
      { id: "25-45k", label: "$25,000 – $45,000" },
      { id: "over-45k", label: "$45,000+" },
    ],
  },
  {
    id: "household",
    prompt: "How many people usually ride with you?",
    options: [
      { id: "solo", label: "Just me" },
      { id: "small", label: "2–4 people" },
      { id: "large", label: "5 or more" },
    ],
  },
  {
    id: "driving-style",
    prompt: "How would you describe your driving style?",
    options: [
      { id: "efficient", label: "Efficient & relaxed" },
      { id: "balanced", label: "Balanced, everyday driving" },
      { id: "performance", label: "Performance-focused" },
    ],
  },
];