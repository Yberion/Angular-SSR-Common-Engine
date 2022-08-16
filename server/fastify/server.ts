import 'zone.js/dist/zone-node';

import { AppServerModule } from '../../src/main.server';
import { CommonEngine } from '@nguniversal/common/engine';
import { APP_BASE_HREF } from '@angular/common';

import { join } from 'path';
import fastify, { FastifyInstance } from 'fastify';
import fastifyStatic from '@fastify/static';

// The Fastify app is exported so that it can be used by serverless Functions.
export function app(): FastifyInstance {
  const server = fastify();
  const DIST = join(__dirname, '../../browser');
  const INDEX_HTML = join(__dirname, '../../browser/index.html');

  const commonEngine = new CommonEngine();

  server.register(fastifyStatic, {
    root: DIST,
    maxAge: '1y',
    // Need to be false, else we won't be able to create a wildcard route
    wildcard: false
  });

  server.get('*', (req, res) => {
    const baseURL =  req.protocol + '://' + req.headers.host;
    const url = new URL(req.url, baseURL);

    commonEngine.render({
      bootstrap: AppServerModule,
      documentFilePath: INDEX_HTML,
      url: url.href,
      providers: [{ provide: APP_BASE_HREF, useValue: baseURL }]
    })
    .then((r) => res.type('text/html').send(r))
    .catch(err => console.error(err));
  });

  return server;
}

function run(): void {
  const PORT = (process.env['PORT'] && parseInt(process.env['PORT'], 10)) || 4001;

  // Start up the Node server
  const server = app();
  server.listen({ port: PORT }, (err, _address) => {
    console.log(`Fastify server listening on http://localhost:${PORT}`);
    if (err) throw err
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from '../../src/main.server';
