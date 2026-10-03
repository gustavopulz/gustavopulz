import type { PointerEvent, ReactNode } from 'react'

function track(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--gx', `${e.clientX - r.left}px`)
  el.style.setProperty('--gy', `${e.clientY - r.top}px`)
}

// 1px frame whose border lights up under the pointer, with a faint inner glow.
export function GlowCard({ children, className = '', inner = '' }: { children: ReactNode; className?: string; inner?: string }) {
  return (
    <div
      onPointerMove={track}
      className={`group relative h-full rounded-2xl bg-border p-px transition-transform duration-300 ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(260px circle at var(--gx) var(--gy), var(--primary), transparent 70%)' }}
      />
      <div className="relative h-full overflow-hidden rounded-[15px] bg-card">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: 'radial-gradient(420px circle at var(--gx) var(--gy), color-mix(in oklab, var(--primary) 9%, transparent), transparent 65%)' }}
        />
        <div className={`relative h-full ${inner}`}>{children}</div>
      </div>
    </div>
  )
}
