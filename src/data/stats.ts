export interface StatMeta {
  value: number
  suffix: string
}

function yearsSince(date: Date): number {
  const now = new Date()
  let years = now.getFullYear() - date.getFullYear()
  const monthDiff = now.getMonth() - date.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < date.getDate())) {
    years -= 1
  }
  return years
}

export const STAT_META: StatMeta[] = [
  { value: 5, suffix: '+' },
  { value: yearsSince(new Date(2024, 0, 1)), suffix: '+' },
  { value: yearsSince(new Date(2025, 3, 1)), suffix: '+' }, 
]
