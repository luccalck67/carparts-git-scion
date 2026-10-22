# Revisao tecnica da integracao

Responsavel: Lucca Castilho Costa.

Codigo examinado: f2b820513fb8496e529afc9d66a258d3629a3f45; ajuste posterior de limites de rede examinado em 55b124344cd7ff4c38a8211860cdcafb334410a5. Revisao tecnica realizada com assistencia de IA. A integracao foi autorizada pelo responsavel na solicitacao desta execucao. Este registro nao representa aprovacao independente nem um evento APPROVED da interface do GitHub.

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

## Verificacao do ajuste de rede

O ajuste separa instalacao e auditoria: npm ci usa ignore-scripts, no-audit e no-fund com uma repeticao e timeout de rede de 30 segundos; a verificacao de vulnerabilidades ocorre explicitamente em npm audit, no job audit, com timeout de comando de 90 segundos e falha propagada ao quality. Jobs de instalacao e benchmark tem limite de cinco minutos. As verificacoes de Gitleaks, de historico e os testes foram mantidos. Actionlint passou novamente.

A tentativa local de npm audit nao concluiu com sucesso: houve timeout no endpoint de advisories. A pagina oficial de status do npm informou partial_outage para Package installation e incidente Degraded Package Install and Publishing, em investigacao. Isso e impedimento externo, nao resultado aprovado ou evidencia de vulnerabilidade encontrada. Nao foi repetida a consulta de auditoria em loop, nem descartada sua falha para integrar. Fonte: https://status.npmjs.org/
