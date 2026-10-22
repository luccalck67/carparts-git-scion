import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, renameSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { selectComponents, changedFiles } from './ci-components.mjs';

const names = (files, event) => selectComponents(files, event).map(item => item.component);
for (const [name, files, expected] of [
  ['API isolada', ['apps/api/catalog.mjs'], ['api']],
  ['portal isolado', ['apps/portal/catalog.mjs'], ['portal']],
  ['biblioteca e consumidor', ['libs/ui/format.mjs'], ['portal', 'ui']],
  ['documentacao com verificacao conservadora', ['docs/parecer-scion.md'], ['api', 'portal', 'ui']],
  ['prompts com verificacao conservadora', ['prompts/revisao.md'], ['api', 'portal', 'ui']],
  ['caminho desconhecido sem pular testes', ['novo/arquivo.mjs'], ['api', 'portal', 'ui']],
  ['lockfile global', ['package-lock.json'], ['api', 'portal', 'ui']],
  ['desconhecido com API', ['apps/api/catalog.mjs', 'novo/arquivo.mjs'], ['api', 'portal', 'ui']],
  ['desconhecido com portal', ['apps/portal/catalog.mjs', 'novo/arquivo.mjs'], ['api', 'portal', 'ui']],
  ['diretorio parecido nao e componente', ['apps/api-nova/index.mjs', 'apps/api/catalog.mjs'], ['api', 'portal', 'ui']]
]) {
  test(name, () => assert.deepEqual(names(files), expected));
}
test('merge_group verifica todos os componentes', () => {
  assert.deepEqual(names(['apps/api/catalog.mjs'], 'merge_group'), ['api', 'portal', 'ui']);
});

test('extracao real inclui origem e destino de rename entre componentes', () => {
  const repo = mkdtempSync(join(tmpdir(), 'carparts-rename-test-'));
  const git = (...args) => execFileSync('git', args, { cwd: repo, encoding: 'utf8' }).trim();
  try {
    git('init', '-b', 'main');
    git('config', 'user.name', 'Teste local');
    git('config', 'user.email', 'teste@example.invalid');
    mkdirSync(join(repo, 'libs/ui'), { recursive: true });
    mkdirSync(join(repo, 'apps/api'), { recursive: true });
    writeFileSync(join(repo, 'libs/ui/format copy.mjs'), 'export const price = 12;\n');
    git('add', '.');
    git('commit', '-m', 'test: cria biblioteca');
    const base = git('rev-parse', 'HEAD');
    renameSync(join(repo, 'libs/ui/format copy.mjs'), join(repo, 'apps/api/format copy.mjs'));
    git('add', '-A');
    git('commit', '-m', 'test: move biblioteca para API');
    const head = git('rev-parse', 'HEAD');
    assert.match(git('diff', '--name-status', '-M', `${base}...${head}`), /^R100/);
    const paths = changedFiles(base, head, repo);
    assert.deepEqual(paths.sort(), ['apps/api/format copy.mjs', 'libs/ui/format copy.mjs']);
    assert.deepEqual(names(paths), ['api', 'portal', 'ui']);
  } finally {
    rmSync(repo, { recursive: true, force: true });
  }
});
