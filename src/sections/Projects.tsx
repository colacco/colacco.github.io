import { useEffect, useMemo, useState } from 'react'
import { useLang } from '../i18n/language-context'
import { LINKS } from '../i18n/copy'
import { resolveProjects } from '../data/projects'
import { useProjectsCarousel } from '../hooks/useProjectsCarousel'
import { ProjectModal } from '../components/projects/ProjectModal'
import { ProjectsBackdrop } from '../components/projects/ProjectsBackdrop'
import { ProjectsCarousel } from '../components/projects/ProjectsCarousel'
import { Reveal } from '../components/ui/Reveal'

const ARROW =
  'inline-flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-full border border-[rgba(196,188,255,.4)] text-[#e6e2ff] transition-colors duration-250 hover:border-[#c3b9ff] hover:bg-[rgba(196,188,255,.16)] disabled:cursor-default disabled:opacity-40 disabled:hover:border-[rgba(196,188,255,.4)] disabled:hover:bg-transparent'

interface ProjectsProps {
  onModalOpenChange?: (isOpen: boolean) => void
}

export function Projects({ onModalOpenChange }: ProjectsProps = {}) {
  const { t, lang } = useLang()
  const projects = useMemo(() => resolveProjects(t, lang), [t, lang])
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { perView, slide, maxSlide, next, prev } = useProjectsCarousel(
    projects.length,
  )

  const open = openIndex === null ? null : projects[openIndex]

  useEffect(() => {
    onModalOpenChange?.(open !== null)
  }, [open, onModalOpenChange])

  return (
    <section
      id="projects"
      className="relative scroll-mt-20 pt-[clamp(60px,8vw,96px)]"
    >
      <ProjectsBackdrop />

      <div className="relative z-1">
        <Reveal index={1}>
          <h2 className="mb-2.5 text-[clamp(28px,3.6vw,40px)] tracking-[-0.03em] text-[#f4f2ff]">
            {t.projectsTitle}
          </h2>
        </Reveal>
        <Reveal index={2}>
          <div className="mb-12 flex flex-wrap items-center justify-between gap-5">
            <p className="max-w-[52ch] flex-1 basis-[320px] text-base text-[#b9b2e0]">
              {t.projectsSub}
            </p>
            <div className="flex flex-none items-center gap-4">
              {maxSlide > 0 && (
                <div className="flex items-center gap-2">
                  <span className="mr-1 font-mono text-[11px] text-[#b9b2e0]">
                    {slide + 1} / {maxSlide + 1}
                  </span>
                  <button
                    type="button"
                    onClick={prev}
                    disabled={slide === 0}
                    aria-label="Previous projects"
                    className={ARROW}
                  >
                    <i className="ph ph-caret-left" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    disabled={slide === maxSlide}
                    aria-label="Next projects"
                    className={ARROW}
                  >
                    <i className="ph ph-caret-right" aria-hidden="true" />
                  </button>
                </div>
              )}
              <a
                href={`${LINKS.github}?tab=repositories`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(196,188,255,.4)] px-4 py-2 text-sm text-[#e6e2ff] transition-colors duration-250 hover:border-[#c3b9ff] hover:bg-[rgba(196,188,255,.16)]"
              >
                <span className="hidden md:inline">{t.viewAllProjects}</span>
                <span className="md:hidden">{t.viewAllProjectsShort}</span>
                <i className="ph ph-arrow-up-right" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal index={3}>
          <ProjectsCarousel
            projects={projects}
            perView={perView}
            slide={slide}
            maxSlide={maxSlide}
            onOpen={setOpenIndex}
            onNext={next}
            onPrev={prev}
          />
        </Reveal>
      </div>

      <ProjectModal project={open} onClose={() => setOpenIndex(null)} />
    </section>
  )
}
