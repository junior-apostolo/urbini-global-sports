import type { Locale } from '../locales'
import { pt } from './pt'
import { it } from './it'
import { en } from './en'

export type { Dictionary } from './types'

export const DICTIONARIES: Record<Locale, typeof pt> = { pt, it, en }
