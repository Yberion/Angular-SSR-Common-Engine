import 'zone.js/dist/zone-node';
import { fileURLToPath } from 'url';
import { dirname } from 'pathe';

// @ts-ignore
import ssrRenderer from '../../dist/ssr/main.server.mjs';

import { join } from 'path';
import fastify, { FastifyInstance } from 'fastify';
import fastifyStatic from '@fastify/static';
import { readFileSync } from 'fs';

// The Fastify app is exported so that it can be used by serverless Functions.
export function app(): FastifyInstance {
  const server = fastify();
  const DIST = join(process.cwd(), "dist/server/public");
  const INDEX_HTML = join(process.cwd(), "dist/server/public/index.html");
  const index = readFileSync(INDEX_HTML).toString('utf-8');

  server.register(fastifyStatic, {
    root: DIST,
    maxAge: '1y',
    // If set to true it will create a '/' get route and we don't want that
    index: false,
    // Need to be false, else we won't be able to create a wildcard route
    wildcard: false,
  });

  server.get('*', (req, res) => {
    const baseURL = req.protocol + '://' + req.headers.host;
    const url = new URL(req.url, baseURL);

    ssrRenderer(url.href, index)
      .then((r: string) => res.type('text/html').send(r))
      .catch((err: unknown) => console.error(err));
  });

  return server;
}

function run(): void {
  const PORT =
    (process.env['PORT'] && parseInt(process.env['PORT'], 10)) || 4001;

  // Start up the Node server
  const server = app();
  server.listen({ port: PORT }, (err, _address) => {
    console.log(`Fastify server listening on http://localhost:${PORT}`);
    if (err) throw err;
  });
}

run();
