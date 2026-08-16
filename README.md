# Urbini Sports

Site institucional da Urbini Sports — gestão de carreiras no futebol. SPA em React + TypeScript, pré-renderizada em HTML estático por rota (`vite-react-ssg`), estilizada com Tailwind CSS e hospedada na Vercel.

Detalhes de arquitetura e decisões técnicas em [docs/PLANO.md](docs/PLANO.md).

## Desenvolvimento

```bash
npm install
cp .env.example .env    # preencha RESEND_API_KEY, RESEND_FROM_EMAIL, CONTACT_DESTINATION_EMAIL, VITE_SITE_URL
npm run dev              # http://localhost:5173
```

## Scripts

| Script              | Descrição                                              |
| -------------------- | ------------------------------------------------------- |
| `npm run dev`         | Servidor de desenvolvimento (Vite, CSR)                 |
| `npm run build`       | Build de produção com pré-renderização (`vite-react-ssg`) |
| `npm run preview`     | Serve o build de produção localmente                     |
| `npm run lint`        | ESLint                                                   |
| `npm run typecheck`   | `tsc --noEmit` (app + node)                              |
| `npm run test`        | Testes (Vitest + Testing Library)                        |

## Formulário de contato

O envio passa por uma Serverless Function (`api/send-email.ts`) que usa o [Resend](https://resend.com). Para testar localmente com a function, use `vercel dev` (requer `vercel login` e as variáveis de ambiente do `.env`).

## Deploy

Vercel, com Build Command `npm run build` e Output Directory `dist`. Configure as variáveis de ambiente do `.env.example` no dashboard do projeto.
