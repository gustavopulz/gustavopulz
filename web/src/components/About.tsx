import { Reveal } from './Reveal'
import { GlowCard } from './GlowCard'
import { Section, SectionHeading } from './Section'

const steps = [
  { n: '01', title: 'Entender', text: 'Antes do código, entender o problema, quem vai usar e o que precisa funcionar no primeiro dia.' },
  { n: '02', title: 'Desenhar', text: 'Layout claro, responsivo e com hierarquia. Nada de enfeite que atrapalhe o uso.' },
  { n: '03', title: 'Construir', text: 'Front em React, API em NestJS, banco bem modelado e código que outra pessoa consegue ler.' },
  { n: '04', title: 'Entregar', text: 'Docker, CI, análise de qualidade e segurança. Publicado, monitorado e pronto para evoluir.' },
]

export function About() {
  return (
    <Section id="sobre">
      <Reveal>
        <SectionHeading
          label="Sobre"
          aside="Desenvolvedor web em Limeira, SP. Gosto de transformar ideias em produtos fáceis de usar e de manter."
        >
          Do layout à API, <em className="serif text-primary">sem complicar.</em>
        </SectionHeading>
      </Reveal>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 80} className="h-full">
            <GlowCard inner="p-5">
              <h3 className="flex items-baseline gap-2.5 text-xl font-light tracking-tight">
                <span className="font-mono text-xs text-primary">{s.n}</span>
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
