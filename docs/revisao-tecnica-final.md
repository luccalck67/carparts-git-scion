# Revisao tecnica da integracao

Responsavel: Lucca Castilho Costa.

Codigo examinado: f2b820513fb8496e529afc9d66a258d3629a3f45. Revisao tecnica realizada com assistencia de IA. A integracao foi autorizada pelo responsavel na solicitacao desta execucao. Este registro nao representa aprovacao independente nem um evento APPROVED da interface do GitHub.

## Escopo conferido

- Os dois achados do parecer sobre o seletor foram reproduzidos como regressoes automatizadas.
- A extracao usa `git diff --no-renames --name-only -z`: renomes sao vistos como remocao e adicao, e os caminhos sao separados por NUL, incluindo arquivos com espacos.
- O teste cria um repositorio temporario, comprova rename R100, exige os dois caminhos na extracao e exige testes de API, portal e UI.
- Qualquer caminho fora dos tres componentes conhecidos seleciona todos, mesmo junto de API ou portal. Prefixos parecidos, como apps/api-nova, nao sao aceitos como apps/api.
- O comando Git recebe argumentos separados e exige dois SHAs completos, sem interpolacao por shell.
- Merge groups e alteracoes globais executam todos os componentes; a biblioteca inclui seu consumidor portal.
- O gate quality usa always e exige resultado success de changes, audit e tests. Workflow documental opcional nao bloqueia a ausencia de execucao por paths.
- Workflows seguem contents: read, actions fixadas por SHA, credenciais nao persistidas, Gitleaks com checksum e historico completo na auditoria.

## Verificacoes efetivamente executadas

Suite local: 20 testes aprovados, zero falhas. Actionlint 1.7.12: sem erros nos tres workflows, sem shellcheck/pyflakes locais. Verificador do historico: sem ocorrencias nos padroes procurados. `git diff --check`: sem erros. O laboratorio completo ja foi repetido com sucesso em Ubuntu na execucao 39710463165.

## Decisao

Resultado da revisao tecnica: apto a integracao, condicionado ao CI do novo HEAD e aos checks reais do merge group. A autorizacao do responsavel permite este fluxo de revisao no proprio repositorio; nao se atribui decisao a outro colaborador nem se fabrica review do GitHub.

O fluxo exige PR e merge queue, sem bypass. A protecao usa zero aprovacoes de outra conta, pois o GitHub nao permite autoaprovacao do autor. CODEOWNERS permanece como mapeamento de responsabilidades, nao como aprovacao independente obrigatoria. Quality e vinculado ao aplicativo GitHub Actions. Builds, segredos e reescrita de historico continuam bloqueados conforme as verificacoes e regras aplicadas.

Este documento registra a revisao e a decisao anteriores a integracao. Os resultados de CI, da fila e do merge precisam ser consultados nos registros reais; nao sao presumidos por este parecer.
