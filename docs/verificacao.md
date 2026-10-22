# Verificacao da pratica

## Resultados confirmados

- Vinte e quatro testes locais aprovados na versao corrigida, incluindo HTTP real, caminhos mistos, rename entre componentes e validacao da cobertura OSV. Os numeros menores pertencem as respectivas execucoes historicas.
- Gitleaks 8.30.1 executado localmente e no CI com binario e checksum fixados; nenhuma ocorrencia encontrada. Isso nao prova ausencia absoluta de qualquer segredo.
- Workflow validado por actionlint 1.7.12, sem shellcheck ou pyflakes nesta maquina.
- Tres amostras completas e tres enxutas com logs, SHA e tempos. Sem ganho de checkout demonstrado nesta amostra.
- Protecao de main consultada por API: PR, quality do GitHub Actions e merge queue obrigatorios inclusive para administradores; sem permissao de force push/exclusao. O fluxo atual registra revisao tecnica assistida e autorizacao do responsavel, sem exigir aprovacao de outra conta.
- PR 1 mesclado pela fila em 22/10/2026; CI de PR 39714992357 e merge_group 39715139786 aprovados. Nenhuma aprovacao independente foi simulada e nenhum bypass foi usado.
- Repositorio transferido para luccalck67, com @6lucassilvaaa membro da organizacao e acesso write confirmado.
- Ruleset 25593044 ativo, exigindo PR, quality e merge queue na main, sem bypass; execucao real da fila validada no SHA integrado bfb9bc48c61bfa31454b700b76ee3e01440a5d54.
- OSV-Scanner 2.7.0 consultou a base para as 65 dependencias do lockfile, sem achados; a cobertura foi validada. Falhas anteriores de npm audit continuam como falhas historicas.
- Conflito/rebase, revert e bisect executados em laboratorio local isolado, com log comentado e teste automatizado.

## Conferencia da rubrica

| Item | Estado | Limite para a entrega final |
| --- | --- | --- |
| E1, 15% | Diagnostico e benchmark reais, causas priorizadas | Repositorio didatico novo; nao ha serie real da empresa ou reducao de lead time comprovada |
| E2, 15% | CONTRIBUTING, changelog e revisao tecnica registrados e integrados | Eficacia ao longo de duas semanas nao medida |
| E3, 20% | PR, quality, fila e CODEOWNERS integrados; capturas diretas e export da API | require_code_owner_reviews=false e zero aprovacoes obrigatorias. Nao cumpre literalmente o revisor obrigatorio de prompts exigido no enunciado; revisao do responsavel assistida, nao review independente APPROVED |
| E4, 20% | Matriz, paths, cache, checkout seletivo, seis amostras e merge_group executados | Nao ha ganho sustentado de checkout demonstrado |
| E5, 15% | Tres cenarios locais executados e bisect automatizado | main do laboratorio nao deve ser confundida com a main remota |
| E6, 15% | Parecer critico com fonte primaria, metricas e integracao comprovada | Nao extrapola os ganhos da Anthropic para este laboratorio |

O ciclo de integracao foi concluido e possui evidencias reais. A conferencia tecnica nao e garantia de nota maxima. O fluxo de revisao assistida do proprio responsavel e explicitamente distinguido de aprovacao independente, sem alegacao de cumprir esta ultima.

## Evidencias finais

1. docs/resultado-integracao.md e docs/evidencias/integracao.json: PR, SHAs e runs originais aprovados.
2. docs/evidencias/osv-merge-group.json: relatorio original das 65 dependencias.
3. docs/evidencias: capturas diretas da pagina de regras, PR mesclado e execucao do merge group.
4. Artefatos dos runs originais: logs, changelog e resultado do laboratorio Git.

Configuracao registrada nao substitui execucao. A auditoria npm antiga terminou com timeout e nao foi declarada aprovada; a verificacao alternativa OSV foi realmente executada. As capturas sao da interface real, sem montagem.
