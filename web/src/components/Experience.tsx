import { experience } from '../data/content'
import { Reveal } from './Reveal'
import { Section, SectionHeading } from './Section'

export function Experience() {
  return (
    <Section id="experiencia" band>
      <Reveal>
        <SectionHeading label="Experiência">
          Onde estou <em className="serif text-primary">construindo</em> hoje.
        </SectionHeading>
      </Reveal>
      <div className="mt-4">
        {experience.map((e, i) => (
          <Reveal key={e.company} delay={i * 80}>
            <article className="group grid gap-6 border-b py-10 transition-colors md:grid-cols-[1fr_2fr] md:gap-12">
              <div>
                <p className="serif text-6xl text-muted-foreground transition-colors group-hover:text-primary sm:text-7xl">
                  {e.start}<span className="text-3xl"> → hoje</span>
                </p>
                <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">{e.period}</p>
              </div>
              <div>
                <h3 className="text-3xl font-light tracking-tight">{e.company}</h3>
                <p className="mt-1 text-primary">{e.role}</p>
                <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">{e.text}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
