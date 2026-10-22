# E1: diagnostico do repositorio

Repositorio: https://github.com/luccalck67/carparts-git-scion

Coleta inicial em 21/10/2026, apos publicacao do PR 1. Dados brutos em [evidencias/diagnostico.json](evidencias/diagnostico.json). A base foi inicializada pelo GitHub; o codigo foi enviado somente para `feat/politica-e-ci`. Naquele momento, o PR estava aberto. Posteriormente, foi integrado pela merge queue em 22/10/2026, com CI aprovado e revisao tecnica assistida registrada, conforme [resultado da integracao](resultado-integracao.md). Nao houve push direto na main.

## Tamanho e branches

`git count-objects -vH` informou 33 objetos soltos, 21,08 KiB nesses objetos e um pack com 3 objetos, 2,05 KiB. Sao medidas do armazenamento Git local, nao do tamanho instalado das dependencias nem do trafego de rede.

Ha duas branches locais: main e feat/politica-e-ci; duas referencias remotas correspondentes. HEAD simbolico de origin nao e contado como branch. Ambas tiveram ultimo commit no dia da coleta. A idade pelo ultimo commit nao representa a data de criacao: um commit novo pode esconder uma branch antiga. Por isso, a politica combina acompanhamento do PR e limite de dois dias uteis.

Este e um repositorio didatico novo. Nao foram observadas branches com semanas de vida nem volume de 40 PRs semanais. Esses elementos, os 11 dias de lead time e a meta de dois dias pertencem ao cenario fornecido pelo professor, nao a medicoes desta execucao.

## Checkout e duracao do job

[Benchmark real, run 39672466575](https://github.com/luccalck67/carparts-git-scion/actions/runs/39672466575). Tres amostras por estrategia, ubuntu-latest, mesmo SHA de merge temporario `fbb285c915af904ae08d40943badffcc18a8c876`, mesmo teste HTTP/API e sem cache npm. As estrategias foram intercaladas pela fila; o antes/depois e uma comparacao de configuracoes, nao de semanas de operacao.

| Estrategia | Checkout medio | Intervalo de checkout | Job medio |
| --- | ---: | ---: | ---: |
| Completo, fetch-depth 0 | 1,026 s | 0,835 a 1,144 s | 10,00 s |
| Enxuto, fetch-depth 1 e sparse | 1,260 s | 0,869 a 1,926 s | 8,67 s |

O checkout enxuto ficou 22,79% mais lento nessa amostra, enquanto o job foi 13,33% mais curto. Nao ha evidencia de ganho sustentado no checkout. O intervalo inclui overhead entre steps e o job e medido em segundos pela API. Com tres amostras e um repositorio pequeno, a variabilidade do runner pode dominar o resultado. O cache configurado no CI nao foi quantificado pelo benchmark.

## Causas e prioridades

| Prioridade | Causa ou risco | Evidencia e limite | Relacao com lead time |
| --- | --- | --- | --- |
| 1 | Integracao sem revisao ou checks | Protecao real exige PR, quality e merge queue; revisao tecnica assistida registrada, sem aprovacao independente obrigatoria | Evita integrar sem testes; a espera por revisor foi um bloqueio anterior, nao o estado atual. A obrigatoriedade de revisor para prompts exigida no enunciado nao esta implementada |
| 2 | Mudancas concorrentes na mesma linha | Conflito real reproduzido no laboratorio e resolvido preservando as duas intencoes | Branch curta reduz janela de divergencia; reducao em dias nao medida |
| 3 | Dependencia compartilhada ignorada | Portal importa libs/ui; matriz inclui ambos quando biblioteca muda | Evita integrar regressao que falha somente no consumidor |
| 4 | Checkout desnecessario | Testes usam sparse; benchmark nao demonstrou aceleracao nesta escala | Nao e justificavel atribuir os 11 dias de lead time ao checkout medido em segundos |

Recomendacao: priorizar disponibilidade do revisor e integracao curta, mantendo as protecoes. Repetir as medicoes quando o historico e o volume crescerem, separando espera por revisao, fila de runner, checkout e testes. Nao prometer que esta amostra comprova a meta de dois dias.
