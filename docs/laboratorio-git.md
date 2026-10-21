# E5: laboratorio Git

Execucao real em repositorio local isolado, sem remoto. Nenhum comando deste laboratorio envia commits a main do GitHub. Nao foram usados force push ou reset --hard.

## Conflito e rebase

Duas branches modificaram a mesma linha de politica. `git rebase main` falhou com conflito na branch local nunca publicada. A resolucao preservou limite de dois dias uteis e revisao diaria, seguida de `git add`, `git rebase --continue` e teste aprovado. Apenas depois houve merge local da politica.

## Revert

O commit `4c9d7cf58496d8f28f0e83690cfcd1cf91ec92e3` inseriu, de proposito, soma em lugar de multiplicacao no calculo de total. O teste de 2 unidades a 10 falhou. `git revert --no-edit` criou `7ebae6c322bf0e4423483788ee743d7c5758501a`, preservando o historico e restaurando o teste.

Esta main e do laboratorio. Um revert integrado por PR revisado na main remota ainda nao foi executado; nao deve ser inferido a partir deste log.

## Bisect automatizado

`git bisect run node check.cjs` identificou exatamente `4c9d7cf58496d8f28f0e83690cfcd1cf91ec92e3` como primeiro commit ruim. O teste usa codigo zero para total 20 e codigo um para regressao. Depois de `git bisect reset`, o repositorio voltou ao estado corrigido e o teste passou.

O [log bruto e comentado](evidencias/laboratorio.log) registra comandos, saidas e SHAs. `node scripts/git-lab.mjs` permite repetir a execucao criando outro repositorio temporario e gravando evidencias locais em `evidencias/git`. Requer Git e Node no PATH; o teste automatizado do bisect chama `node`. O bug e didatico, nao um incidente da empresa.
