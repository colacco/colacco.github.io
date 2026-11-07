import githubIcon from '../assets/links/github.svg'
import linkedinIcon from '../assets/links/LinkedIn.svg'
import { useLang } from '../i18n/language-context'
import { useNavItems } from '../hooks/useNavItems'
import { LINKS } from '../i18n/copy'
import { BrandMark } from '../components/shared/BrandMark'

export function Footer() {
  const { t } = useLang()
  const navItems = useNavItems(t)

  return (
    <footer className="border-pf-border border-t pt-12 pb-8">
      <div className="grid grid-cols-1 items-start gap-10 sm:grid-cols-2">
        <div className="flex max-w-95 flex-col gap-3">
          <BrandMark
            label={
              <>
                gabriel<span className="text-pf-accent">.</span>colaco
              </>
            }
          />
          <p className="text-pf-muted max-w-[42ch] text-[13.5px] leading-[1.6] text-pretty">
            {t.heroSub}
          </p>
          <div className="flex items-center gap-3">
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener"
              aria-label="GitHub"
              className="text-pf-muted hover:text-pf-accent inline-flex transition-colors duration-250"
            >
              <img
                src={githubIcon}
                alt=""
                className="h-4.5 w-4.5 dark:invert"
              />
            </a>
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn"
              className="text-pf-muted hover:text-pf-accent inline-flex transition-colors duration-250"
            >
              <img src={linkedinIcon} alt="" className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>

        <nav aria-label="Footer" className="flex flex-col items-center">
          <div className="grid w-64 grid-cols-2 gap-x-10 gap-y-2.5">
            <p className="text-pf-muted col-span-2 text-center font-mono text-[11px] tracking-[0.16em] uppercase">
              {t.footerSections}
            </p>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-pf-muted hover:text-pf-text text-[13.5px] no-underline transition-colors duration-250"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </div>

      <div className="border-pf-border mt-10 flex flex-wrap items-center justify-between gap-2.5 border-t pt-6">
        <p className="text-pf-muted font-mono text-[11px]">
          © 2026 Gabriel Colaço
        </p>
        <p className="text-pf-muted font-mono text-[11px]">{t.footer}</p>
      </div>
    </footer>
  )
}
