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

A revisao tecnica e a decisao de integracao devem ser registradas antes de inserir o PR na fila. Neste fluxo, o proprio responsavel pode revisar com assistencia de ferramentas e autorizar a integracao. Nao se apresenta esse registro como aprovacao independente: o GitHub nao permite que o autor aprove o proprio PR. A protecao exige PR e quality, mas nao aprovacao de outra conta; a merge queue continua obrigatoria, sem bypass administrativo.

## Revisao por risco

| Caminho | Verificacao obrigatoria |
| --- | --- |
| apps/api | contratos HTTP, validacao de entradas e regras de estoque |
| apps/portal | dados apresentados e dependencia de libs/ui |
| libs/ui | compatibilidade de todos os consumidores |
| prompts | comportamento, injecao de instrucoes e limites de dados |
| .github | permissoes, protecao, gatilhos e integridade dos checks |

CODEOWNERS atribui API, portal e biblioteca a @luccalck e @6lucassilvaaa. Para prompts e workflows, o responsavel indicado e @6lucassilvaaa. Esse mapeamento auxilia a solicitacao de revisao, mas nao e uma aprovacao independente obrigatoria neste fluxo. Estas regras por pasta se inspiram no risco considerado pelo Antique, mas nao reproduzem seu motor de revisao semantica.

## CI e integracao

O gate obrigatorio `quality` depende da verificacao completa do historico e dos testes selecionados por caminhos. Mudancas globais e merge groups executam todos os componentes. Mudancas em libs/ui testam tambem portal. O workflow documental usa `paths`, mas nao e check obrigatorio: assim uma mudanca fora desses caminhos nao deixa a fila esperando um check que nunca inicia.

Mudancas somente em docs, prompts ou caminhos ainda nao reconhecidos executam todos os componentes por precaucao, alem da auditoria obrigatoria. O custo adicional e aceitavel neste laboratorio pequeno; nao se escolhe arbitrariamente apenas UI. O seletor possui testes automatizados e o laboratorio Git completo tambem e repetido no job audit em Ubuntu.

O repositorio pertence a organizacao luccalck67. O ruleset ativo "Integracao pela merge queue" exige fila para main, sem atores de bypass. Inserir PR na fila somente depois de revisao tecnica registrada, autorizacao de integracao e checks verdes. O workflow recebe `merge_group` para validar o conjunto, nao somente cada PR isolado. Fila configurada e ativa nao equivale a merge executado: conferir a execucao e a revisao na plataforma.
