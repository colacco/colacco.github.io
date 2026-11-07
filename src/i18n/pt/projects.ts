import type { ProjectsCopy } from '../types'

export const projects: ProjectsCopy = {
  projectsTitle: 'Projetos selecionados',
  projectsSub:
    'Projetos pessoais onde testo ideias de arquitetura de ponta a ponta. Clique em um card para abrir o carrossel de screenshots.',
  viewShots: 'Screenshots',
  viewCode: 'Ver código',
  viewAllProjects: 'Ver mais projetos',
  viewAllProjectsShort: 'Mais projetos',
  projects: [
    {
      long: 'Pipeline de RAG local: ingestão de documentos, embedding com Ollama e respostas fundamentadas. Construído com FastAPI, LangChain, MongoDB e React.',
    },
    {
      long: 'Pomodoro Inu: timer de estudos com ciclos personalizáveis de estudo/pausa/sessões. Um simpático cachorro Shiba Inu faz companhia a cada ciclo, construído com React, TypeScript e Tailwind CSS.',
    },
    {
      long: 'EventHub é uma plataforma acadêmica de gestão de eventos para participantes e administradores: criação e navegação de eventos, inscrições, check-in via QR code e geração automática de certificados em PDF com validação de autenticidade. Construído com frontend em React + TypeScript + Tailwind e backend em NestJS + Prisma + PostgreSQL.',
    },
  ],
}
