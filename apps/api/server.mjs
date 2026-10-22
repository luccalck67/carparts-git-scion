import express from 'express';
import { pathToFileURL } from 'node:url';
import { listParts, findPart, quote } from './catalog.mjs';

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '10kb' }));
  app.get('/health', (_req, res) => res.json({ status: 'ok', environment: 'laboratorio' }));
  app.get('/parts', (_req, res) => res.json(listParts()));
  app.get('/parts/:id', (req, res) => {
    const part = findPart(req.params.id);
    if (!part) return res.status(404).json({ error: 'Peca nao encontrada' });
    res.json(part);
  });
  app.post('/quote', (req, res) => {
    try {
      res.json(quote(req.body?.id, req.body?.quantity));
    } catch (error) {
      if (error instanceof RangeError) return res.status(400).json({ error: error.message });
      throw error;
    }
  });
  return app;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const port = Number(process.env.PORT || 3000);
  createApp().listen(port, '127.0.0.1', () => console.log(`API local: http://127.0.0.1:${port}`));
}
