import type { SimpleIcon } from 'simple-icons'
import {
  siBootstrap,
  siClickhouse,
  siCodeigniter,
  siCss,
  siDiscord,
  siDocker,
  siGit,
  siGithub,
  siGithubactions,
  siGmail,
  siGo,
  siHtml5,
  siInstagram,
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
  linkedin: 'https://www.linkedin.com/in/gustavopulz/',
  instagram: 'https://www.instagram.com/ghostsdev/',
  discord: 'ghostsfps',
  photo: '/images/avatar.jpg',
}

export const socials: { name: string; href?: string; copy?: string; icon?: SimpleIcon; path?: string }[] = [
  { name: 'GitHub', href: profile.github, icon: siGithub },
  { name: 'LinkedIn', href: profile.linkedin, path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  { name: 'Instagram', href: profile.instagram, icon: siInstagram },
  { name: 'E-mail', href: `mailto:${profile.email}`, icon: siGmail },
  { name: 'Discord', copy: profile.discord, icon: siDiscord },
]

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
    icon: '/images/bluepex-icon.png',
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
}

export const featuredProject: Project = {
  name: 'Finance System',
  kind: 'Sistema financeiro',
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
    href: 'https://prxlab.com.br',
    image: '/images/prxlab.png',
  },
  { name: 'BRG Mancais', kind: 'Site institucional', text: 'Site da BRG Mancais: soluções técnicas e projetos especiais em engenharia, fundição e usinagem, com catálogo de produtos e contato.', tags: ['React', 'TypeScript', 'TailwindCSS', 'Vite', 'NestJS', 'PostgreSQL', 'Docker'], href: 'https://www.brgmancais.com.br', image: '/images/brgmancais.png' },
  { name: 'Villa Alema', kind: 'Site institucional', text: 'Layout responsivo com identidade própria.', tags: ['React', 'TypeScript', 'TailwindCSS', 'Vite', 'Next.js', 'PostgreSQL', 'Docker'], href: 'https://villaalema.com.br', image: '/images/villaalema.png' },
]
