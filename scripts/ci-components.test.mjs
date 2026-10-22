import test from 'node:test';
import assert from 'node:assert/strict';
import { selectComponents } from './ci-components.mjs';

const names = (files, event) => selectComponents(files, event).map(item => item.component);
for (const [name, files, expected] of [
  ['API isolada', ['apps/api/catalog.mjs'], ['api']],
  ['portal isolado', ['apps/portal/catalog.mjs'], ['portal']],
  ['biblioteca e consumidor', ['libs/ui/format.mjs'], ['portal', 'ui']],
  ['documentacao com verificacao conservadora', ['docs/parecer-scion.md'], ['api', 'portal', 'ui']],
  ['prompts com verificacao conservadora', ['prompts/revisao.md'], ['api', 'portal', 'ui']],
  ['caminho desconhecido sem pular testes', ['novo/arquivo.mjs'], ['api', 'portal', 'ui']],
  ['lockfile global', ['package-lock.json'], ['api', 'portal', 'ui']]
]) {
  test(name, () => assert.deepEqual(names(files), expected));
}
test('merge_group verifica todos os componentes', () => {
  assert.deepEqual(names(['apps/api/catalog.mjs'], 'merge_group'), ['api', 'portal', 'ui']);
});
