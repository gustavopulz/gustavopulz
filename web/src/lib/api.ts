const API = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'
const TOKEN_KEY = 'pulz_token'

export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const clearToken = () => localStorage.removeItem(TOKEN_KEY)

export type Stats = {
  days: number
  views: number
  visitors: number
  series: { date: string; views: number; visitors: number }[]
  topPaths: { path: string; views: number }[]
  topReferrers: { referrer: string; views: number }[]
}

export class UnauthorizedError extends Error {}

export function trackVisit(path: string) {
  fetch(`${API}/visits`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path, referrer: document.referrer || undefined }),
    keepalive: true,
  }).catch(() => {})
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (res.status === 429) throw new Error('Muitas tentativas. Aguarde um minuto.')
  if (!res.ok) throw new Error('E-mail ou senha inválidos.')
  const { accessToken } = (await res.json()) as { accessToken: string }
  localStorage.setItem(TOKEN_KEY, accessToken)
}

export async function fetchStats(days: number): Promise<Stats> {
  const res = await fetch(`${API}/visits/stats?days=${days}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  })
  if (res.status === 401) throw new UnauthorizedError()
  if (!res.ok) throw new Error('Falha ao carregar estatísticas.')
  return res.json()
}
