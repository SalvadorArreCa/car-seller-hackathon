export interface CarOption {
    id: string;
    name: string;
    brand: string;
    type: string;
    priceValue: number;
    description: string;
}

export interface SwapReason {
    id: string;
    label: string;
}

export const SWAP_REASONS: SwapReason[] = [
  { id: "too-expensive", label: "It's too expensive" },
  { id: "dont-like-style", label: "I don't like the style" },
  { id: "too-small", label: "It's too small" },
  { id: "too-big", label: "It's too big" },
  { id: "wrong-type", label: "Not the type I want" },
];