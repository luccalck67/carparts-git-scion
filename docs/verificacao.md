# Verificacao da pratica

## Resultados confirmados

- Oito testes locais aprovados, inclusive HTTP real; CI e gate quality aprovados no GitHub Actions.
- Gitleaks 8.30.1 executado localmente e no CI com binario e checksum fixados; nenhuma ocorrencia encontrada. Isso nao prova ausencia absoluta de qualquer segredo.
- Workflow validado por actionlint 1.7.12, sem shellcheck ou pyflakes nesta maquina.
- Tres amostras completas e tres enxutas com logs, SHA e tempos. Sem ganho de checkout demonstrado nesta amostra.
- Protecao de main consultada por API: revisao e checks obrigatorios inclusive para administradores; sem permissao de force push/exclusao.
- PR 1 aberto e sem merge. Nenhuma aprovacao foi simulada e nenhum bypass foi usado.
- Conflito/rebase, revert e bisect executados em laboratorio local isolado, com log comentado e teste automatizado.

## Conferencia da rubrica

| Item | Estado | Limite para a entrega final |
| --- | --- | --- |
| E1, 15% | Diagnostico e benchmark reais, causas priorizadas | Repositorio didatico novo; nao ha serie real da empresa ou reducao de lead time comprovada |
| E2, 15% | CONTRIBUTING e geracao automatizada de changelog publicados em PR | Politica ainda aguarda revisao e integracao na base |
| E3, 20% | Protecao ativa e CODEOWNERS proposto por pasta | Faltam organizacao, fila ativa, revisao independente, CODEOWNERS na base e capturas reais das configuracoes |
| E4, 20% | Matriz, paths, cache, checkout seletivo e seis amostras executados | Evento merge_group preparado, ainda sem execucao pela fila; nao ha ganho sustentado demonstrado |
| E5, 15% | Tres cenarios locais executados e bisect automatizado | main do laboratorio nao deve ser confundida com a main remota |
| E6, 15% | Parecer critico com fonte primaria e metricas | Distingue protecao ativa de fila e revisao pendentes |

Nao e uma entrega 100% concluida nem ha garantia de nota maxima. As pendencias sao funcionais, nao apenas de redacao. Nao gerar uma captura artificial da interface para substituir E3.

## Como concluir as dependencias externas

1. Criar uma organizacao GitHub Free publica, usando a conta existente; nao e necessario contratar assinatura.
2. Informar o nome da organizacao e o login de um revisor real. Transferir este repositorio, atualizar remote/links e atribuir propriedade por pasta a responsaveis reais.
3. O revisor deve aceitar o convite com acesso adequado, revisar a mudanca e registrar aprovacao pelo GitHub. O autor nao aprova o proprio PR.
4. Ativar a merge queue na regra de main, validar merge_group em uma execucao real e integrar pelo fluxo aprovado, sem bypass.
5. Tirar capturas reais da protecao, revisores/CODEOWNERS e fila; acrescentar links das execucoes e atualizar o HTML com esses resultados.

Configuracao registrada nao substitui execucao, logs nao substituem as capturas especificamente exigidas em E3, e comentario no PR nao substitui aprovacao independente.
