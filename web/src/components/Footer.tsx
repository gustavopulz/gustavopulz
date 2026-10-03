import { ArrowUp } from 'lucide-react'
import { nav, profile } from '../data/content'
import { Logo } from './Logo'

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
      <p
        aria-hidden
        className="pointer-events-none select-none whitespace-nowrap text-center text-[19vw] font-semibold leading-[0.75] tracking-tighter text-transparent"
        style={{ WebkitTextStroke: '1px var(--border)', backgroundImage: 'linear-gradient(to bottom, var(--secondary), transparent)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}
      >
        gustavopulz
      </p>
    </footer>
  )
}
