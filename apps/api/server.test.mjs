import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from './server.mjs';

test('API responde health, catalogo, orcamento e validacoes por HTTP', async () => {
  const server = createApp().listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    assert.equal((await (await fetch(`${base}/health`)).json()).status, 'ok');
    assert.equal((await (await fetch(`${base}/parts`)).json()).length, 3);
    assert.equal((await fetch(`${base}/parts/ausente`)).status, 404);
    for (const [quantity, status] of [[2, 200], [0, 400], [9, 400], ['2', 400]]) {
      const response = await fetch(`${base}/quote`, {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id: 'P001', quantity })
      });
      assert.equal(response.status, status);
      if (status === 200) assert.equal((await response.json()).total, 251.8);
    }
    assert.equal((await fetch(`${base}/quote`, { method: 'POST' })).status, 400);
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
});
