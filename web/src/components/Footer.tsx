import { useLayoutEffect, useRef, type PointerEvent } from 'react'
import { ArrowUp } from 'lucide-react'
import { nav, profile } from '../data/content'
import { Logo } from './Logo'
import { Socials } from './Socials'

// Scales the wordmark so its glyph bounds touch every edge of the screen at any width.
function Wordmark() {
  const text = useRef<SVGTextElement>(null)
  const svg = useRef<SVGSVGElement>(null)
  const glow = useRef<SVGRadialGradientElement>(null)

  useLayoutEffect(() => {
    const fit = () => {
      if (!text.current || !svg.current) return
      const ctx = document.createElement('canvas').getContext('2d')
      if (!ctx) return
      ctx.font = `600 150px ${getComputedStyle(text.current).fontFamily}`
      ctx.letterSpacing = '-6px'
      const m = ctx.measureText('gustavopulz')
      const top = 120 - m.actualBoundingBoxAscent
      svg.current.setAttribute('viewBox', `${-m.actualBoundingBoxLeft} ${top} ${m.actualBoundingBoxLeft + m.actualBoundingBoxRight} ${m.actualBoundingBoxAscent + m.actualBoundingBoxDescent}`)
    }
    fit()
    void document.fonts.ready.then(fit)
  }, [])

  function track(e: PointerEvent<SVGSVGElement>) {
    const el = e.currentTarget
    const ctm = el.getScreenCTM()
    if (!ctm || !glow.current) return
    const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse())
    glow.current.setAttribute('cx', String(pt.x))
    glow.current.setAttribute('cy', String(pt.y))
    glow.current.setAttribute('fx', String(pt.x))
    glow.current.setAttribute('fy', String(pt.y))
  }

  return (
    <svg ref={svg} aria-hidden viewBox="0 0 800 160" onPointerMove={track} className="group mt-6 block w-full select-none">
      <defs>
        <linearGradient id="wm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--secondary)" }} />
          <stop offset="1" style={{ stopColor: "transparent" }} />
        </linearGradient>
        <radialGradient ref={glow} id="wm-glow" gradientUnits="userSpaceOnUse" cx="400" cy="80" fx="400" fy="80" r="260">
          <stop offset="0" style={{ stopColor: "var(--primary)" }} />
          <stop offset="1" style={{ stopColor: "var(--primary)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>
      <text ref={text} x="0" y="120" fontSize="150" fontWeight="600" letterSpacing="-6" strokeWidth="2" strokeLinejoin="round" style={{ fill: "var(--border)", stroke: "var(--border)", fontFamily: "inherit" }}>
        gustavopulz
      </text>
      <text x="0" y="120" fontSize="150" fontWeight="600" letterSpacing="-6" style={{ fill: "var(--card)", fontFamily: "inherit" }}>
        gustavopulz
      </text>
      <text x="0" y="120" fontSize="150" fontWeight="600" letterSpacing="-6" fill="url(#wm)" style={{ fontFamily: "inherit" }}>
        gustavopulz
      </text>
      <text x="0" y="120" fontSize="150" fontWeight="600" letterSpacing="-6" fill="url(#wm-glow)" strokeOpacity="0.5" strokeWidth="1" className="opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ stroke: "var(--primary)", fontFamily: "inherit" }}>
        gustavopulz
      </text>
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t bg-card">
      <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Desenvolvedor web em {profile.location}. Sites e sistemas com foco em clareza e manutenção.
            </p>
            <div className="mt-6"><Socials /></div>
          </div>
          <div className="flex gap-16">
            <ul className="space-y-3 text-sm">
              {nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-muted-foreground transition-colors hover:text-foreground">{l.label}</a>
                </li>
              ))}
            </ul>
            <ul className="space-y-3 text-sm">
              <li><a href={profile.whatsapp} target="_blank" rel="noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">WhatsApp</a></li>
              <li><a href={`mailto:${profile.email}`} className="text-muted-foreground transition-colors hover:text-foreground">E-mail</a></li>
              <li><a href={profile.github} target="_blank" rel="noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex items-center justify-between border-t py-6 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
            Voltar ao topo <ArrowUp className="size-3.5" />
          </a>
        </div>
      </div>
      <Wordmark />
    </footer>
  )
}
