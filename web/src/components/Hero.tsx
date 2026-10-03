import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { useRef, type PointerEvent } from 'react'
import { siNestjs, siReact, siTypescript } from 'simple-icons'
import { experience, profile } from '../data/content'
import { CodeBackdrop } from './CodeBackdrop'
import { Magnetic } from './Magnetic'

const current = experience[0]

function Logo3({ path, hex }: { path: string; hex: string }) {
  return (
    <span className="grid size-11 place-items-center rounded-xl border bg-card/90 shadow-lg shadow-black/5 backdrop-blur">
      <svg viewBox="0 0 24 24" className="size-5" style={{ fill: `#${hex}` }} aria-hidden>
        <path d={path} />
      </svg>
    </span>
  )
}

function Portrait() {
  const ref = useRef<HTMLDivElement>(null)

  function move(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el || e.pointerType !== 'mouse') return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--rx', `${((e.clientX - r.left) / r.width - 0.5).toFixed(3)}`)
    el.style.setProperty('--ry', `${((e.clientY - r.top) / r.height - 0.5).toFixed(3)}`)
  }

  function reset() {
    ref.current?.style.setProperty('--rx', '0')
    ref.current?.style.setProperty('--ry', '0')
  }

  const layer = (depth: number) => ({
    transform: `translate3d(calc(var(--rx, 0) * ${depth}px), calc(var(--ry, 0) * ${depth}px), 0)`,
    transition: 'transform .5s cubic-bezier(.16,1,.3,1)',
  })

  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={reset} className="relative mx-auto w-full max-w-sm [perspective:1000px] lg:max-w-none">
      <div
        className="relative"
        style={{
          transform: 'rotateY(calc(var(--rx, 0) * 10deg)) rotateX(calc(var(--ry, 0) * -10deg))',
          transition: 'transform .5s cubic-bezier(.16,1,.3,1)',
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="relative overflow-hidden rounded-[2rem] border bg-secondary shadow-2xl shadow-black/10">
          <img src={profile.photo} alt={`Foto de ${profile.name}`} className="aspect-[4/5] w-full object-cover object-top grayscale-[35%]" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <p className="font-mono text-[11px] uppercase tracking-widest text-white/70">{profile.location}</p>
            <p className="mt-1 text-xl font-medium">{profile.name}</p>
          </div>
        </div>

        <div className="absolute -left-6 top-10 hidden sm:block" style={layer(36)}>
          <div className="float-a w-56 overflow-hidden rounded-xl border bg-card/95 shadow-xl shadow-black/10 backdrop-blur">
            <div className="flex items-center gap-1.5 border-b px-3 py-2">
              <span className="size-2 rounded-full bg-foreground/15" />
              <span className="size-2 rounded-full bg-foreground/15" />
              <span className="size-2 rounded-full bg-foreground/15" />
              <span className="ml-1 font-mono text-[10px] text-muted-foreground">gustavo.ts</span>
            </div>
            <pre className="p-3 font-mono text-[11px] leading-relaxed">
              <span className="text-primary">const</span> dev = {'{'}
              {'\n'}  stack: <span className="text-primary">'full'</span>,
              {'\n'}  base: <span className="text-primary">'Limeira'</span>,
              {'\n'}{'}'}
              <span className="caret ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-primary" />
            </pre>
          </div>
        </div>

        <div aria-hidden className="absolute -left-36 bottom-24 hidden -rotate-6 xl:block" style={layer(16)}>
          <p className="hand text-2xl text-muted-foreground">esse sou eu :)</p>
          <svg viewBox="0 0 120 60" className="ml-16 mt-1 h-12 w-24 overflow-visible text-muted-foreground">
            <path pathLength={1} className="draw" d="M4 4 C 30 40, 70 52, 112 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M100 32 L113 40 L101 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="absolute -bottom-5 right-8 flex gap-2" style={layer(24)}>
          <Logo3 path={siReact.path} hex={siReact.hex} />
          <Logo3 path={siTypescript.path} hex={siTypescript.hex} />
          <Logo3 path={siNestjs.path} hex={siNestjs.hex} />
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-4 sm:px-6 lg:px-8">
      <CodeBackdrop />

      <div className="relative mx-auto grid min-h-svh max-w-6xl items-center gap-14 pb-20 pt-32 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
        <div className="relative">
          <div aria-hidden className="absolute -inset-x-24 -inset-y-20 bg-[radial-gradient(closest-side,var(--background)_60%,transparent)]" />
          <div className="relative">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {profile.role} — {profile.location}
          </p>
          <h1 className="mt-6 text-[2.5rem] font-light leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="line"><span>Desenvolvo sites e</span></span>
            <span className="line"><span style={{ animationDelay: '.08s' }}>sistemas{' '}
              <span className="relative inline-block">
                <em className="serif text-primary">sob medida.</em>
                <svg aria-hidden viewBox="0 0 300 24" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-3 w-[95%] overflow-visible">
                  <path pathLength={1} className="draw" d="M3 15 C 60 6, 120 5, 175 10 S 260 18, 297 7" fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </span></span>
          </h1>
          <p className="reveal in mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground" style={{ transitionDelay: '.3s' }}>
            Sou {profile.name}, {current.role} na {current.company}. Crio interfaces claras e rápidas com React e TypeScript, e as APIs
            por trás delas com NestJS — sempre pensando em quem vai usar e em quem vai manter o código depois.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a href="#projetos" className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-colors hover:bg-primary hover:text-primary-foreground">
                Ver projetos <ArrowDownRight className="size-4" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href={profile.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border bg-card/70 px-6 py-3.5 text-sm font-medium backdrop-blur transition-colors hover:border-foreground/30">
                Falar no WhatsApp <ArrowUpRight className="size-4" />
              </a>
            </Magnetic>
          </div>
          </div>
        </div>

        <Portrait />
      </div>

      <a href="#sobre" aria-label="Rolar para baixo" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block">
        <span className="flex h-9 w-5 justify-center rounded-full border-2 border-muted-foreground/40 pt-1.5">
          <span className="scroll-dot size-1 rounded-full bg-muted-foreground" />
        </span>
      </a>
    </section>
  )
}
