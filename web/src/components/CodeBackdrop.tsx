import { useEffect, useRef, type ReactNode } from 'react'

// Real excerpts from this site's own front-end and API.
const COLUMNS = [
  `@Controller('visits')
export class VisitsController {
  constructor(private readonly visits: VisitsService) {}

  @Post()
  @HttpCode(204)
  @Throttle({ default: { ttl: 60_000, limit: 30 } })
  async record(@Body() dto: CreateVisitDto, @Req() req: Request) {
    await this.visits.record({
      path: dto.path,
      referrer: dto.referrer,
      ip: req.ip ?? '',
    })
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard)
  stats(@Query('days') days = 30) {
    return this.visits.stats(Math.min(days, 90))
  }
}`,
  `export function Hero() {
  return (
    <section id="top">
      <h1>
        Desenvolvo sites e
        sistemas sob medida.
      </h1>
      <Magnetic>
        <a href="#projetos">Ver projetos</a>
      </Magnetic>
      <Portrait />
    </section>
  )
}

async login(email: string, password: string) {
  const user = await this.users.findByEmail(email)
  if (!user || !(await compare(password, user.hash))) {
    throw new UnauthorizedException()
  }
  return { accessToken: await this.jwt.signAsync(user) }
}`,
  `@Entity('visits')
export class Visit {
  @PrimaryGeneratedColumn('uuid') id: string
  @Column() path: string
  @Index() @Column() visitorHash: string
  @Index() @CreateDateColumn() createdAt: Date
}

const series = Array.from({ length: days }, (_, i) => {
  const date = addDays(since, i)
  const row = byDate.get(date)
  return { date, views: Number(row?.views ?? 0) }
})

services:
  db:
    image: postgres:17-alpine
    healthcheck:
      test: ["CMD-SHELL", "pg_isready"]`,
]

const TOKEN = /('[^']*'|"[^"]*"|\b(?:export|class|function|return|const|async|await|if|throw|new|private|readonly|import|from)\b|@\w+|\b\d[\d_]*\b)/g

function highlight(code: string) {
  const out: ReactNode[] = []
  let last = 0
  for (const m of code.matchAll(TOKEN)) {
    const i = m.index ?? 0
    if (i > last) out.push(code.slice(last, i))
    const t = m[0]
    const cls = t.startsWith("'") || t.startsWith('"') ? 'text-emerald-600 dark:text-emerald-400' : t.startsWith('@') ? 'text-amber-600 dark:text-amber-400' : /\d/.test(t[0]) ? 'text-rose-500' : 'text-primary'
    out.push(<span key={i} className={cls}>{t}</span>)
    last = i + t.length
  }
  out.push(code.slice(last))
  return out
}

function Columns({ colored }: { colored?: boolean }) {
  return (
    <div className="flex justify-between gap-20 px-8 font-mono text-[13px] leading-[1.9]">
      {COLUMNS.map((c, i) => {
        const text = `${c}\n\n`
        return (
          <pre
            key={i}
            className={`code-scroll shrink-0 ${i === 2 ? 'hidden xl:block' : i === 1 ? 'hidden md:block' : ''}`}
            style={{ animationDuration: `${70 + i * 15}s` }}
          >
            {colored ? highlight(text) : text}
            {colored ? highlight(text) : text}
          </pre>
        )
      })}
    </div>
  )
}

// Faint code that drifts upward; the pointer acts as a flashlight revealing it in color.
export function CodeBackdrop() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    const parent = el?.parentElement
    if (!el || !parent) return
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    const leave = () => el.style.setProperty('--mx', '-999px')
    parent.addEventListener('pointermove', move)
    parent.addEventListener('pointerleave', leave)
    return () => {
      parent.removeEventListener('pointermove', move)
      parent.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 select-none overflow-hidden [--mx:-999px] [--my:-999px] [mask-image:linear-gradient(to_bottom,transparent,#000_15%,#000_75%,transparent)]"
    >
      <div className="absolute inset-0 text-foreground/[0.05]">
        <Columns />
      </div>
      <div
        className="absolute inset-0 text-foreground/45"
        style={{ maskImage: 'radial-gradient(180px circle at var(--mx) var(--my), #000 15%, transparent 100%)', WebkitMaskImage: 'radial-gradient(180px circle at var(--mx) var(--my), #000 15%, transparent 100%)' }}
      >
        <Columns colored />
      </div>
      <div className="grain absolute inset-0" />
    </div>
  )
}
