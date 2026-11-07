import { useRef, useState } from 'react'
import { motion, useReducedMotion, type PanInfo } from 'motion/react'
import type { ResolvedProject } from '../../data/projects'
import { CARD_GAP } from '../../hooks/useProjectsCarousel'
import { ProjectCard } from './ProjectCard'
import { ProjectsColumn } from './ProjectsColumn'

const SWIPE_DISTANCE = 50
const SWIPE_VELOCITY = 400
const EDGE_RESISTANCE = 0.3

interface ProjectsCarouselProps {
  projects: ResolvedProject[]
  perView: number
  slide: number
  maxSlide: number
  onOpen: (index: number) => void
  onNext: () => void
  onPrev: () => void
}

export function ProjectsCarousel({
  projects,
  perView,
  slide,
  maxSlide,
  onOpen,
  onNext,
  onPrev,
}: ProjectsCarouselProps) {
  const reduced = useReducedMotion()
  const [dragX, setDragX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const isTouch = useRef(false)
  const suppressClick = useRef(false)

  const slideWidth = `(100% - ${(perView - 1) * CARD_GAP}px) / ${perView}`
  const step = `(${slideWidth} + ${CARD_GAP}px)`

  const atEdge = (offset: number) =>
    (slide === 0 && offset > 0) || (slide === maxSlide && offset < 0)

  const handlePanStart = (event: PointerEvent) => {
    isTouch.current = event.pointerType !== 'mouse'
    if (!isTouch.current || maxSlide === 0) return
    suppressClick.current = true
    setDragging(true)
  }

  const handlePan = (_: PointerEvent, info: PanInfo) => {
    if (!isTouch.current || maxSlide === 0) return
    const offset = info.offset.x
    setDragX(atEdge(offset) ? offset * EDGE_RESISTANCE : offset)
  }

  const handlePanEnd = (_: PointerEvent, info: PanInfo) => {
    if (!isTouch.current || maxSlide === 0) return
    const { offset, velocity } = info
    if (offset.x < -SWIPE_DISTANCE || velocity.x < -SWIPE_VELOCITY) onNext()
    else if (offset.x > SWIPE_DISTANCE || velocity.x > SWIPE_VELOCITY) onPrev()
    setDragging(false)
    setDragX(0)
  }

  return (
    <div
      className="-mx-1.5 -mt-2 overflow-hidden px-1.5 pt-2"
      onPointerDownCapture={() => {
        suppressClick.current = false
      }}
      onClickCapture={(event) => {
        if (!suppressClick.current) return
        event.preventDefault()
        event.stopPropagation()
        suppressClick.current = false
      }}
    >
      <motion.div
        className={`flex items-stretch ${perView === 3 && maxSlide === 0 ? 'justify-around' : ''}`}
        style={{ gap: `${CARD_GAP}px`, touchAction: 'pan-y' }}
        animate={{ x: `calc(${-slide} * ${step} + ${dragX}px)` }}
        transition={{
          duration: reduced || dragging ? 0 : 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
      >
        {projects.map((project, i) => (
          <div
            key={project.id}
            className="flex flex-none flex-col items-stretch"
            style={{ flexBasis: `calc(${slideWidth})` }}
          >
            <ProjectCard
              project={project}
              index={i}
              reveal={false}
              onOpen={() => onOpen(i)}
            />
            <ProjectsColumn />
          </div>
        ))}
      </motion.div>
    </div>
  )
}
