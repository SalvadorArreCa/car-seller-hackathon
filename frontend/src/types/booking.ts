export interface BranchOption {
  id: string;
  label: string;
}

/** Hardcoded for now — Round 2 scope. No real dealership/branch
 *  system integration yet (see project scope notes). */
export const MOCK_BRANCHES: BranchOption[] = [
  { id: "downtown", label: "742 Evergreen Terrace, Springfield" },
  { id: "north", label: "128 North Ave, Springfield" },
  { id: "west", label: "89 West Blvd, Shelbyville" },
];

export interface BookingDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  branchId: string;
}