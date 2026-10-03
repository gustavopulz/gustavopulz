import { skillGroups } from '../data/content'
import { GlowCard } from './GlowCard'
import { Reveal } from './Reveal'
import { Section, SectionHeading } from './Section'
import { TechIcon } from './TechIcon'
import { TechMarquee } from './TechMarquee'

export function Skills() {
  return (
    <>
      <Section id="skills">
        <Reveal>
          <SectionHeading label="Skills">
            Ferramentas do <em className="serif text-primary">dia a dia.</em>
          </SectionHeading>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={(i % 2) * 90} className="h-full">
              <GlowCard inner="p-6 sm:p-7">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl font-light tracking-tight">{g.title}</h3>
                  <span className="font-mono text-xs text-muted-foreground">{String(g.items.length).padStart(2, '0')}</span>
                </div>
                <ul className="mt-6 grid grid-cols-2 gap-1 sm:grid-cols-3">
                  {g.items.map((s) => (
                    <li key={s.name} className="group flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                      <TechIcon skill={s} className="size-4 shrink-0" />
                      <span className="truncate">{s.name}</span>
                    </li>
                  ))}
                </ul>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </Section>
      <TechMarquee />
    </>
  )
}
