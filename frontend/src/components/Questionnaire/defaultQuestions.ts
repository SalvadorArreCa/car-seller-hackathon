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
      { id: "family", label: "Family / errands" },
      { id: "long-distance", label: "Long-distance travel" },
    ],
  },
  {
    id: "passengers",
    prompt: "How many people do you usually travel with?",
    options: [
      { id: "solo", label: "Just me" },
      { id: "small-group", label: "2–4 people" },
      { id: "large-group", label: "5+ people" },
    ],
  },
  {
    id: "vehicle-type",
    prompt: "What type of vehicle do you prefer?",
    options: [
      { id: "sedan", label: "Sedan" },
      { id: "suv", label: "SUV" },
      { id: "pickup", label: "Pickup" },
    ],
  },
  {
    id: "priority",
    prompt: "What matters most to you in a vehicle?",
    helperText: "Pick the factor that matters most to you.",
    options: [
      { id: "fuel-efficiency", label: "Fuel efficiency" },
      { id: "comfort-space", label: "Comfort & space" },
      { id: "safety", label: "Safety" },
    ],
  },
  {
    id: "powertrain",
    prompt: "What type of powertrain do you prefer?",
    options: [
      { id: "gasoline", label: "Gasoline" },
      { id: "hybrid", label: "Hybrid" },
      { id: "electric", label: "Electric" },
    ],
  },
  {
    id: "driving-environment",
    prompt: "Where do you drive most often?",
    options: [
      { id: "city", label: "Mostly in the city" },
      { id: "highway", label: "Mostly on highways" },
      { id: "mixed", label: "Both equally" },
    ],
  },
  {
    id: "deal-breaker",
    prompt: "What's one thing you don't want in a vehicle?",
    options: [
      { id: "too-expensive", label: "Too expensive" },
      { id: "too-small", label: "Too small" },
      { id: "too-large", label: "Too large" },
    ],
  },
  {
    id: "budget",
    prompt: "What's your target vehicle price range?",
    options: [
      { id: "under-25k", label: "Under $25,000" },
      { id: "25-35k", label: "$25,000 – $35,000" },
      { id: "over-35k", label: "$35,000+" },
    ],
  },
];