# Plano de Implementação — Site Institucional Urbini Sports

## Contexto

Projeto greenfield: o diretório `C:\Users\junio\projects\urbini-sports` está vazio (sem git, sem código). O objetivo é construir, do zero, um site institucional (SPA) para uma empresa de gestão de carreiras no futebol, apresentando a empresa, o portfólio de atletas agenciados e um canal de contato por e-mail — conforme PRD fornecido pelo usuário.

Decisões já confirmadas com o usuário:
- **Estilização**: Tailwind CSS
- **Hospedagem/serverless**: Vercel (Serverless Functions em `/api`, `RESEND_API_KEY` nunca exposta no client)

O PRD deixa em aberto a ferramenta exata de SSG/prerender (cita exemplos como `@prerenderer/rollup-plugin` ou `vite-plugin-sitemap`) e a biblioteca de validação de formulário — essas decisões técnicas foram resolvidas abaixo com justificativa.

## Decisões Técnicas

### SSG/Prerender: `vite-react-ssg`
Escolhido em vez de `@prerenderer/rollup-plugin` (prerender via Puppeteer/Chromium headless — mais pesado, mais lento, historicamente instável em CI) porque foi construído especificamente para o caso Vite + React + `react-router-dom`: pré-renderiza cada rota em HTML estático real no build e faz hydration no client depois, mantendo a SPA totalmente interativa. É compatível nativamente com `react-helmet-async` e expõe o hook `ssgOptions.onFinished(outDir)`, usado para gerar `sitemap.xml`/`robots.txt` no próprio build. Usa `react-router-dom` v6 (rotas declaradas como `RouteRecord[]`, não `createBrowserRouter`); não há motivo para migrar para v7 aqui.

Impacto: `src/main.tsx` usa `ViteReactSSG(routes, ...)` em vez do `ReactDOM.createRoot` clássico; rotas centralizadas em `src/routes.tsx`.

### Validação de formulário: `react-hook-form` + `zod` + `@hookform/resolvers`
`react-hook-form` minimiza re-renders (uncontrolled) e expõe `formState.errors`/`isSubmitting` prontos para feedback visual. O schema `zod` é declarado uma única vez (`src/lib/validation/contactSchema.ts`) e reaproveitado tanto no client (`zodResolver`) quanto no handler serverless — evita duplicar/divergir regras entre front e back, atendendo ao requisito de não confiar só em validação client-side.

### Tailwind v4 (`@tailwindcss/vite`)
Setup moderno sem `postcss.config.js`/`tailwind.config.js` obrigatórios; tokens de marca via `@theme` dentro do CSS.

### Sem husky/lint-staged por ora
Projeto pequeno, desenvolvedor único neste estágio — hooks de git adicionariam fricção sem benefício proporcional agora. Scripts `lint`/`typecheck`/`test` cobrem a validação manualmente; pode virar GitHub Action futura.

## Estrutura de Pastas

```
urbini-sports/
├── api/
│   └── send-email.ts                # Vercel Serverless Function
├── public/
│   ├── favicon.svg
│   └── robots.txt                   # fallback; também gerado no build
├── src/
│   ├── main.tsx                     # entry ViteReactSSG
│   ├── routes.tsx                   # RouteRecord[] centralizado
│   ├── index.css                    # @import "tailwindcss"; + @theme tokens
│   ├── components/
│   │   ├── layout/{Layout,Header,Footer}.tsx
│   │   ├── ui/{Button,Card,SectionHeading,Container}.tsx
│   │   ├── seo/Seo.tsx              # wrapper de react-helmet-async
│   │   ├── athletes/{AthleteCard,AthleteGrid,PositionFilter}.tsx
│   │   └── contact/ContactForm.tsx
│   ├── pages/{Home,About,Athletes,Contact}.tsx
│   ├── data/athletes.ts             # Athlete interface + ATHLETES_DATA
│   ├── hooks/useContactForm.ts      # opcional, extrai lógica de submit
│   ├── lib/
│   │   ├── validation/contactSchema.ts  # zod schema compartilhado client/server
│   │   ├── api.ts                   # fetch wrapper para /api/send-email
│   │   └── seo/routesMeta.ts        # título/descrição/OG por rota (fonte única)
│   └── types/
├── scripts/generate-sitemap.ts      # chamado no onFinished do vite-react-ssg
├── tests/setupTests.ts
├── .env.example
├── vite.config.ts
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── eslint.config.js                 # flat config
└── .prettierrc
```

Path aliases (`@/components`, `@/pages`, `@/data`, `@/lib`, `@/hooks`, `@/types` → `src/*`) via `tsconfig.app.json` `paths` + `resolve.alias` no `vite.config.ts`.

## Pacotes npm (nomes exatos)

- **Core**: `react`, `react-dom`, `vite`, `@vitejs/plugin-react`, `typescript`, `react-router-dom`, `vite-react-ssg`
- **Estilo**: `tailwindcss`, `@tailwindcss/vite`, `clsx`
- **SEO**: `react-helmet-async`
- **Formulário**: `react-hook-form`, `zod`, `@hookform/resolvers`
- **Ícones**: `lucide-react`
- **Serverless/E-mail**: `resend`, `@vercel/node` (dev)
- **Qualidade**: `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `eslint-plugin-jsx-a11y`, `prettier`, `eslint-config-prettier`, `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`

## Arquitetura de Componentes

- **Layout.tsx**: `<Header/>` + `<Outlet/>` dentro de `<main>` + `<Footer/>`; `<header>` contém `<nav>` semântico.
- **Header.tsx**: logo à esquerda, `NavLink` para Início/Sobre/Atletas/Contato (estado ativo via `aria-current`), menu mobile com `aria-expanded`/`aria-controls`.
- **ui/Button, Card, SectionHeading, Container**: reutilizados por páginas e pelo grid de atletas.
- **seo/Seo.tsx**: recebe `title/description/image/url`, renderiza via `<Helmet>` (title, meta description, OG, twitter:card) + prop `jsonLd` opcional.
- **athletes/AthleteCard.tsx**: `<img loading="lazy" decoding="async" alt="Foto de {name}">`, nome, posição, link Instagram com `target="_blank" rel="noopener noreferrer"` e `aria-label`.
- **athletes/PositionFilter.tsx**: botões por posição + "Todos", `aria-pressed` no ativo.
- **contact/ContactForm.tsx**: RHF + `zodResolver(contactSchema)`; estados `isSubmitting` e `submitStatus: 'idle'|'success'|'error'` com `aria-live="polite"`.

## Formulário → Serverless (Resend)

`src/lib/api.ts` faz `fetch('/api/send-email', { method: 'POST', ... })`. O handler `api/send-email.ts` (`@vercel/node`):
1. Rejeita métodos ≠ `POST` (405).
2. Revalida `req.body` com o mesmo `contactSchema` (400 em payload inválido — nunca confia só no client).
3. Honeypot field (`company`, deve ficar vazio) + guard best-effort em memória por IP/janela como anti-abuso simples (documentar `@upstash/ratelimit` como upgrade futuro se necessário).
4. `new Resend(process.env.RESEND_API_KEY)` → `resend.emails.send({ from: RESEND_FROM_EMAIL, to: CONTACT_DESTINATION_EMAIL, replyTo: data.email, ... })`.
5. `try/catch` com `console.error` + resposta 500 genérica ao client.

`.env.example`:
```
RESEND_API_KEY=
RESEND_FROM_EMAIL=
CONTACT_DESTINATION_EMAIL=
VITE_SITE_URL=
```

## SEO Técnico

- `HelmetProvider` em `main.tsx`; `<Seo/>` em cada página usando `src/lib/seo/routesMeta.ts` (fonte única de title/description/ogImage por rota).
- `scripts/generate-sitemap.ts`, chamado em `ssgOptions.onFinished` do `vite.config.ts`: gera `dist/sitemap.xml` e `dist/robots.txt` a partir de `routesMeta` + `VITE_SITE_URL`.
- JSON-LD: `Organization` na Home; `ItemList` de `Person` na página `/atletas` (sem página de detalhe por atleta no escopo atual).
- HTML semântico: `<main>`, `<section>` por bloco, `<article>` por `AthleteCard`.

## Acessibilidade e Imagens

- `alt` descritivo obrigatório em todas as imagens; `loading="lazy" decoding="async"` fora do viewport inicial; hero da Home com `loading="eager"`/`fetchpriority="high"` (LCP).
- Fotos de atletas via URL externa já otimizada (WebP/AVIF) — decisão default dado que `athletes.ts` é um mock/config; `vite-imagetools` só entra se decidirmos versionar as fotos localmente no repo (não previsto agora).
- `eslint-plugin-jsx-a11y` ativo no lint; `focus-visible:ring-2` no Header/PositionFilter; validar contraste AA (4.5:1) na paleta de marca.

## Testes

Vitest + React Testing Library: `ContactForm.test.tsx` (erros de campo obrigatório, submit válido com fetch mockado, estados loading/sucesso/erro), `AthleteCard.test.tsx` (`alt`, `href`/`target`/`rel` do link Instagram), `PositionFilter.test.tsx` (filtragem), `contactSchema.test.ts` (casos de borda do zod).

## Scripts npm

```json
{
  "dev": "vite",
  "build": "vite-react-ssg build",
  "preview": "vite preview",
  "lint": "eslint .",
  "typecheck": "tsc --noEmit -p tsconfig.app.json && tsc --noEmit -p tsconfig.node.json",
  "test": "vitest run"
}
```

## Ordem de Implementação (tarefas verificáveis)

1. **Scaffold**: `npm create vite@latest . -- --template react-ts`; `git init`; `.gitignore`; commit inicial. *Verificar*: `npm run dev` sobe a página padrão.
2. **Tailwind v4**: instalar, plugin no `vite.config.ts`, `index.css` com `@theme`. *Verificar*: utilitário aplicado visualmente.
3. **ESLint flat config + Prettier**. *Verificar*: `npm run lint` sem erros.
4. **Path aliases** (tsconfig + vite). *Verificar*: import `@/...` resolve.
5. **`react-router-dom` + `vite-react-ssg`**: `routes.tsx`, `main.tsx`, script `build`. *Verificar*: `npm run build` gera `dist/index.html`, `dist/sobre/index.html` etc. com HTML pré-renderizado.
6. **Layout compartilhado** (Layout/Header/Footer). *Verificar*: navegação entre 4 rotas mantém header/footer sem erro de console.
7. **UI base** (Button/Card/SectionHeading/Container).
8. **Dados mock** `src/data/athletes.ts` (6–8 atletas, 5 posições). *Verificar*: `npm run typecheck` passa.
9. **Página Atletas** + Card/Grid/Filtro. *Verificar*: filtro funciona; link Instagram com `target`/`rel` corretos.
10. **Página Home** (Hero, resumo Sobre, destaque de atletas, CTA contato).
11. **Página Sobre** (história/missão/valores/diferenciais). *Verificar*: um único `h1`, hierarquia de heading válida.
12. **Formulário de contato (frontend)**: schema + `ContactForm.tsx` (submit ainda stub). *Verificar*: submit vazio mostra os 3 erros obrigatórios.
13. **Serverless function** `api/send-email.ts` + `.env.example`. *Verificar*: `vercel dev` local — request válida retorna 200 e e-mail chega; payload inválido retorna 400.
14. **Integração frontend-backend** real em `src/lib/api.ts`. *Verificar*: fluxo end-to-end via `vercel dev`, sucesso e erro exibidos na UI.
15. **SEO**: `Seo.tsx`, `routesMeta.ts`, `generate-sitemap.ts`, JSON-LD. *Verificar*: `npm run build` gera `dist/sitemap.xml`/`robots.txt`; `view-source` de cada rota mostra meta tags distintas já no HTML estático.
16. **Acessibilidade e imagens**: revisão de `alt`, lazy loading, foco visível, correção de achados `jsx-a11y`. *Verificar*: Lighthouse Accessibility ≥ 95, navegação 100% por teclado.
17. **Testes**: Vitest + RTL conforme seção acima. *Verificar*: `npm run test` passa.
18. **Revisão final**: `npm run lint && npm run typecheck && npm run test && npm run build` em sequência, sem erros/warnings novos.
19. **Deploy na Vercel**: conectar repo, configurar env vars (`RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_DESTINATION_EMAIL`, `VITE_SITE_URL`), Build Command `npm run build`, Output `dist`. *Verificar*: deploy público funcional, formulário envia e-mail real em produção, `/sitemap.xml` e `/robots.txt` acessíveis, Open Graph validado (ex. via debugger de OG do Facebook/LinkedIn).

## Verificação de Ponta a Ponta

Após a tarefa 19: navegar pelas 4 rotas em produção, confirmar SSR/prerender via "view page source" (conteúdo deve estar no HTML antes da hydration), submeter o formulário de contato com dados reais e confirmar recebimento do e-mail, rodar Lighthouse (Performance/SEO/Accessibility/Best Practices) na home publicada.
