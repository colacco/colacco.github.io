import { useLang } from '../i18n/language-context'
import { useTypedHero } from '../hooks/useTypedHero'
import { Reveal } from '../components/ui/Reveal'
import { HeroBackdrop } from '../components/hero/HeroBackdrop'
import { HeroIntro } from '../components/hero/HeroIntro'
import { HeroCodePanel } from '../components/hero/HeroCodePanel'
import { HeroScrollHint } from '../components/hero/HeroScrollHint'

const NAME = 'Gabriel\nColaço'

export function Hero() {
  const { t } = useLang()
  const { name, sub, phase } = useTypedHero(NAME, t.heroSub)

  return (
    <section
      className="relative z-1 flex min-h-screen items-center overflow-hidden px-6 pt-20 pb-10 sm:pt-[clamp(76px,14vh,128px)] sm:pb-[clamp(24px,7vh,68px)]"
      style={{ background: 'var(--pf-hero-bg)' }}
    >
      <HeroBackdrop />

      <div className="relative mx-auto grid w-full max-w-290 grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] items-center gap-3 sm:gap-[clamp(38px,5vw,68px)]">
        <HeroIntro t={t} name={name} sub={sub} phase={phase} />

        <Reveal index={5} className="min-w-0">
          <HeroCodePanel runLabel={t.heroRun} runShortLabel={t.heroRunShort} />
        </Reveal>
      </div>

      <HeroScrollHint label={t.heroScroll} />
    </section>
  )
}
