import { localizePath } from '../i18n/paths.ts'
import type { Locale } from '../i18n/locales.ts'

export type RouteKey = 'home' | 'about' | 'athletes' | 'contact'

export interface RouteMeta {
  path: string
  title: string
  description: string
  ogImage: string
}

const DEFAULT_OG_IMAGE = '/og-image.jpg'

const ROUTE_BASE_PATHS: Record<RouteKey, string> = {
  home: '/',
  about: '/sobre',
  athletes: '/atletas',
  contact: '/contato',
}

export const ROUTE_KEYS: RouteKey[] = ['home', 'about', 'athletes', 'contact']

interface RouteSeoText {
  title: string
  description: string
}

// Kept self-contained (no import from the dictionaries) so this module stays
// resolvable both from the app bundle and from the Node-side sitemap script.
const ROUTE_SEO: Record<Locale, Record<RouteKey, RouteSeoText>> = {
  pt: {
    home: {
      title: 'Urbini Global Sports — Gestão de Carreiras no Futebol',
      description:
        'A Urbini Global Sports gerencia carreiras de atletas de futebol, conectando talento a oportunidades com estratégia, transparência e cuidado integral.',
    },
    about: {
      title: 'Sobre nós — Urbini Global Sports',
      description:
        'Conheça a história, missão, valores e os diferenciais da Urbini Global Sports na gestão de carreiras de atletas de futebol.',
    },
    athletes: {
      title: 'Atletas — Urbini Global Sports',
      description: 'Conheça o portfólio de atletas agenciados pela Urbini Global Sports, filtrando por posição em campo.',
    },
    contact: {
      title: 'Contato — Urbini Global Sports',
      description:
        'Fale com a Urbini Global Sports para saber mais sobre gestão de carreira, parcerias ou representação de atletas.',
    },
  },
  it: {
    home: {
      title: 'Urbini Global Sports — Gestione di Carriere nel Calcio',
      description:
        'Urbini Global Sports gestisce le carriere di atleti di calcio, collegando il talento alle opportunità con strategia, trasparenza e cura a 360 gradi.',
    },
    about: {
      title: 'Chi siamo — Urbini Global Sports',
      description:
        'Scopri la storia, la missione, i valori e i punti di forza di Urbini Global Sports nella gestione di carriere di atleti di calcio.',
    },
    athletes: {
      title: 'Atleti — Urbini Global Sports',
      description: 'Scopri il portfolio di atleti rappresentati da Urbini Global Sports, filtrando per ruolo in campo.',
    },
    contact: {
      title: 'Contatti — Urbini Global Sports',
      description:
        'Contatta Urbini Global Sports per saperne di più su gestione di carriera, partnership o rappresentanza di atleti.',
    },
  },
  en: {
    home: {
      title: 'Urbini Global Sports — Football Career Management',
      description:
        "Urbini Global Sports manages football athletes' careers, connecting talent to opportunity with strategy, transparency, and full-circle care.",
    },
    about: {
      title: 'About us — Urbini Global Sports',
      description:
        "Learn about Urbini Global Sports' history, mission, values, and what sets us apart in football career management.",
    },
    athletes: {
      title: 'Athletes — Urbini Global Sports',
      description: 'Explore the portfolio of athletes represented by Urbini Global Sports, filtered by position on the pitch.',
    },
    contact: {
      title: 'Contact — Urbini Global Sports',
      description:
        'Get in touch with Urbini Global Sports to learn more about career management, partnerships, or athlete representation.',
    },
  },
}

export function getRouteMeta(locale: Locale, key: RouteKey): RouteMeta {
  const seo = ROUTE_SEO[locale][key]
  return {
    path: localizePath(ROUTE_BASE_PATHS[key], locale),
    title: seo.title,
    description: seo.description,
    ogImage: DEFAULT_OG_IMAGE,
  }
}
