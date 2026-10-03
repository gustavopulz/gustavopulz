import { skillGroups } from '../data/content'
import { TechIcon } from './TechIcon'

const byName = new Map(skillGroups.flatMap((g) => g.items).map((s) => [s.name, s]))

export function TechTags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <li key={t} className="group inline-flex items-center gap-1.5 rounded-full border bg-background/60 px-2.5 py-1 text-xs text-muted-foreground">
          <TechIcon skill={byName.get(t) ?? { name: t }} className="size-3.5" />
          {t}
        </li>
      ))}
    </ul>
  )
}
