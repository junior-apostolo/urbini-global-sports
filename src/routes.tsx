import type { RouteRecord } from 'vite-react-ssg'
import { Layout } from '@/components/layout/Layout'
import { Home } from '@/pages/Home'
import { About } from '@/pages/About'
import { Athletes } from '@/pages/Athletes'
import { Contact } from '@/pages/Contact'
import { NotFound } from '@/pages/NotFound'

function buildPageChildren(): RouteRecord[] {
  return [
    { index: true, element: <Home /> },
    { path: 'sobre', element: <About /> },
    { path: 'atletas', element: <Athletes /> },
    { path: 'contato', element: <Contact /> },
    { path: '*', element: <NotFound /> },
  ]
}

export const routes: RouteRecord[] = [
  { path: '/', element: <Layout />, children: buildPageChildren() },
  { path: '/it', element: <Layout />, children: buildPageChildren() },
  { path: '/en', element: <Layout />, children: buildPageChildren() },
]
