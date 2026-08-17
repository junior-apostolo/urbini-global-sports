export interface RouteMeta {
  path: string
  title: string
  description: string
  ogImage: string
}

const SITE_NAME = 'Urbini Global Sports'
const DEFAULT_OG_IMAGE = '/og-image.jpg'

export const ROUTES_META: Record<'home' | 'about' | 'athletes' | 'contact', RouteMeta> = {
  home: {
    path: '/',
    title: `${SITE_NAME} — Gestão de Carreiras no Futebol`,
    description:
      'A Urbini Global Sports gerencia carreiras de atletas de futebol, conectando talento a oportunidades com estratégia, transparência e cuidado integral.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  about: {
    path: '/sobre',
    title: `Sobre nós — ${SITE_NAME}`,
    description:
      'Conheça a história, missão, valores e os diferenciais da Urbini Global Sports na gestão de carreiras de atletas de futebol.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  athletes: {
    path: '/atletas',
    title: `Atletas — ${SITE_NAME}`,
    description:
      'Conheça o portfólio de atletas agenciados pela Urbini Global Sports, filtrando por posição em campo.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  contact: {
    path: '/contato',
    title: `Contato — ${SITE_NAME}`,
    description:
      'Fale com a Urbini Global Sports para saber mais sobre gestão de carreira, parcerias ou representação de atletas.',
    ogImage: DEFAULT_OG_IMAGE,
  },
}
