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
  photoUrl: string
  instagramUrl: string
}

export const ATHLETES_DATA: Athlete[] = [
  {
    id: 'joao-pedro-silva',
    name: 'João Pedro Silva',
    position: 'Goleiro',
    club: 'Athletico Paranaense',
    photoUrl: '/athletes/joao-pedro.jpg',
    instagramUrl: 'https://www.instagram.com/joaopedrosilva/',
  },
  {
    id: 'rafael-costa',
    name: 'Rafael Costa',
    position: 'Zagueiro',
    club: 'Grêmio',
    photoUrl: '/athletes/rafael-costa.jpg',
    instagramUrl: 'https://www.instagram.com/rafaelcosta/',
  },
  {
    id: 'lucas-martins',
    name: 'Lucas Martins',
    position: 'Zagueiro',
    club: 'Cruzeiro',
    photoUrl: '/athletes/lucas-martins.jpg',
    instagramUrl: 'https://www.instagram.com/lucasmartins/',
  },
  {
    id: 'gabriel-almeida',
    name: 'Gabriel Almeida',
    position: 'Lateral',
    club: 'Fortaleza',
    photoUrl: '/athletes/gabriel-almeida.jpg',
    instagramUrl: 'https://www.instagram.com/gabrielalmeida/',
  },
  {
    id: 'thiago-souza',
    name: 'Thiago Souza',
    position: 'Meio-campo',
    club: 'Bahia',
    photoUrl: '/athletes/thiago-souza.jpg',
    instagramUrl: 'https://www.instagram.com/thiagosouza/',
  },
  {
    id: 'matheus-oliveira',
    name: 'Matheus Oliveira',
    position: 'Meio-campo',
    club: 'Vasco da Gama',
    photoUrl: '/athletes/matheus-oliveira.jpg',
    instagramUrl: 'https://www.instagram.com/matheusoliveira/',
  },
  {
    id: 'pedro-henrique',
    name: 'Pedro Henrique',
    position: 'Atacante',
    club: 'Red Bull Bragantino',
    photoUrl: '/athletes/pedro-henrique.jpg',
    instagramUrl: 'https://www.instagram.com/pedrohenrique/',
  },
  {
    id: 'bruno-fernandes',
    name: 'Bruno Fernandes',
    position: 'Atacante',
    club: 'Goiás',
    photoUrl: '/athletes/bruno-fernandes.jpg',
    instagramUrl: 'https://www.instagram.com/brunofernandes/',
  },
]
