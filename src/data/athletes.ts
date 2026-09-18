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
  position: Position
  club: string
  /** ISO date (YYYY-MM-DD). Age is always derived from it, never stored. */
  birthDate: string
  heightCm: number
  weightKg: number
  photoUrl: string
  instagramUrl: string
}

export const ATHLETES_DATA: Athlete[] = [
  {
    id: 'joao-pedro-silva',
    name: 'João Pedro Silva',
    position: 'Goleiro',
    club: 'Athletico Paranaense',
    birthDate: '2000-03-14',
    heightCm: 192,
    weightKg: 87,
    photoUrl: '/athletes/joao-pedro.jpg',
    instagramUrl: 'https://www.instagram.com/joaopedrosilva/',
  },
  {
    id: 'rafael-costa',
    name: 'Rafael Costa',
    position: 'Zagueiro',
    club: 'Grêmio',
    birthDate: '1999-07-22',
    heightCm: 188,
    weightKg: 82,
    photoUrl: '/athletes/rafael-costa.jpg',
    instagramUrl: 'https://www.instagram.com/rafaelcosta/',
  },
  {
    id: 'lucas-martins',
    name: 'Lucas Martins',
    position: 'Zagueiro',
    club: 'Cruzeiro',
    birthDate: '2001-11-05',
    heightCm: 190,
    weightKg: 84,
    photoUrl: '/athletes/lucas-martins.jpg',
    instagramUrl: 'https://www.instagram.com/lucasmartins/',
  },
  {
    id: 'gabriel-almeida',
    name: 'Gabriel Almeida',
    position: 'Lateral',
    club: 'Fortaleza',
    birthDate: '2002-02-18',
    heightCm: 178,
    weightKg: 72,
    photoUrl: '/athletes/gabriel-almeida.jpg',
    instagramUrl: 'https://www.instagram.com/gabrielalmeida/',
  },
  {
    id: 'thiago-souza',
    name: 'Thiago Souza',
    position: 'Meio-campo',
    club: 'Bahia',
    birthDate: '2000-09-30',
    heightCm: 180,
    weightKg: 74,
    photoUrl: '/athletes/thiago-souza.jpg',
    instagramUrl: 'https://www.instagram.com/thiagosouza/',
  },
  {
    id: 'matheus-oliveira',
    name: 'Matheus Oliveira',
    position: 'Meio-campo',
    club: 'Vasco da Gama',
    birthDate: '2003-01-12',
    heightCm: 176,
    weightKg: 70,
    photoUrl: '/athletes/matheus-oliveira.jpg',
    instagramUrl: 'https://www.instagram.com/matheusoliveira/',
  },
  {
    id: 'pedro-henrique',
    name: 'Pedro Henrique',
    position: 'Atacante',
    club: 'Red Bull Bragantino',
    birthDate: '2001-05-27',
    heightCm: 183,
    weightKg: 77,
    photoUrl: '/athletes/pedro-henrique.jpg',
    instagramUrl: 'https://www.instagram.com/pedrohenrique/',
  },
  {
    id: 'bruno-fernandes',
    name: 'Bruno Fernandes',
    position: 'Atacante',
    club: 'Goiás',
    birthDate: '1998-12-08',
    heightCm: 185,
    weightKg: 79,
    photoUrl: '/athletes/bruno-fernandes.jpg',
    instagramUrl: 'https://www.instagram.com/brunofernandes/',
  },
]

export function findAthleteById(id: string | undefined): Athlete | undefined {
  return ATHLETES_DATA.find((athlete) => athlete.id === id)
}
