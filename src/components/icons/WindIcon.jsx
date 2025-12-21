const WindIcon = ({ className="" }) => {
  return (
    <svg 
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 8h10a2 2 0 1 0-2-2" />
      <path d="M3 12h14a2 2 0 1 1-2 2" />
      <path d="M3 16h8a2 2 0 1 0-2-2" />
    </svg>
  )
}

export default WindIcon;