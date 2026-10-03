import type { SimpleIcon } from 'simple-icons'
import {
  siBootstrap,
  siClickhouse,
  siCodeigniter,
  siCss,
  siDocker,
  siGit,
  siGithub,
  siGithubactions,
  siGo,
  siHtml5,
  siJavascript,
  siJsonwebtokens,
  siLinux,
  siMongodb,
  siMysql,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siOpenapiinitiative,
  siOwasp,
  siPhp,
  siPostgresql,
  siPostman,
  siPython,
  siReact,
  siSonarqubeserver,
  siTailwindcss,
  siTypescript,
  siVite,
} from 'simple-icons'

export const profile = {
  name: 'Gustavo Ribeiro Pulz',
  role: 'Desenvolvedor Web',
  location: 'Limeira, SP',
  email: 'pulzgustavo1@gmail.com',
  phone: '(19) 99740-4451',
  phoneHref: 'tel:+5519997404451',
  whatsapp: 'https://wa.me/5519997404451',
  github: 'https://github.com/gustavopulz',
  photo: '/images/avatar.jpg',
}

export const nav = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#experiencia', label: 'Experiência' },
  { href: '#skills', label: 'Skills' },
  { href: '#projetos', label: 'Projetos' },
]

export const experience = [
  {
    company: 'BluePex Cybersecurity',
    role: 'Web Designer',
    start: '2024',
    period: 'Nov 2024 — atual',
    text: 'Criação e manutenção de interfaces web, do layout à implementação, com foco em clareza, performance e consistência visual.',
  },
]

export type Skill = { name: string; icon?: SimpleIcon }

export const skillGroups: { title: string; items: Skill[] }[] = [
  {
    title: 'Front-end',
    items: [
      { name: 'React', icon: siReact },
      { name: 'Next.js', icon: siNextdotjs },
      { name: 'TypeScript', icon: siTypescript },
      { name: 'JavaScript', icon: siJavascript },
      { name: 'TailwindCSS', icon: siTailwindcss },
      { name: 'Bootstrap', icon: siBootstrap },
      { name: 'Vite', icon: siVite },
      { name: 'HTML5', icon: siHtml5 },
      { name: 'CSS', icon: siCss },
    ],
  },
  {
    title: 'Back-end',
    items: [
      { name: 'Node.js', icon: siNodedotjs },
      { name: 'NestJS', icon: siNestjs },
      { name: 'Python', icon: siPython },
      { name: 'Go', icon: siGo },
      { name: 'PHP', icon: siPhp },
      { name: 'CodeIgniter', icon: siCodeigniter },
      { name: 'APIs REST', icon: siOpenapiinitiative },
      { name: 'JWT', icon: siJsonwebtokens },
    ],
  },
  {
    title: 'Bancos de dados',
    items: [
      { name: 'PostgreSQL', icon: siPostgresql },
      { name: 'MySQL', icon: siMysql },
      { name: 'MongoDB', icon: siMongodb },
      { name: 'ClickHouse', icon: siClickhouse },
    ],
  },
  {
    title: 'Ferramentas & DevOps',
    items: [
      { name: 'Git', icon: siGit },
      { name: 'GitHub', icon: siGithub },
      { name: 'GitHub Actions', icon: siGithubactions },
      { name: 'Docker', icon: siDocker },
      { name: 'Postman', icon: siPostman },
      { name: 'VS Code' },
      { name: 'SonarQube', icon: siSonarqubeserver },
      { name: 'Dependency-Check', icon: siOwasp },
      { name: 'Linux', icon: siLinux },
    ],
  },
]

export type Project = {
  name: string
  kind: string
  text: string
  tags: string[]
  features?: string[]
  href?: string
  image?: string
  mockup?: { hue: number; layout: 'hero' | 'grid' }
}

export const featuredProject: Project = {
  name: 'Finance System',
  kind: 'Sistema financeiro · Em produção',
  text: 'Sistema para centralizar contas, pagamentos e compartilhamentos em uma experiência simples e organizada.',
  tags: ['React', 'TypeScript', 'TailwindCSS', 'Vite', 'Next.js', 'PostgreSQL', 'Docker', 'GitHub Actions'],
  features: ['Controle de entradas e saídas', 'Cards e categorias', 'Status de pagamento', 'Dashboard e simulador'],
  href: 'https://finance-system.prxlab.com.br/login',
  image: '/images/finance-system.png',
}

export const projects: Project[] = [
  {
    name: 'ACID/C',
    kind: 'Site institucional',
    text: 'Site da banda tributo ao AC/DC: apresentação, agenda de shows, galeria e contato para contratações.',
    tags: ['React', 'NestJS', 'TailwindCSS', 'Vite', 'PostgreSQL', 'Docker'],
    href: 'https://acidc.com.br',
    image: '/images/acidc.png',
  },
  {
    name: 'PRXLab',
    kind: 'Site institucional',
    text: 'Site da PRXLab, empresa de desenvolvimento de software: serviços, projetos próprios, hospedagem e contato.',
    tags: ['Next.js', 'React', 'TypeScript', 'TailwindCSS'],
    href: 'https://www.prxlab.com.br',
    image: '/images/prxlab.png',
  },
  { name: 'Antonios Brutos', kind: 'Site institucional', text: 'Presença digital com foco em clareza e velocidade.', tags: ['React', 'TypeScript', 'TailwindCSS', 'Vite', 'NestJS', 'PostgreSQL', 'Docker'], mockup: { hue: 22, layout: 'hero' } },
  { name: 'Villa Alema', kind: 'Site institucional', text: 'Layout responsivo com identidade própria.', tags: ['React', 'TypeScript', 'TailwindCSS', 'Vite', 'Next.js', 'PostgreSQL', 'Docker'], mockup: { hue: 150, layout: 'grid' } },
]
