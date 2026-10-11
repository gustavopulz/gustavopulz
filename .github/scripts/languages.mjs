import { writeFileSync } from 'node:fs'

const token = process.env.GH_TOKEN
const out = process.env.OUT ?? 'metrics-languages.svg'
const headers = { accept: 'application/vnd.github+json', 'user-agent': 'languages-svg', ...(token && { authorization: `Bearer ${token}` }) }

async function gh(path) {
  const res = await fetch(`https://api.github.com${path}`, { headers })
  if (!res.ok) throw new Error(`${res.status} ${path}`)
  return res.json()
}

async function repos() {
  const all = []
  const base = token
    ? '/user/repos?affiliation=owner,collaborator,organization_member&per_page=100'
    : `/users/${process.env.GH_USER ?? 'gustavopulz'}/repos?per_page=100`
  for (let page = 1; ; page++) {
    const batch = await gh(`${base}&page=${page}`)
    all.push(...batch)
    if (batch.length < 100) return all
  }
}

const colors = {
  TypeScript: '#3178c6', JavaScript: '#f1e05a', PHP: '#4F5D95', Python: '#3572A5', HTML: '#e34c26', CSS: '#663399',
  SCSS: '#c6538c', Go: '#00ADD8', Java: '#b07219', 'C#': '#178600', 'C++': '#f34b7d', C: '#555555', Shell: '#89e051',
  Dockerfile: '#384d54', PLpgSQL: '#336790', Vue: '#41b883', Lua: '#000080', Rust: '#dea584', Ruby: '#701516', Blade: '#f7523f',
}
const fallback = (name) => `hsl(${[...name].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 0)} 55% 50%)`
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])

const totals = {}
for (const r of (await repos()).filter((r) => !r.fork)) {
  const langs = await gh(`/repos/${r.full_name}/languages`)
  for (const [name, bytes] of Object.entries(langs)) totals[name] = (totals[name] ?? 0) + bytes
}

const sum = Object.values(totals).reduce((a, b) => a + b, 0)
const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1])
const top = sorted.slice(0, 8)
const rest = sorted.slice(8).reduce((a, [, b]) => a + b, 0)
if (rest) top.push(['Outras', rest])

const W = 960, pad = 24, barW = W - pad * 2, cols = 3, colW = barW / cols
let x = pad
const segs = top.map(([name, bytes]) => {
  const w = (bytes / sum) * barW
  const seg = `<rect x="${x.toFixed(2)}" y="64" width="${w.toFixed(2)}" height="12" fill="${colors[name] ?? fallback(name)}"/>`
  x += w
  return seg
}).join('')
const legend = top.map(([name, bytes], i) => {
  const lx = pad + (i % cols) * colW, ly = 112 + Math.floor(i / cols) * 28
  const pct = ((bytes / sum) * 100).toFixed(1).replace('.', ',')
  return `<circle cx="${lx + 5}" cy="${ly - 4}" r="5" fill="${colors[name] ?? fallback(name)}"/><text class="n" x="${lx + 18}" y="${ly}">${esc(name)}</text><text class="p" x="${lx + colW - 24}" y="${ly}" text-anchor="end">${pct}%</text>`
}).join('')
const H = 112 + Math.ceil(top.length / cols) * 28 + 4

writeFileSync(out, `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Linguagens mais usadas">
<style>
text{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif}
.t{font-size:18px;font-weight:600;fill:#0969da}.s{font-size:12px;fill:#59636e}.n{font-size:14px;fill:#1f2328}.p{font-size:14px;fill:#59636e}
@media (prefers-color-scheme:dark){.t{fill:#4493f8}.s,.p{fill:#9198a1}.n{fill:#f0f6fc}}
</style>
<text class="t" x="${pad}" y="32">Linguagens mais usadas</text>
<text class="s" x="${pad}" y="50">Todos os repositórios, públicos e privados, por volume de código</text>
<clipPath id="r"><rect x="${pad}" y="64" width="${barW}" height="12" rx="6"/></clipPath>
<g clip-path="url(#r)">${segs}</g>
${legend}
</svg>
`)
console.log(top.map(([n, b]) => `${n} ${((b / sum) * 100).toFixed(1)}%`).join(', '))
