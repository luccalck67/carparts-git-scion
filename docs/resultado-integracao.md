# Resultado da integracao

O PR 1 foi integrado na main pela merge queue em 22/10/2026 as 00:08:13, America/Sao_Paulo. O commit integrado e bfb9bc48c61bfa31454b700b76ee3e01440a5d54. Nao houve push direto na main nem bypass.

## Execucoes originais

- [CI do PR, run 39714992357](https://github.com/luccalck67/carparts-git-scion/actions/runs/39714992357): success.
- [CI do merge_group, run 39715139786](https://github.com/luccalck67/carparts-git-scion/actions/runs/39715139786): success, executado no mesmo SHA integrado.
- [PR 1 mesclado](https://github.com/luccalck67/carparts-git-scion/pull/1).
- [Snapshot dos registros originais](evidencias/integracao.json).

O CI verificou componentes, seletor por caminhos, cobertura da auditoria, laboratorio Git completo, segredos e gate quality. A suite local passou em 24 testes; seus grupos de testes sao executados nos jobs correspondentes do CI.

## Auditoria de dependencias

OSV-Scanner oficial 2.7.0, binario e checksum fixados, examinou as 65 dependencias e versoes do lockfile e nao encontrou vulnerabilidades na base consultada. O validador exigiu cobertura completa. O [relatorio original do merge group](evidencias/osv-merge-group.json) e o artefato do run preservam a evidencia. Falhas anteriores do endpoint npm audit continuam no historico e nao foram convertidas em sucesso.

## Revisao e protecao

A revisao tecnica assistida e a autorizacao de integracao constam em docs/revisao-tecnica-final.md, com commits de autoria configurada do responsavel. Isso nao e review independente APPROVED. O fluxo atual usa zero aprovacoes de outra conta, mantendo PR, quality do GitHub Actions e merge queue obrigatorios. CODEOWNERS foi integrado como mapeamento de responsabilidades. Administradores seguem sujeitos as regras; force push e exclusao sao bloqueados e nao ha atores de bypass no ruleset.

## Evidencias e limites

As capturas PNG foram obtidas diretamente do Chromium nas paginas publicas do GitHub, sem composicao visual. O snapshot da protecao e o ruleset foram exportados da API. Logs completos, OSV e resultado do laboratorio estao nos artefatos originais dos runs.

O benchmark de referencia permanece o mesmo: tres amostras por estrategia, checkout completo 1,026 s e enxuto 1,260 s; job 10,00 s e 8,67 s. Nao demonstra ganho sustentado nem reducao de lead time de 11 para dois dias. O laboratorio de revert e bisect e local e isolado, nao um incidente de producao. A conclusao tecnica nao garante nota atribuida pelo avaliador.
