import { Code2 } from 'lucide-react'
import type { Skill } from '../data/content'

const DARK_BRANDS = new Set(['000000', '181717'])

// Monochrome by default; the brand color shows on hover of the closest `.group`.
export function TechIcon({ skill, className = 'size-5' }: { skill: Skill; className?: string }) {
  if (!skill.icon) return <Code2 className={`${className} text-muted-foreground`} aria-hidden />
  const hex = DARK_BRANDS.has(skill.icon.hex) ? 'var(--foreground)' : `#${skill.icon.hex}`
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={`${className} fill-muted-foreground transition-colors duration-300 group-hover:fill-(--brand)`}
      style={{ ['--brand' as string]: hex }}
    >
      <path d={skill.icon.path} />
    </svg>
  )
}
