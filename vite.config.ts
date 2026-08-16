/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import 'vite-react-ssg'
import { generateSitemap } from './scripts/generate-sitemap.ts'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  ssgOptions: {
    dirStyle: 'nested',
    onFinished: generateSitemap,
  },
  test: {
    environment: 'happy-dom',
    setupFiles: ['./tests/setupTests.ts'],
  },
})
