import { skillGroups } from '../data/content'
import { TechIcon } from './TechIcon'

const all = skillGroups.flatMap((g) => g.items)
const half = Math.ceil(all.length / 2)
const rows = [all.slice(0, half), all.slice(half)]

export function TechMarquee() {
  return (
    <div className="marquee space-y-4 overflow-hidden border-y py-8 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]" aria-label="Tecnologias">
      {rows.map((row, i) => (
        <div key={i} className={`flex w-max gap-4 ${i === 0 ? 'marquee-l' : 'marquee-r'}`}>
          {[...row, ...row].map((s, j) => (
            <span key={j} aria-hidden={j >= row.length} className="group flex items-center gap-2.5 rounded-full border bg-card px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <TechIcon skill={s} className="size-4" />
              {s.name}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}
