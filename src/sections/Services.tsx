import { useLang } from '../i18n/language-context'
import { SERVICE_ICONS } from '../data/services'
import { Reveal } from '../components/ui/Reveal'
import { ServiceRow } from '../components/services/ServiceRow'

export function Services() {
  const { t } = useLang()
  const count = t.services.length

  return (
    <section id="services" aria-labelledby="services-heading" className="scroll-mt-20 pt-15 pb-22.5">
      <Reveal index={0}>
        <div className="@container border-pf-services-border bg-pf-surface shadow-pf-services box-border w-full rounded-[clamp(12px,1.4cqi,16px)] border max-sm:-mx-10 max-sm:w-auto max-sm:rounded-none max-sm:border-x-0 p-[clamp(28px,6cqi,72px)_clamp(20px,6cqi,72px)_clamp(16px,3cqi,40px)]">
          <div className="mb-[clamp(28px,4.5cqi,52px)] flex flex-wrap items-end justify-between gap-[clamp(16px,3cqi,40px)]">
            <div className="max-w-155 flex-[1_1_300px] flex flex-col gap-[clamp(10px,1.6cqi,18px)]">
              <h2
                id="services-heading"
                className="text-pf-services-heading text-[clamp(30px,4.8cqi,56px)] leading-[1.02] font-medium tracking-[-0.03em]"
              >
                {t.servicesTitle}
              </h2>
              <p className="text-pf-services-muted text-[clamp(14px,1.4cqi,16px)] leading-[1.65] text-pretty">
                {t.servicesSub}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="bg-pf-services-accent-soft text-pf-services-accent-deep rounded-full px-2.5 py-1.25 font-mono text-[11px] tracking-[0.08em] uppercase">
                {count} {t.navServices}
              </span>
            </div>
          </div>

          <ol className="m-0 flex list-none flex-col p-0">
            {t.services.map((service, i) => (
              <ServiceRow
                key={service.title}
                index={i}
                title={service.title}
                description={service.body}
                icon={SERVICE_ICONS[i]}
              />
            ))}
          </ol>
          <div
            aria-hidden="true"
            className="h-px"
            style={{ background: 'var(--pf-services-rule-strong-gradient)' }}
          />
        </div>
      </Reveal>
    </section>
  )
}
