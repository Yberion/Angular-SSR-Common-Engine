const minimist = require('minimist');

// Shape: { _: [ 'run', 'dd:serve-ssr:local-dev' ] }
const argv = minimist(process.argv.slice(2));

console.info('INFO: Initializing proxy config.', argv);

const proxyTargets = {
  'development': {
    '/api/chuck-norris': {
      pathRewrite: { '^/api/chuck-norris': '' },
      target: 'https://api.chucknorris.io',
      changeOrigin: true,
      secure: false,
      logLevel: 'debug'
    }
  },
  'production': {
    '/api/chuck-norris': {
      pathRewrite: { '^/api/chuck-norris': '' },
      target: 'https://api.chucknorris.io',
      changeOrigin: true
    }
  }
};

function getProxyTarget(argv) {
  let selectedProxyTarget = proxyTargets['development'];
  // '--configuration local-dev,local-staging'
  const configurations = argv['configuration'];

  // exemple with 'start:dev': ng serve --configuration local-dev --host 0.0.0.0
  // 'local-dev' proxy target will be selected
  if (configurations) {
    // [ 'local-dev', 'local-staging' ]
    const splittedStr = configurations.split(',');
    // 'local-staging'
    const lastConfiguration = splittedStr[splittedStr.length - 1];

    // 'local-staging' target proxy
    selectedProxyTarget = proxyTargets[lastConfiguration];
  } else {
    // exemple with 'start:ssr-fastify:dev': ng run dd:serve-ssr-fastify:local-dev
    // 'local-dev' proxy target will be selected

    // If we don't have a '--configuration XX' then we can assume that if one of the
    // 'argv' contain a ':', after splitting it, the last element should be the configuration

    for(const element of argv._) {
      // 'dd:serve-ssr-fastify:local-dev'
      if (element.includes(':')) {
        // [ 'dd', 'serve-ssr-fastify', 'local-dev' ]
        const splittedStr = element.split(':');
        // 'local-dev'
        const configuration = splittedStr[splittedStr.length - 1];

        // 'local-dev' target proxy
        selectedProxyTarget = proxyTargets[configuration];

        break;
      }
    }
  }

  return selectedProxyTarget;
}

const proxyConfig = getProxyTarget(argv);

console.info('Proxy config', proxyConfig);

module.exports = proxyConfig;
