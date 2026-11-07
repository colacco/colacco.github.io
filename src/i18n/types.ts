export type Lang = 'en' | 'pt'

export interface StatCopy {
  label: string
}

export interface ServiceCopy {
  title: string
  body: string
}

export interface ProjectCopy {
  long: string
}

export type TimelineType = 'trabalho' | 'educacao'

export interface TimelineEntry {
  id: string
  type: TimelineType
  period: string
  kind: string
  role: string
  org: string
  body: string
}

export interface NavCopy {
  navAbout: string
  navProjects: string
  navSkills: string
  navServices: string
  navExperience: string
  navContact: string
}

export interface HeroCopy {
  heroHello: string
  heroTagline: string
  heroSub: string
  heroCtaAbout: string
  heroRun: string
  heroRunShort: string
  heroViewProjects: string
  heroScroll: string
  ctaEmail: string
}

export interface AboutCopy {
  aboutTitle: string
  aboutBody: string
}

export interface ProjectsCopy {
  projectsTitle: string
  projectsSub: string
  viewShots: string
  viewCode: string
  viewAllProjects: string
  viewAllProjectsShort: string
  projects: ProjectCopy[]
}

export interface SkillsCopy {
  skillsTitle: string
  skillsLanguages: string
  skillsFrameworks: string
  skillsData: string
  skillsInfrastructure: string
}

export interface ServicesCopy {
  servicesTitle: string
  servicesSub: string
  servicesTag: string
  services: ServiceCopy[]
}

export interface ExperienceCopy {
  experienceTitle: string
  experienceTabWork: string
  experienceTabEducation: string
  timeline: TimelineEntry[]
}

export interface ContactCopy {
  contactTitle: string
  contactBody: string
  contactHint: string
}

export interface FooterCopy {
  footerSections: string
  footer: string
}

export interface MiscCopy {
  coverHint: string
  shotHint: string
  stats: StatCopy[]
}

export interface Copy
  extends NavCopy,
    HeroCopy,
    AboutCopy,
    ProjectsCopy,
    SkillsCopy,
    ServicesCopy,
    ExperienceCopy,
    ContactCopy,
    FooterCopy,
    MiscCopy {}
