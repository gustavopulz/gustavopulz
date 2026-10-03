import { LogOut } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Logo } from '../components/Logo'
import { clearToken, fetchStats, getToken, UnauthorizedError, type Stats } from '../lib/api'

const RANGES = [7, 30, 90]

function Card({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border bg-card p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-3xl font-bold tabular-nums">{value.toLocaleString('pt-BR')}</p>
    </div>
  )
}

function TopList({ title, rows }: { title: string; rows: { label: string; views: number }[] }) {
  const max = Math.max(1, ...rows.map((r) => r.views))
  return (
    <div className="rounded-2xl border bg-card p-5">
      <h2 className="font-semibold">{title}</h2>
      {rows.length === 0 && <p className="mt-3 text-sm text-muted-foreground">Sem dados ainda.</p>}
      <ul className="mt-3 space-y-3">
        {rows.map((r) => (
          <li key={r.label} className="text-sm">
            <div className="flex justify-between gap-3">
              <span className="truncate">{r.label}</span>
              <span className="tabular-nums text-muted-foreground">{r.views}</span>
            </div>
            <div className="mt-1 h-1.5 rounded bg-secondary">
              <div className="h-full rounded bg-primary" style={{ width: `${(r.views / max) * 100}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Chart({ series }: { series: Stats['series'] }) {
  const max = Math.max(1, ...series.map((d) => d.views))
  return (
    <div className="rounded-2xl border bg-card p-5">
      <h2 className="font-semibold">Visualizações por dia</h2>
      <div className="mt-4 flex h-40 items-end gap-px" role="img" aria-label="Gráfico de visualizações por dia">
        {series.map((d) => (
          <div
            key={d.date}
            title={`${d.date}: ${d.views} visualizações, ${d.visitors} visitantes`}
            className="min-h-0.5 flex-1 rounded-t bg-primary/80 transition hover:bg-primary"
            style={{ height: `${(d.views / max) * 100}%` }}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        <span>{series[0]?.date}</span>
        <span>{series[series.length - 1]?.date}</span>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [days, setDays] = useState(30)
  const [stats, setStats] = useState<Stats | null>(null)
  const [error, setError] = useState('')
  const authed = Boolean(getToken())

  useEffect(() => {
    if (!authed) return
    let cancelled = false
    fetchStats(days)
      .then((s) => !cancelled && (setStats(s), setError('')))
      .catch((err) => {
        if (cancelled) return
        if (err instanceof UnauthorizedError) {
          clearToken()
          navigate('/admin/login', { replace: true })
        } else setError(err.message)
      })
    return () => {
      cancelled = true
    }
  }, [days, authed, navigate])

  if (!authed) return <Navigate to="/admin/login" replace />

  function logout() {
    clearToken()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-8">
      <header className="flex items-center justify-between">
        <Logo className="text-xl" />
        <button onClick={logout} className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-card hover:text-foreground">
          <LogOut size={16} /> Sair
        </button>
      </header>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Visitas</h1>
        <div className="inline-flex rounded-lg border p-0.5">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setDays(r)}
              className={`rounded-md px-3 py-1 text-sm transition ${days === r ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {r} dias
            </button>
          ))}
        </div>
      </div>

      {error && <p role="alert" className="mt-6 text-red-400">{error}</p>}
      {!stats && !error && <p className="mt-6 text-muted-foreground">Carregando…</p>}

      {stats && (
        <div className="mt-6 space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card label="Visualizações" value={stats.views} />
            <Card label="Visitantes únicos (por dia)" value={stats.visitors} />
          </div>
          <Chart series={stats.series} />
          <div className="grid gap-5 md:grid-cols-2">
            <TopList title="Páginas mais vistas" rows={stats.topPaths.map((p) => ({ label: p.path, views: p.views }))} />
            <TopList title="Origens" rows={stats.topReferrers.map((r) => ({ label: r.referrer, views: r.views }))} />
          </div>
        </div>
      )}
    </div>
  )
}
