import type { RouteRecord } from 'vite-react-ssg'
import { Layout } from '@/components/layout/Layout'
import { Home } from '@/pages/Home'
import { About } from '@/pages/About'
import { Athletes } from '@/pages/Athletes'
import { AthleteDetail } from '@/pages/AthleteDetail'
import { ATHLETES_DATA } from '@/data/athletes'
import { Contact } from '@/pages/Contact'
import { NotFound } from '@/pages/NotFound'

function buildPageChildren(): RouteRecord[] {
  return [
    { index: true, element: <Home /> },
    { path: 'sobre', element: <About /> },
    { path: 'atletas', element: <Athletes /> },
    {
      path: 'atletas/:athleteId',
      element: <AthleteDetail />,
      // Paths are relative to the parent, so each locale tree (/, /it, /en) prerenders its own copy.
      getStaticPaths: () => ATHLETES_DATA.map((athlete) => `atletas/${athlete.id}`),
    },
    { path: 'contato', element: <Contact /> },
    { path: '*', element: <NotFound /> },
  ]
}

export const routes: RouteRecord[] = [
  { path: '/', element: <Layout />, children: buildPageChildren() },
  { path: '/it', element: <Layout />, children: buildPageChildren() },
  { path: '/en', element: <Layout />, children: buildPageChildren() },
]
