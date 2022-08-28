# Angular-SSR-Common-Engine

Angular SSR implementation using Common Engine:

-  :white_check_mark: `Express`
    - Somehow `serve-ssr` on the Express server seems not to work properly on hot reload (I will try to investigate later)
-  :white_check_mark: `Fastify`
    - It seems that we explicitly need to indicate that the response type is `text/html`
    - Somehow `serve-ssr` on the Fastify server seems not to work properly on hot reload (I will try to investigate later)
