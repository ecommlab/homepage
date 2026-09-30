import { useEffect, useState } from 'react'

/**
 * Hell/Dunkel-Umschalter – gleiche Logik wie im bisherigen SiteHeader:
 * Klasse `dark` am <html> + localStorage 'theme' (das Init-Skript in pages/_document.tsx liest es beim Laden).
 */
export function useThema() {
  const [thema, setThema] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    setThema(document.documentElement.classList.contains('dark') ? 'dark' : 'light')
  }, [])

  const umschalten = () => {
    const root = document.documentElement
    const next = root.classList.contains('dark') ? 'light' : 'dark'
    root.classList.toggle('dark', next === 'dark')
    try {
      localStorage.setItem('theme', next)
    } catch {
      // ignorieren (z. B. privater Modus)
    }
    setThema(next)
  }

  return { thema, umschalten }
}
