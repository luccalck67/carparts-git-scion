import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const git = (...args) => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 }).trim();
const prompt = readFileSync('prompts/revisao.md', 'utf8');
for (const term of ['revisao humana', 'Nao invente', 'historico compartilhado', 'dados pessoais']) {
  if (!prompt.includes(term)) throw new Error(`Regra obrigatoria ausente: ${term}`);
}
const patterns = [
  new RegExp(['AK', 'IA', '[A-Z0-9]{16}'].join('')),
  new RegExp(['AS', 'IA', '[A-Z0-9]{16}'].join('')),
  new RegExp(['gh', '[pousr]_', '[A-Za-z0-9]{30,}'].join('')),
  new RegExp(['github', '_pat_', '[A-Za-z0-9_]{40,}'].join('')),
  new RegExp(['-----BEGIN ', '(?:RSA |EC |OPENSSH )?', 'PRIVATE KEY-----'].join(''))
];
const revisions = git('rev-list', '--all').split('\n').filter(Boolean);
const seen = new Set();
for (const revision of revisions) {
  for (const entry of git('ls-tree', '-r', revision).split('\n')) {
    const match = entry.match(/^\d+ blob ([a-f0-9]+)\t(.+)$/);
    if (!match) continue;
    const [, object, path] = match;
    if (/(^|\/)\.env(?:\.|$)/.test(path)) throw new Error(`Arquivo proibido no historico: ${path}`);
    if (seen.has(object)) continue;
    seen.add(object);
    const content = git('cat-file', '-p', object);
    if (patterns.some(pattern => pattern.test(content))) throw new Error(`Possivel segredo em ${path}; valor omitido`);
  }
}
const files = git('ls-files', '--cached', '--others', '--exclude-standard').split('\n').filter(Boolean);
for (const file of files) {
  if (/(^|\/)\.env(?:\.|$)/.test(file)) throw new Error(`Arquivo proibido: ${file}`);
  const content = readFileSync(file, 'utf8');
  if (patterns.some(pattern => pattern.test(content))) throw new Error(`Possivel segredo em ${file}; valor omitido`);
}
console.log(`Verificacao concluida: ${revisions.length} commits, ${seen.size} blobs e ${files.length} arquivos atuais. Sem ocorrencias nos padroes verificados.`);
console.log('Esta verificacao por padroes nao prova ausencia absoluta de segredos. Revisao humana continua obrigatoria.');
