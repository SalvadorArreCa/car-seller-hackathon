interface CarIllustrationProps {
  className?: string;
}

/** Generic car silhouette — stands in for a real vehicle photo.
 *  Swap for an actual <img> once the catalog has real images. */
export function CarIllustration({ className }: CarIllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="20" y="50" width="160" height="30" rx="10" stroke="currentColor" strokeWidth="3" />
      <path
        d="M55 50 L75 25 L130 25 L155 50"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <line x1="102" y1="27" x2="102" y2="50" stroke="currentColor" strokeWidth="2" />
      <circle cx="55" cy="80" r="14" stroke="currentColor" strokeWidth="3" />
      <circle cx="150" cy="80" r="14" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}