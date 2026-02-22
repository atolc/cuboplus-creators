import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type Lang = 'ES' | 'EN'

const STORAGE_KEY = 'landing-creators-lang'

const translations: Record<Lang, Record<string, string>> = {
  ES: {
    'nav.creators': 'Creadores',
    'nav.directory': 'Directorio',
    'profile.about': 'Acerca de',
    'profile.contact': 'Contacto',
    'profile.skills': 'Habilidades',
    'profile.share': 'Compartir',
    'profile.directory': 'Directorio',
    'tabs.about': 'Sobre mí',
    'tabs.twitter': 'Twitter',
    'tabs.youtube': 'YouTube',
    'hero.headline': 'Soft stories of creators',
    'hero.headlineAccent': 'building on Bitcoin.',
    'hero.description': 'Un directorio editorial inspirado en portafolios personales: claro, humano y enfocado en cada trayectoria. Descubre perfiles, intereses y habilidades de quienes construyen productos y comunidades desde El Salvador.',
    'hero.ctaDirectory': 'Ver directorio',
    'hero.ctaProgram': 'Sobre el programa',
    'hero.stats.cohort': 'Cohort',
    'hero.stats.country': 'País',
    'hero.stats.focus': 'Enfoque',
    'hero.stats.format': 'Formato',
    'grid.subtitle': 'Directorio · Bento',
    'grid.title': 'Personas creativas',
    'grid.titleAccent': 'construyendo en Bitcoin',
    'grid.profiles': 'perfiles',
    'similar.title': 'Perfiles relacionados',
    'footer.description': 'Formando talento creativo y técnico en Bitcoin, Lightning y producto digital desde El Salvador.',
    'header.switchToEnglish': 'Cambiar a Inglés',
    'header.switchToSpanish': 'Switch to Spanish',
    'header.lightMode': 'Cambiar a modo claro',
    'header.darkMode': 'Cambiar a modo oscuro',
  },
  EN: {
    'nav.creators': 'Creators',
    'nav.directory': 'Directory',
    'profile.about': 'About',
    'profile.contact': 'Contact',
    'profile.skills': 'Skills',
    'profile.share': 'Share',
    'profile.directory': 'Directory',
    'tabs.about': 'About me',
    'tabs.twitter': 'Twitter',
    'tabs.youtube': 'YouTube',
    'hero.headline': 'Soft stories of creators',
    'hero.headlineAccent': 'building on Bitcoin.',
    'hero.description': 'An editorial directory inspired by personal portfolios: clear, human, and focused on each journey. Discover profiles, interests, and skills of those building products and communities from El Salvador.',
    'hero.ctaDirectory': 'View directory',
    'hero.ctaProgram': 'About the program',
    'hero.stats.cohort': 'Cohort',
    'hero.stats.country': 'Country',
    'hero.stats.focus': 'Focus',
    'hero.stats.format': 'Format',
    'grid.subtitle': 'Directory · Bento',
    'grid.title': 'Creative people',
    'grid.titleAccent': 'building on Bitcoin',
    'grid.profiles': 'profiles',
    'similar.title': 'Related profiles',
    'footer.description': 'Training creative and technical talent in Bitcoin, Lightning, and digital product from El Salvador.',
    'header.switchToEnglish': 'Switch to English',
    'header.switchToSpanish': 'Switch to Spanish',
    'header.lightMode': 'Switch to light mode',
    'header.darkMode': 'Switch to dark mode',
  },
}

interface LangContextValue {
  lang: Lang
  toggleLang: () => void
  t: (key: string) => string
}

const LangContext = createContext<LangContextValue>({
  lang: 'ES',
  toggleLang: () => {},
  t: (key) => key,
})

function getStoredLang(): Lang {
  if (typeof window === 'undefined') return 'ES'
  const stored = localStorage.getItem(STORAGE_KEY) as Lang | null
  return stored === 'EN' || stored === 'ES' ? stored : 'ES'
}

function setStoredLang(lang: Lang) {
  localStorage.setItem(STORAGE_KEY, lang)
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getStoredLang)

  useEffect(() => {
    setStoredLang(lang)
  }, [lang])

  const toggleLang = () => setLangState((l) => (l === 'ES' ? 'EN' : 'ES'))

  const t = (key: string): string => {
    return translations[lang][key] ?? translations.ES[key] ?? key
  }

  return (
    <LangContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

/** Returns current language, toggle function, and translation helper. */
export function useLang(): LangContextValue {
  return useContext(LangContext)
}
