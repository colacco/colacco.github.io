import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n/language-context'
import { useTheme } from '../theme/theme-context'
import { useNavItems } from '../hooks/useNavItems'
import { LINKS } from '../i18n/copy'
import { BrandMark } from '../components/shared/BrandMark'
import { DesktopNav } from '../components/header/DesktopNav'
import { HeaderGithubLink } from '../components/header/HeaderGithubLink'
import { SettingsMenu } from '../components/header/SettingsMenu'
import { MobileMenuToggle } from '../components/header/MobileMenuToggle'
import { MobileMenu } from '../components/header/MobileMenu'

const OVERLAY_TRANSITION_MS = 280

interface HeaderProps {
  hidden?: boolean
}

export function Header({ hidden = false }: HeaderProps) {
  const { t, lang, toggleLang } = useLang()
  const { theme, toggleTheme } = useTheme()
  const [menuMounted, setMenuMounted] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)
  const [settingsMounted, setSettingsMounted] = useState(false)
  const [settingsVisible, setSettingsVisible] = useState(false)
  const settingsRef = useRef<HTMLDivElement>(null)

  const navItems = useNavItems(t)

  const menuFrame1 = useRef<number | null>(null)
  const menuFrame2 = useRef<number | null>(null)
  const menuTimeout = useRef<number | null>(null)
  const settingsFrame1 = useRef<number | null>(null)
  const settingsFrame2 = useRef<number | null>(null)
  const settingsTimeout = useRef<number | null>(null)

  const clearMenuTimers = () => {
    if (menuFrame1.current !== null) cancelAnimationFrame(menuFrame1.current)
    if (menuFrame2.current !== null) cancelAnimationFrame(menuFrame2.current)
    if (menuTimeout.current !== null) window.clearTimeout(menuTimeout.current)
    menuFrame1.current = null
    menuFrame2.current = null
    menuTimeout.current = null
  }

  const clearSettingsTimers = () => {
    if (settingsFrame1.current !== null) cancelAnimationFrame(settingsFrame1.current)
    if (settingsFrame2.current !== null) cancelAnimationFrame(settingsFrame2.current)
    if (settingsTimeout.current !== null) window.clearTimeout(settingsTimeout.current)
    settingsFrame1.current = null
    settingsFrame2.current = null
    settingsTimeout.current = null
  }

  const openMenu = () => {
    clearMenuTimers()
    setMenuMounted(true)
    menuFrame1.current = requestAnimationFrame(() => {
      menuFrame2.current = requestAnimationFrame(() => setMenuVisible(true))
    })
  }

  const closeMenu = () => {
    clearMenuTimers()
    setMenuVisible(false)
    menuTimeout.current = window.setTimeout(() => setMenuMounted(false), OVERLAY_TRANSITION_MS)
  }

  const openSettings = () => {
    clearSettingsTimers()
    setSettingsMounted(true)
    settingsFrame1.current = requestAnimationFrame(() => {
      settingsFrame2.current = requestAnimationFrame(() => setSettingsVisible(true))
    })
  }

  const closeSettings = () => {
    clearSettingsTimers()
    setSettingsVisible(false)
    settingsTimeout.current = window.setTimeout(() => setSettingsMounted(false), OVERLAY_TRANSITION_MS)
  }

  useEffect(() => {
    return () => {
      clearMenuTimers()
      clearSettingsTimers()
    }
  }, [])

  useEffect(() => {
    if (!menuMounted) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuMounted])

  useEffect(() => {
    if (!settingsMounted) return
    const handlePointerDown = (event: PointerEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        closeSettings()
      }
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [settingsMounted])

  return (
    <>
      <header
        aria-hidden={hidden}
        className={`border-pf-border fixed top-3 left-1/2 z-60 -translate-x-1/2 rounded-full border px-5 py-2 shadow-pf backdrop-blur-[14px] transition-opacity duration-250 ${
          hidden ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
        style={{
          background: 'color-mix(in srgb, var(--pf-bg) 78%, transparent)',
          width: 'min(960px, calc(100vw - 24px))',
        }}
      >
        <nav aria-label="Primary" className="relative mx-auto flex max-w-290 items-center gap-4">
          <BrandMark
            className="text-pf-text flex flex-none items-center gap-2.5 no-underline"
            label={
              <>
                colaco
              </>
            }
          />

          <div className="flex-1" />

          <DesktopNav navItems={navItems} />

          <div className="hidden flex-none items-center gap-3 md:flex">
            <HeaderGithubLink href={LINKS.github} />
            <SettingsMenu
              containerRef={settingsRef}
              lang={lang}
              theme={theme}
              mounted={settingsMounted}
              visible={settingsVisible}
              onToggle={() => (settingsMounted ? closeSettings() : openSettings())}
              toggleLang={toggleLang}
              toggleTheme={toggleTheme}
            />
          </div>

          <MobileMenuToggle
            lang={lang}
            mounted={menuMounted}
            visible={menuVisible}
            onClick={() => (menuMounted ? closeMenu() : openMenu())}
          />
        </nav>
      </header>

      <MobileMenu
        mounted={menuMounted}
        visible={menuVisible}
        onClose={closeMenu}
        navItems={navItems}
        githubHref={LINKS.github}
        lang={lang}
        theme={theme}
        toggleLang={toggleLang}
        toggleTheme={toggleTheme}
      />
    </>
  )
}
