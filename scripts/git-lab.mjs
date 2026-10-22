import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(root, 'evidencias', 'git');
mkdirSync(output, { recursive: true });
const repo = mkdtempSync(join(tmpdir(), 'carparts-git-lab-'));
let lines = [
  '# Laboratorio Git executado',
  `Data UTC: ${new Date().toISOString()}`,
  'Escopo: repositorio local isolado, sem remoto e sem push. A main citada abaixo e local, nao a main protegida do GitHub.',
  'O bug e deliberado. Nao representa incidente real da empresa.', ''
];
function run(command, args, accepted = [0]) {
  const result = spawnSync(command, args, { cwd: repo, encoding: 'utf8', env: { ...process.env, GIT_EDITOR: 'true', GIT_TERMINAL_PROMPT: '0' } });
  lines.push(`$ ${command} ${args.join(' ')}`, result.stdout || '', result.stderr || '', `[exit ${result.status}]`, '');
  if (!accepted.includes(result.status)) throw new Error(`Falhou: ${command} ${args.join(' ')}\n${result.stderr}`);
  return `${result.stdout || ''}${result.stderr || ''}`.trim();
}
const git = (...args) => run('git', args);
const save = () => writeFileSync(join(output, 'execucao.log'), lines.join('\n'));
const file = (path, content) => writeFileSync(join(repo, path), content);
try {
  git('init', '-b', 'main');
  git('config', 'user.name', 'Lucca Castilho');
  git('config', 'user.email', '256704169+luccalck@users.noreply.github.com');
  file('calc.cjs', 'module.exports = (quantidade, preco) => quantidade * preco;\n');
  file('check.cjs', "require('node:assert/strict').equal(require('./calc.cjs')(2, 10), 20);\nconsole.log('Teste de total aprovado');\n");
  file('politica.md', 'Limite: indefinido\n');
  git('add', '.');
  git('commit', '-m', 'feat: cria calculo de total e teste');
  const initial = git('rev-parse', 'HEAD');
  lines.push('## 1. Conflito e rebase em branch local nunca publicada');
  git('switch', '-c', 'feat/politica-local');
  file('politica.md', 'Limite: dois dias uteis\n');
  git('add', 'politica.md');
  git('commit', '-m', 'docs: limita vida de branch');
  git('switch', 'main');
  file('politica.md', 'Limite: revisar diariamente\n');
  git('add', 'politica.md');
  git('commit', '-m', 'docs: define revisao diaria');
  git('switch', 'feat/politica-local');
  run('git', ['rebase', 'main'], [1]);
  if (git('diff', '--name-only', '--diff-filter=U') !== 'politica.md') throw new Error('Conflito esperado nao ocorreu');
  git('status', '--short');
  lines.push('Resolucao manual aplicada: preserva limite de dois dias e revisao diaria, sem descartar nenhuma intencao.');
  file('politica.md', 'Limite: dois dias uteis; revisar diariamente\n');
  git('add', 'politica.md');
  git('-c', 'core.editor=true', 'rebase', '--continue');
  run(process.execPath, ['check.cjs']);
  git('switch', 'main');
  git('merge', '--no-ff', 'feat/politica-local', '-m', 'docs: integra politica local validada');
  const good = git('rev-parse', 'HEAD');
  lines.push('## 2. Regressao deliberada e revert na main LOCAL');
  file('calc.cjs', 'module.exports = (quantidade, preco) => quantidade + preco;\n');
  git('add', 'calc.cjs');
  git('commit', '-m', 'test: insere bug deliberado no calculo');
  const bug = git('rev-parse', 'HEAD');
  run(process.execPath, ['check.cjs'], [1]);
  file('nota.md', 'Cenario didatico para rastreamento de regressao.\n');
  git('add', 'nota.md');
  git('commit', '-m', 'docs: registra cenario de rastreamento');
  const bad = git('rev-parse', 'HEAD');
  git('revert', '--no-edit', bug);
  const revert = git('rev-parse', 'HEAD');
  run(process.execPath, ['check.cjs']);
  lines.push('O revert cria um novo commit, preservando o commit defeituoso no historico. Nao houve reset nem reescrita.');
  lines.push('## 3. Busca automatizada com git bisect run');
  git('bisect', 'start', bad, good);
  run('git', ['bisect', 'run', 'node', 'check.cjs']);
  const identified = git('rev-parse', 'HEAD');
  if (identified !== bug) throw new Error(`Bisect identificou ${identified}, esperado ${bug}`);
  git('bisect', 'log');
  git('bisect', 'reset');
  run(process.execPath, ['check.cjs']);
  git('log', '--oneline', '--graph', '--all');
  const remotes = git('remote', '-v');
  if (remotes) throw new Error('Laboratorio deve estar sem remoto');
  writeFileSync(join(output, 'resultado.json'), JSON.stringify({
    timestamp: new Date().toISOString(), scope: 'local-only-no-remote', initial, good,
    bug, bad, revert, bisect_identified: identified, tests_after_revert: 'passed',
    remote_revert_via_reviewed_pr: 'not-executed',
    repository_on_disk: repo
  }, null, 2));
  lines.push('Resultado: conflito resolvido, rebase concluido, revert preservou historico e bisect encontrou exatamente o bug inserido.');
  save();
  console.log(JSON.stringify({ output, bug, revert, scope: 'local-only-no-remote' }));
} catch (error) {
  lines.push(`ERRO: ${error.message}`);
  save();
  throw error;
}
