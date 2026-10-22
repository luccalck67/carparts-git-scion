# Auditoria das dependencias

O endpoint de npm audit apresentou timeout, reproduzido localmente e no GitHub Actions. Essas execucoes foram preservadas como falhas, nao reclassificadas como aprovadas.

O CI utiliza OSV-Scanner 2.7.0, distribuido pelo projeto oficial google/osv-scanner. A versao e o SHA-256 do binario estao fixados no workflow. O scanner le o package-lock.json e consulta a base OSV por nome e versao; nao depende do endpoint npm de auditoria. A instalacao continua sendo npm ci com integridades do lockfile e scripts de instalacao desabilitados.

Na verificacao local, o scanner identificou 65 pacotes, consultou a base e retornou codigo zero, sem vulnerabilidades conhecidas encontradas. O validador confere que cada dependencia e versao do lockfile aparece no relatorio. Relatorio vazio, cobertura incompleta, versao divergente ou vulnerabilidade encontrada bloqueiam o gate; quatro testes verificam esses comportamentos. A suite completa passou em 24 testes locais.

O relatorio JSON e salvo como artefato do job audit, inclusive quando uma etapa falha. Falha do scanner, timeout, checksum incorreto ou resultado nao aprovado nao sao ignorados e impedem quality. Gitleaks, teste de caminhos, laboratorio Git e testes dos componentes foram mantidos.

OSV e npm audit nao possuem necessariamente bases e resultados identicos. A verificacao e uma auditoria real alternativa, nao uma afirmacao de que npm audit voltou a funcionar. Nenhum scanner prova ausencia absoluta de vulnerabilidades; o resultado representa as versoes e a base consultadas na execucao.

Fontes primarias:
- https://github.com/google/osv-scanner/releases/tag/v2.7.0
- https://google.github.io/osv-scanner/usage/scan-source/
