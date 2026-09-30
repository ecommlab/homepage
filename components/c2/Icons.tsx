/** Linien-Icons der C2-Boards (viewBox 24, runde Enden). Farbe immer currentColor → folgt Hell/Dunkel. */
type IconProps = { size?: number; strokeWidth?: number; className?: string }

export function Pfeil({ size = 20, strokeWidth = 2.2, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden className={`block flex-none ${className}`}>
      <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Plus({ size = 24, strokeWidth = 2.5, className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden className={`block flex-none ${className}`}>
      <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

export function Menue({ size = 26, strokeWidth = 2.4 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round">
      <path d="M4 8h16" />
      <path d="M4 16h16" />
    </svg>
  )
}

export function Schliessen({ size = 22, strokeWidth = 2.4 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round">
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  )
}
