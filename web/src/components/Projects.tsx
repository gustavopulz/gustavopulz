import type { ReactNode } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { featuredProject as fp, projects, type Project } from '../data/content'
import { GlowCard } from './GlowCard'
import { Reveal } from './Reveal'
import { Section, SectionHeading } from './Section'
import { TechTags } from './TechTags'

function BrowserFrame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border bg-background shadow-xl shadow-black/5">
      <div className="flex items-center gap-1.5 border-b bg-secondary/60 px-3 py-2">
        <span className="size-2 rounded-full bg-foreground/15" />
        <span className="size-2 rounded-full bg-foreground/15" />
        <span className="size-2 rounded-full bg-foreground/15" />
        <span className="mx-auto truncate rounded-md bg-background px-3 py-0.5 font-mono text-[10px] text-muted-foreground">{url}</span>
      </div>
      {children}
    </div>
  )
}

// Stand-in illustration until a real screenshot is added to the project's `image`.
function Mockup({ hue, layout }: NonNullable<Project['mockup']>) {
  const c = (l: number, a = 1) => `hsl(${hue} 55% ${l}% / ${a})`
  return (
    <div className="aspect-[16/10] p-3" style={{ background: c(96) }}>
      <div className="flex items-center justify-between">
        <span className="h-2 w-10 rounded" style={{ background: c(30) }} />
        <span className="flex gap-1.5">
          {[0, 1, 2].map((i) => <span key={i} className="h-1.5 w-6 rounded" style={{ background: c(70) }} />)}
        </span>
      </div>
      {layout === 'hero' && (
        <div className="mt-3 grid h-[78%] place-items-center rounded-lg" style={{ background: `linear-gradient(135deg, ${c(35)}, ${c(55)})` }}>
          <div className="w-1/2 space-y-1.5 text-center">
            <span className="mx-auto block h-2.5 w-full rounded bg-white/90" />
            <span className="mx-auto block h-1.5 w-2/3 rounded bg-white/50" />
            <span className="mx-auto mt-3 block h-4 w-14 rounded bg-white" />
          </div>
        </div>
      )}
      {layout === 'grid' && (
        <div className="mt-3 space-y-2">
          <div className="h-12 rounded-lg" style={{ background: c(40) }} />
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="space-y-1 rounded-md p-1.5" style={{ background: c(90) }}>
                <div className="h-8 rounded" style={{ background: c(60 + i * 6) }} />
                <span className="block h-1.5 w-3/4 rounded" style={{ background: c(40) }} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function CardLink({ href, children }: { href?: string; children: ReactNode }) {
  const cls = 'flex h-full flex-col'
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>{children}</a>
  ) : (
    <div className={cls}>{children}</div>
  )
}

function Featured() {
  return (
    <GlowCard inner="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-12">
      <div className="overflow-hidden rounded-xl [perspective:1200px]">
        <div className="transition-transform duration-700 ease-out group-hover:[transform:rotateX(4deg)_scale(1.02)]">
          <BrowserFrame url="finance-system.prxlab.com.br">
            <img src={fp.image} alt={`Tela do ${fp.name}`} loading="lazy" className="w-full" />
          </BrowserFrame>
        </div>
      </div>
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-primary">{fp.kind}</p>
        <h3 className="mt-3 text-4xl font-light tracking-tight">{fp.name}</h3>
        <p className="mt-4 leading-relaxed text-muted-foreground">{fp.text}</p>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {fp.features?.map((f) => (
            <li key={f} className="flex gap-2 text-sm">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {f}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-5">
          <TechTags tags={fp.tags} />
          {fp.href && (
            <a href={fp.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
              Acessar sistema <ArrowUpRight className="size-4" />
            </a>
          )}
        </div>
      </div>
    </GlowCard>
  )
}

export function Projects() {
  return (
    <Section id="projetos" band>
      <Reveal>
        <SectionHeading label="Projetos" aside="Sistemas e sites que desenvolvi recentemente.">
          Trabalhos <em className="serif text-primary">selecionados.</em>
        </SectionHeading>
      </Reveal>

      <Reveal className="mt-12">
        <Featured />
      </Reveal>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={(i % 2) * 90} className="h-full">
            <GlowCard inner="p-4">
              <CardLink href={p.href}>
              <div className="relative overflow-hidden rounded-xl border">
                {!p.image && <span className="absolute right-2 top-9 z-10 rounded-full bg-black/55 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white">Prévia ilustrativa</span>}
                <div className="transition-transform duration-500 ease-out group-hover:scale-[1.04]">
                  {p.image ? <img src={p.image} alt={`Tela do ${p.name}`} loading="lazy" className="aspect-[2/1] w-full object-cover object-left-top" /> : p.mockup && <Mockup {...p.mockup} />}
                </div>
              </div>
              <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{p.kind}</p>
                <h3 className="mt-2 flex items-center justify-between text-xl font-light tracking-tight">
                  {p.name}
                  <ArrowUpRight className="size-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                <div className="mt-5">
                  <TechTags tags={p.tags} />
                </div>
              </div>
              </CardLink>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
