const SunsetIcon = ({ className="" }) => {
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
      <path d="M3 18h18" />
      <path d="M8 18a4 4 0 0 1 8 0" />
      <path d="M12 6v3" />
      <path d="M4.5 12.5l2.1-1.2" />
      <path d="M19.5 12.5l-2.1-1.2" />
      <path d="M7 9l1.6 1.6" />
      <path d="M17 9l-1.6 1.6" />
    </svg>
  )
}

export default SunsetIcon;