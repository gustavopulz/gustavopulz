import { ArrowUpRight, Copy, Check } from 'lucide-react'
import { useState, type PointerEvent } from 'react'
import { profile } from '../data/content'
import { Magnetic } from './Magnetic'
import { Reveal } from './Reveal'

function track(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--cx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--cy', `${e.clientY - r.top}px`)
}

export function Contact() {
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contato" className="scroll-mt-24 px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <Reveal className="mx-auto max-w-6xl">
        <div
          onPointerMove={track}
          className="group relative overflow-hidden rounded-[2rem] bg-foreground px-6 py-16 text-background sm:px-14 sm:py-20"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: 'radial-gradient(500px circle at var(--cx, 80%) var(--cy, 20%), color-mix(in oklab, var(--primary) 55%, transparent), transparent 70%)' }}
          />
          <div className="relative">
            <p className="font-mono text-xs uppercase tracking-widest opacity-60">Contato</p>
            <h2 className="mt-6 max-w-3xl text-5xl font-light leading-[1.02] tracking-tight sm:text-7xl">
              Tem um projeto? <em className="serif">Vamos conversar.</em>
            </h2>

            <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Magnetic>
                <a href={profile.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
                  Chamar no WhatsApp <ArrowUpRight className="size-4" />
                </a>
              </Magnetic>
              <button onClick={copyEmail} className="inline-flex items-center gap-2 rounded-full border border-background/25 px-6 py-3.5 text-sm font-medium transition-colors hover:border-background/60">
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                {copied ? 'E-mail copiado!' : profile.email}
              </button>
            </div>

            <dl className="mt-16 grid gap-6 border-t border-background/15 pt-8 text-sm sm:grid-cols-3">
              {[
                ['Telefone', profile.phone, profile.phoneHref],
                ['E-mail', profile.email, `mailto:${profile.email}`],
                ['Base', profile.location, undefined],
              ].map(([label, value, href]) => (
                <div key={label}>
                  <dt className="font-mono text-[11px] uppercase tracking-widest opacity-50">{label}</dt>
                  <dd className="mt-1.5 truncate">{href ? <a href={href} className="hover:underline">{value}</a> : value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
