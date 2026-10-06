export const POSITIONS = [
  'Goleiro',
  'Zagueiro',
  'Lateral',
  'Meio-campo',
  'Atacante',
] as const

export type Position = (typeof POSITIONS)[number]

export interface Athlete {
  id: string
  name: string
  /** `null` when not yet informed by the agency — rendered as "-". */
  position: Position | null
  club: string | null
  /** ISO date (YYYY-MM-DD), when known. Age is always derived from it, never stored. */
  birthDate: string | null
  heightCm: number | null
  weightKg: number | null
  photoUrl: string
  instagramUrl: string | null
}

export const ATHLETES_DATA: Athlete[] = [
  {
    id: 'pk',
    name: 'PK',
    position: null,
    club: 'Real Soccer',
    birthDate: null,
    heightCm: null,
    weightKg: null,
    photoUrl: '/athletes/pk.png',
    instagramUrl: 'https://www.instagram.com/patrickinho09/',
  },
  {
    id: 'daniel-zanirato',
    name: 'Daniel Zanirato',
    position: null,
    club: null,
    birthDate: null,
    heightCm: null,
    weightKg: null,
    photoUrl: '/athletes/daniel_zanirato.png',
    instagramUrl: 'https://www.instagram.com/danielzanirato__/',
  },
  {
    id: 'kauan-miranda',
    name: 'Kauan Miranda',
    position: null,
    club: 'CAP',
    birthDate: null,
    heightCm: null,
    weightKg: null,
    photoUrl: '/athletes/kauan_miranda.png',
    instagramUrl: 'https://www.instagram.com/kauan.miranda09/',
  },
  {
    id: 'davi-silva',
    name: 'Davi Silva',
    position: null,
    club: null,
    birthDate: null,
    heightCm: null,
    weightKg: null,
    photoUrl: '/athletes/davi_silva.png',
    instagramUrl: 'https://www.instagram.com/_daavizin007/',
  },
  {
    id: 'haedo',
    name: 'Haedo',
    position: null,
    club: null,
    birthDate: null,
    heightCm: null,
    weightKg: null,
    photoUrl: '/athletes/haedo.png',
    instagramUrl: 'https://www.instagram.com/haedo_09/',
  },
  {
    id: 'jhuan-henrique',
    name: 'Jhuan Henrique',
    position: null,
    club: null,
    birthDate: null,
    heightCm: null,
    weightKg: null,
    photoUrl: '/athletes/jhuan_henrique.png',
    instagramUrl: 'https://www.instagram.com/06_jhuan/',
  },
  {
    id: 'lucca-ramos',
    name: 'Lucca Ramos',
    position: null,
    club: null,
    birthDate: null,
    heightCm: null,
    weightKg: null,
    photoUrl: '/athletes/lucca_ramos.png',
    instagramUrl: 'https://www.instagram.com/lucca_ramossilveira/',
  },
  {
    id: 'robinho',
    name: 'Robinho',
    position: null,
    club: null,
    birthDate: null,
    heightCm: null,
    weightKg: null,
    photoUrl: '/athletes/robinho.png',
    instagramUrl: 'https://www.instagram.com/robinho_6/',
  },
  {
    id: 'juan-riquelme',
    name: 'Juan Riquelme',
    position: null,
    club: null,
    birthDate: null,
    heightCm: null,
    weightKg: null,
    photoUrl: '/athletes/juan_riquelme.png',
    instagramUrl: 'https://www.instagram.com/010riquelme/',
  },
  {
    id: 'brenninho',
    name: 'Brenninho',
    position: null,
    club: null,
    birthDate: null,
    heightCm: null,
    weightKg: null,
    photoUrl: '/athletes/brenninho.png',
    instagramUrl: 'https://www.instagram.com/brennohenrique10/',
  },
  {
    id: 'joao-ronchi',
    name: 'João Ronchi',
    position: null,
    club: null,
    birthDate: null,
    heightCm: null,
    weightKg: null,
    photoUrl: '/athletes/joao_ronchi.png',
    instagramUrl: null,
  },
  {
    id: 'harrysson-fleury',
    name: 'Harrysson Fleury',
    position: null,
    club: null,
    birthDate: null,
    heightCm: null,
    weightKg: null,
    photoUrl: '/athletes/harryson_fleury.png',
    instagramUrl: null,
  },
]

export function findAthleteById(id: string | undefined): Athlete | undefined {
  return ATHLETES_DATA.find((athlete) => athlete.id === id)
}
