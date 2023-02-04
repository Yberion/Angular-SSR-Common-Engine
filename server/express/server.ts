import 'zone.js/dist/zone-node';

import { AppServerModule } from '../../src/main.server';
import { CommonEngine } from '@nguniversal/common/engine';
import { APP_BASE_HREF } from '@angular/common';

import { join } from 'path';
import express, { Express } from 'express';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): Express {
  const server = express();
  const DIST = join(__dirname, '../../browser');
  const INDEX_HTML = join(__dirname, '../../browser/index.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', DIST);

  server.get('*.*', express.static(DIST, {
    maxAge: '1y'
  }));

  server.get('*', (req, res, next) => {
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const hostname = req.headers['x-forwarded-host'] || req.headers['host'] || '';
    const baseHref = protocol + '://' + hostname;
    const nodeUrl = new URL(req.url, baseHref);

    commonEngine.render({
      bootstrap: AppServerModule,
      documentFilePath: INDEX_HTML,
      url: nodeUrl.href,
      providers: [{ provide: APP_BASE_HREF, useValue: baseHref }]
    })
    .then((r) => res.send(r))
    .catch(err => next(err));
  });

  return server;
}

function run(): void {
  const PORT = (process.env['PORT'] && parseInt(process.env['PORT'], 10)) || 4000;

  // Start up the Node server
  const server = app();
  server.listen(PORT, () => {
    console.log(`Express server listening on http://localhost:${PORT}`);
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
