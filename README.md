# Carparts: Git e integracao continua

Monorepo de laboratorio para estudar branches curtas, revisao por caminho, checkout enxuto e integracao segura. Usa Git e GitHub Actions; nao instala Scion. O catalogo e ficticio.

## Executar

Node.js 24 ou superior e npm.

```sh
npm ci
npm test
npm run verify
npm start
```

API local em `http://127.0.0.1:3000`. Rotas: `GET /health`, `GET /parts`, `GET /parts/P001` e `POST /quote` com JSON `{"id":"P001","quantity":2}`. O teste HTTP inicia uma porta temporaria e encerra o servidor automaticamente.

## Organizacao

| Pasta | Responsabilidade |
| --- | --- |
| apps/api | catalogo, orcamento e servidor HTTP |
| apps/portal | adaptador de apresentacao do catalogo |
| libs/ui | formatacao compartilhada de preco e estoque |
| prompts | regras de revisao assistida por agentes |
| scripts | verificacao e changelog |
| .github | CI, benchmark, propriedade e modelo de PR |

O portal neste laboratorio e um modulo de apresentacao testavel, nao um site publicado. O foco da atividade e o fluxo Git e a esteira.

## Workflows

- **CI:** `pull_request` e `merge_group`, testes por componente, checkout esparso, cache npm, auditoria com historico completo e gate `quality`.
- **Benchmark:** tres pares de checkout completo e enxuto, mesmo commit e mesmo teste de API. Artefatos guardam medicoes; ganho nao e presumido.
- **Documentacao:** workflow opcional filtrado por `paths`.

Consulte [CONTRIBUTING.md](CONTRIBUTING.md) para politica de branches, revisao e commits. O PR inicial permanece aberto ate revisao humana independente. A fila nativa depende de repositorio pertencente a organizacao; nao deve ser apresentada como ativa antes de configurada e verificada.

## Referencias

- [Anthropic: Redesigning source control](https://www.anthropic.com/research/redesigning-source-control)
- [GitHub: merge queue](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue)
- [actions/checkout](https://github.com/actions/checkout)
