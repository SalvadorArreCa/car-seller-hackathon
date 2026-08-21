import type { CarOption } from "../../types/shortlist";

/** Hardcoded for now — Round 2 scope. Swap for the real shortlist
 *  agent response (RAG + LLM ranking) once that's built in Round 3. */
export const MOCK_SHORTLIST: CarOption[] = [
  {
    id: "cr-v",
    name: "Honda CR-V",
    brand: "Honda",
    type: "Compact SUV",
    priceValue: 29500,
    description:
      "Easy to park and great fuel economy — a strong fit if most of your driving is around town.",
  },
  {
    id: "sienna",
    name: "Toyota Sienna",
    brand: "Toyota",
    type: "Minivan",
    priceValue: 38000,
    description:
      "The most cargo and seating room of the three — worth the higher price if you're regularly hauling a full house.",
  },
  {
    id: "cx-5",
    name: "Mazda CX-5",
    brand: "Mazda",
    type: "Compact SUV",
    priceValue: 31200,
    description:
      "A sportier drive than the CR-V with a nicer interior, at a small premium — a good middle ground.",
  },
];