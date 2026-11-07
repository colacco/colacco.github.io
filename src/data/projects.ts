import ragInfoConcepts from '../assets/projects/rag-info/concepts.jpg'
import ragInfoPresentation from '../assets/projects/rag-info/presentation.jpg'
import pomodoroInuHome from '../assets/projects/pomodoroInu/home-page.jpg'
import pomodoroInuAbout from '../assets/projects/pomodoroInu/about-page.jpg'
import pomodoroInuDiffMedia from '../assets/projects/pomodoroInu/diff-media.jpg'
import eventHubPresentation from '../assets/projects/event-hub/presentation.png'
import eventHubCheckinCertificate from '../assets/projects/event-hub/checkin-certificate.png'
import chromaIcon from '../assets/icons/data/chroma.svg'
import fastapiIcon from '../assets/icons/frameworks-libs/fastapi.svg'
import langchainIcon from '../assets/icons/frameworks-libs/langchain.svg'
import mongodbIcon from '../assets/icons/data/mongodb.svg'
import nestjsIcon from '../assets/icons/frameworks-libs/nestjs.svg'
import ollamaDarkIcon from '../assets/icons/infra/ollama-dark.svg'
import ollamaLightIcon from '../assets/icons/infra/ollama-light.svg'
import postgresqlIcon from '../assets/icons/data/postgresql.svg'
import prismaIcon from '../assets/icons/data/prisma.svg'
import prismaLightIcon from '../assets/icons/data/prisma-light.svg'
import pythonIcon from '../assets/icons/languages/python.svg'
import reactIcon from '../assets/icons/frameworks-libs/react.svg'
import tailwindIcon from '../assets/icons/frameworks-libs/tailwind.svg'
import typescriptIcon from '../assets/icons/languages/typescript.svg'
import htmlIcon from '../assets/icons/languages/HTML5.svg'
import cssIcon from '../assets/icons/languages/CSS3.svg'
import type { Copy, Lang } from '../i18n/copy'

export interface TechTag {
  name: string
  icon: string
  iconLight?: string
}

export interface ProjectMeta {
  id: string
  name: string
  blurb: Record<Lang, string>
  repo: string | null
  cover: string | null
  shots: (string | null)[]
  stack: TechTag[]
}

export const PROJECT_META: ProjectMeta[] = [
  {
    id: 'rag-info',
    name: 'RAG-info',
    blurb: {
      en: 'A local RAG pipeline with document ingestion, embeddings and a React UI.',
      pt: 'Pipeline de RAG local com ingestão de documentos, embeddings e UI em React.',
    },
    repo: 'https://github.com/colacco/RAG-info',
    cover: ragInfoPresentation,
    shots: [ragInfoPresentation, ragInfoConcepts],
    stack: [
      { name: 'Python', icon: pythonIcon },
      { name: 'FastAPI', icon: fastapiIcon },
      { name: 'LangChain', icon: langchainIcon },
      { name: 'MongoDB', icon: mongodbIcon },
      { name: 'Ollama', icon: ollamaDarkIcon, iconLight: ollamaLightIcon },
      { name: 'Chroma', icon: chromaIcon },
    ],
  },
  {
    id: 'pomodoro',
    name: 'Pomodoro Inu',
    blurb: {
      en: 'A Pomodoro study timer with customisable sessions and a cozy Shiba Inu companion to keep you focused.',
      pt: 'Timer de estudos Pomodoro com sessões personalizáveis e um simpático companheiro Shiba Inu para manter o foco.',
    },
    repo: 'https://github.com/colacco/PomodoroInu',
    cover: pomodoroInuHome,
    shots: [pomodoroInuHome, pomodoroInuAbout, pomodoroInuDiffMedia],
    stack: [
      { name: 'React', icon: reactIcon },
      { name: 'TypeScript', icon: typescriptIcon },
      { name: 'Tailwind CSS', icon: tailwindIcon },
      { name: 'HTML', icon: htmlIcon },
      { name: 'CSS', icon: cssIcon },
    ],
  },
  {
    id: 'event-hub',
    name: 'EventHub',
    blurb: {
      en: 'A full-stack event management platform with QR-code check-in and automatic PDF certificate generation.',
      pt: 'Plataforma full-stack de gestão de eventos com check-in via QR code e geração automática de certificados em PDF.',
    },
    repo: 'https://github.com/colacco/EventHub-back',
    cover: eventHubPresentation,
    shots: [eventHubPresentation, eventHubCheckinCertificate],
    stack: [
      { name: 'React', icon: reactIcon },
      { name: 'TypeScript', icon: typescriptIcon },
      { name: 'NestJS', icon: nestjsIcon },
      { name: 'Prisma', icon: prismaIcon, iconLight: prismaLightIcon },
      { name: 'PostgreSQL', icon: postgresqlIcon },
    ],
  },
]

export interface ProjectShot {
  id: string
  src: string | null
  hint: string
}

export interface ResolvedProject extends Omit<ProjectMeta, 'blurb'> {
  blurb: string
  long: string
  coverHint: string
  resolvedShots: ProjectShot[]
}

export function resolveProjects(t: Copy, lang: Lang): ResolvedProject[] {
  return PROJECT_META.map((meta, i) => {
    const copy = t.projects[i]
    return {
      ...meta,
      ...copy,
      blurb: meta.blurb[lang],
      coverHint: `${t.coverHint}${meta.name}`,
      resolvedShots: meta.shots.map((src, k) => ({
        id: `shot-${meta.id}-${k}`,
        src,
        hint: `${t.shotHint}${k + 1} — ${meta.name}`,
      })),
    }
  })
}
