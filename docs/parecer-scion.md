# E6: parecer tecnico Scion e Carparts

O Scion responde a um problema especifico: muitos agentes e jobs conectados acessando um monorepo interno muito grande. Segundo o relato da Anthropic, operacoes e transferencias repetidas do Git se tornaram caras nessa escala. O sistema cria changesets no servidor, referencia conteudo imutavel e distribui a leitura por cache de no, cache regional e servidor autoritativo. Isso muda a unidade de custo para o conteudo necessario, em vez de reproduzir um repositorio completo em cada cliente.

Nao e uma ferramenta publica pronta para instalar na Carparts. O artigo descreve infraestrutura interna e nao anuncia disponibilizacao como substituto geral do Git. A equipe pequena, as estacoes mistas e a necessidade de ferramentas conhecidas favorecem manter Git e GitHub. Os resultados relatados pela Anthropic nao sao previsoes de ganho para este laboratorio.

Tres ideias foram incorporadas a pratica, com limites verificaveis. A primeira e buscar apenas o necessario: o CI usa fetch-depth 1, sparse-checkout por componente e cache npm; a auditoria conserva historico completo. No benchmark de tres pares no mesmo SHA, o checkout completo levou 1,026 s na media e o enxuto 1,260 s. O job caiu de 10,00 s para 8,67 s. Os resultados sao mistos e nao comprovam aceleracao do checkout ou efeito isolado do cache.

A segunda e reduzir divergencia: CONTRIBUTING estabelece trunk-based, branches de ate dois dias uteis e commits pequenos. A pratica foi publicada em branch curta e PR, sem push na main. O conflito local reproduzido confirma que mudancas na mesma linha exigem conciliacao, mas ainda nao ha serie historica para demonstrar reducao de lead time. Os 11 dias e a meta de dois dias sao do enunciado.

A terceira e revisar conforme o risco. A revisao tecnica assistida e a autorizacao do responsavel estao registradas; nao ha review independente APPROVED. A protecao exige PR, quality do GitHub Actions e merge queue, sem bypass. CODEOWNERS foi integrado e indica responsaveis por pasta, sem exigir aprovacao de outra conta neste fluxo. O Antique inspira a diferenciacao de risco, sem equivalencia ao seu motor semantico. O merge_group 39715139786 passou e o PR 1 foi integrado pela fila.

A recomendacao e acompanhar espera, conflitos e novos benchmarks apos esta integracao validada. A falha do endpoint npm audit foi preservada; OSV-Scanner oficial foi executado como alternativa, cobrindo as 65 dependencias do lockfile sem achados na base consultada. O checkout de aproximadamente um segundo nao explica o lead time do cenario. Manter Git atende ao escopo sem introduzir uma plataforma indisponivel e desproporcional.

Fonte primaria: Anthropic, *Redesigning source control*, 13/10/2026, atualizado em 15/10/2026. https://www.anthropic.com/research/redesigning-source-control

Evidencias: [PR 1](https://github.com/luccalck67/carparts-git-scion/pull/1) e [benchmark](https://github.com/luccalck67/carparts-git-scion/actions/runs/39672466575).
