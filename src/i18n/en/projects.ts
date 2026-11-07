import type { ProjectsCopy } from '../types'

export const projects: ProjectsCopy = {
  projectsTitle: 'Selected projects',
  projectsSub:
    'Personal projects where I test architecture ideas end to end. Click a card to open the screenshot carousel.',
  viewShots: 'Screenshots',
  viewCode: 'View code',
  viewAllProjects: 'View more projects',
  viewAllProjectsShort: 'More Projects',
  projects: [
    {
      long: 'A local RAG pipeline: document ingestion, embedding with Ollama and grounded answers. Built with FastAPI, LangChain, MongoDB and React.',
    },
    {
      long: 'Pomodoro Inu: a study timer with customisable study/break/session cycles. A friendly Shiba Inu keeps you company through every cycle, built with React, TypeScript and Tailwind CSS.',
    },
    {
      long: 'EventHub is an academic event management platform for participants and administrators: event creation and browsing, registration, QR-code-based check-in, and automatic PDF certificate generation with authenticity validation. Built with a React + TypeScript + Tailwind frontend and a NestJS + Prisma + PostgreSQL backend.',
    },
  ],
}
