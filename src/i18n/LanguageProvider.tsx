import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { COPY } from './copy'
import type { Lang } from './copy'
import { LanguageContext } from './language-context'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('pt')

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
  }, [lang])

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'pt' : 'en'))
  }, [])

  const value = useMemo(
    () => ({ lang, t: COPY[lang], toggleLang }),
    [lang, toggleLang],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
