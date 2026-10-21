# Contribuicao

## Fluxo

Usamos trunk-based development: `main` e o tronco; cada mudanca nasce numa branch curta a partir dele. Nunca enviar push direto a `main`, usar force push ou reescrever historico compartilhado. Desfazer uma mudanca integrada exige `git revert`, revisao e novo PR.

Vida maxima de branch: dois dias uteis. Dividir entregas maiores em PRs pequenos, sem deixar semanas de divergencia. O limite e uma politica: a idade do ultimo commit, sozinha, nao informa a data de criacao de uma branch. Acompanhar tambem a abertura do PR.

```sh
git switch main
git pull --ff-only
git switch -c feat/catalogo
npm ci
npm test
npm run verify
git add apps/api
git commit -m "feat(api): adiciona consulta de pecas"
git push -u origin feat/catalogo
gh pr create
```

Nomes: `feat/descricao-curta` e `fix/descricao-curta`. Correcao de CI pode usar `fix/checkout`. Rebase somente em branch local nunca publicada; se a branch ja foi compartilhada, integrar o tronco sem reescrever commits. Havendo conflito, testar a resolucao antes de enviar.

## Commits e changelog

Conventional Commits: `tipo(escopo): descricao`. Tipos aceitos: feat, fix, docs, ci, test, chore, perf e refactor.

- `feat(api): adiciona consulta de pecas`
- `fix(ui): valida estoque negativo`
- `ci(portal): limita checkout aos caminhos usados`
- `docs(prompts): esclarece revisao humana`

`npm run changelog` gera o changelog a partir do historico real. O CI publica esse resultado como artefato, sem gravar diretamente em `main`. Uma versao publicada do changelog deve entrar por PR revisado. O titulo do PR deve seguir o mesmo padrao, inclusive quando o merge usa squash.

## Agentes e revisao

Todo PR assistido por agente deve indicar essa origem, a intencao, os riscos, os caminhos alterados e os testes realmente executados. Nao afirmar execucao de teste sem saida verificavel. Nao introduzir .env, tokens, chaves ou dados de clientes, mesmo temporariamente: apagar depois nao limpa o historico.

Um humano diferente do autor precisa aprovar pela ferramenta de review. Comentarios, checkboxes e autoaprovacao nao substituem a aprovacao. Sem revisor disponivel, o PR fica aberto; nao se usa bypass administrativo.

## Revisao por risco

| Caminho | Verificacao obrigatoria |
| --- | --- |
| apps/api | contratos HTTP, validacao de entradas e regras de estoque |
| apps/portal | dados apresentados e dependencia de libs/ui |
| libs/ui | compatibilidade de todos os consumidores |
| prompts | comportamento, injecao de instrucoes e limites de dados |
| .github | permissoes, protecao, gatilhos e integridade dos checks |

CODEOWNERS aponta o responsavel atual. Como o PR inicial e do proprio responsavel, ainda precisa de outro responsavel humano com permissao para revisa-lo; nao ha autoaprovacao valida. Na organizacao, atribuir os caminhos a equipes reais. Estas regras por pasta se inspiram no risco considerado pelo Antique, mas nao reproduzem seu motor de revisao semantica.

## CI e integracao

O gate obrigatorio `quality` depende da verificacao completa do historico e dos testes selecionados por caminhos. Mudancas globais e merge groups executam todos os componentes. Mudancas em libs/ui testam tambem portal. O workflow documental usa `paths`, mas nao e check obrigatorio: assim uma mudanca fora desses caminhos nao deixa a fila esperando um check que nunca inicia.

Executar a merge queue somente depois de aprovacao e checks verdes, em repositorio de organizacao com a fila habilitada. O workflow recebe `merge_group` para validar o conjunto, nao somente cada PR isolado. Configuracao preparada nao equivale a fila ativa; conferir os registros da plataforma.
