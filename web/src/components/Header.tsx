import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { nav } from '../data/content'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const bar = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`
    }
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    document.querySelectorAll('main section[id]').forEach((s) => io.observe(s))

    return () => {
      removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div className="pointer-events-auto w-full max-w-4xl">
        <nav aria-label="Navegação principal" className="relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl border bg-background/60 px-4 py-2 shadow-lg shadow-black/5 backdrop-blur-xl">
          <a href="#top" aria-label="Início" onClick={() => setOpen(false)} className="flex items-center">
            <Logo />
          </a>
          <div className="hidden items-center gap-1 md:flex">
            {nav.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`rounded-lg px-3 py-1.5 text-[13px] tracking-wide transition-colors hover:text-foreground ${active === l.href ? 'bg-secondary text-foreground' : 'text-muted-foreground'}`}
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <a href="#contato" className="hidden rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-primary hover:text-primary-foreground sm:inline-flex">
              Contato
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={open}
              className="grid size-9 place-items-center rounded-lg hover:bg-secondary md:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
          <span ref={bar} aria-hidden className="absolute inset-x-0 bottom-0 h-px origin-left bg-primary" style={{ transform: 'scaleX(0)' }} />
        </nav>
        {open && (
          <div className="mt-2 rounded-2xl border bg-background/95 p-2 shadow-xl shadow-black/5 backdrop-blur-xl md:hidden">
            {[...nav, { href: '#contato', label: 'Contato' }].map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-muted-foreground hover:bg-secondary hover:text-foreground">
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
