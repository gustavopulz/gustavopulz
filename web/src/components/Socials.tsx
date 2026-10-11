import { useState } from 'react'
import { Check } from 'lucide-react'
import { socials } from '../data/content'

const cls = 'grid size-10 place-items-center rounded-full border text-muted-foreground transition-colors hover:border-primary hover:text-primary'

export function Socials() {
  const [copied, setCopied] = useState(false)

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      return
    }
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {socials.map((s) => {
        const icon = (
          <svg viewBox="0 0 24 24" aria-hidden className="size-[18px] fill-current">
            <path d={s.icon?.path ?? s.path} />
          </svg>
        )
        return (
          <li key={s.name}>
            {s.href ? (
              <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.name} title={s.name} className={cls}>{icon}</a>
            ) : (
              <button type="button" onClick={() => copy(s.copy ?? '')} aria-label={`${s.name}: ${s.copy}`} title={copied ? 'Copiado!' : `${s.name}: ${s.copy} (clique para copiar)`} className={cls}>
                {copied ? <Check className="size-[18px]" /> : icon}
              </button>
            )}
          </li>
        )
      })}
    </ul>
  )
}
