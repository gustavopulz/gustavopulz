import { useEffect, useRef, useState } from 'react'
import { projects, skillGroups } from '../data/content'

const stats = [
  { value: projects.length + 1, suffix: '', label: 'Projetos em destaque' },
  { value: skillGroups.flatMap((g) => g.items).length, suffix: '+', label: 'Tecnologias no dia a dia' },
  { value: 2024, suffix: '', label: 'Na BluePex desde', from: 2000 },
]

function CountUp({ to, from = 0, run }: { to: number; from?: number; run: boolean }) {
  const [v, setV] = useState(from)
  useEffect(() => {
    if (!run) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1600, 1)
      setV(Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, to, from])
  return <>{v}</>
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const [run, setRun] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setRun(true), io.disconnect()), { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="bg-accent">
      <div className="mx-auto grid max-w-6xl divide-y divide-accent-foreground/15 px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6 lg:px-8">
        {stats.map((s) => (
          <div key={s.label} className="px-6 py-12">
            <p className="text-6xl font-light tracking-tight text-accent-foreground tabular-nums">
              <CountUp to={s.value} from={s.from} run={run} />
              {s.suffix}
            </p>
            <p className="mt-3 font-mono text-xs uppercase tracking-widest text-accent-foreground/75">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
