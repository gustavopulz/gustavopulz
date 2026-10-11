import type { ReactNode } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { featuredProject as fp, projects } from '../data/content'
import { GlowCard } from './GlowCard'
import { ZoomImage } from './Lightbox'
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

function CardLink({ href, children }: { href?: string; children: ReactNode }) {
  const cls = 'flex flex-col'
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
            <ZoomImage src={fp.image!} alt={`Tela do ${fp.name}`} className="w-full" />
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

      <div className="mt-12 flex flex-col gap-6 pb-4">
        <div className="sticky" style={{ top: 88 }}>
          <Featured />
        </div>
        {projects.map((p, i) => (
          <div key={p.name} className="sticky" style={{ top: 88 + (i + 1) * 16 }}>
            <GlowCard inner="grid gap-5 p-4 md:grid-cols-[1.3fr_1fr] md:items-center md:gap-8 md:p-5">
              <div className="overflow-hidden rounded-xl [perspective:1200px]">
                <div className="transition-transform duration-700 ease-out group-hover:[transform:rotateX(4deg)_scale(1.02)]">
                  <BrowserFrame url={new URL(p.href!).hostname.replace(/^www\./, '')}>
                    <ZoomImage src={p.image!} alt={`Tela do ${p.name}`} className="w-full" />
                  </BrowserFrame>
                </div>
              </div>
              <CardLink href={p.href}>
                <div className="flex flex-1 flex-col px-1 pb-1 md:px-0 md:pb-0">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{p.kind}</p>
                  <h3 className="mt-2 flex items-center justify-between text-2xl font-light tracking-tight">
                    {p.name}
                    <ArrowUpRight className="size-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                  <div className="mt-5">
                    <TechTags tags={p.tags} />
                  </div>
                </div>
              </CardLink>
            </GlowCard>
          </div>
        ))}
      </div>
    </Section>
  )
}
