import type { ReactNode } from 'react'

export function Section({ id, band = false, children }: { id?: string; band?: boolean; children: ReactNode }) {
  return (
    <section id={id} className={`relative scroll-mt-24 px-4 py-24 sm:px-6 sm:py-28 lg:px-8 ${band ? 'border-y bg-card' : ''}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}

export function SectionHeading({ label, children, aside }: { label: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="flex flex-col justify-between gap-6 border-b pb-8 md:flex-row md:items-end">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-primary">{label}</p>
        <h2 className="mt-4 max-w-2xl text-balance text-4xl font-light tracking-tight sm:text-5xl md:leading-[1.05]">{children}</h2>
      </div>
      {aside && <div className="max-w-sm text-muted-foreground">{aside}</div>}
    </div>
  )
}
