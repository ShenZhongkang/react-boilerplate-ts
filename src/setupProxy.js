/**
 * Configure Http Proxy
 */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { createProxyMiddleware } = require('http-proxy-middleware');

const divider = chalk.gray('\n-----------------------------------');

// logger
const logger = {
  error: err => {
    console.error(chalk.red(err));
  },
  proxyReversed: (target, apis) => {
    console.log(
      `
        Proxy to ${chalk.bold(target)} ${chalk.green('✓')}${divider}
      `,
    );
    apis.forEach(api => {
      console.log(`${chalk.magenta(api)}`);
    });
    console.log(chalk.gray('-----------------------------------\n'));
  },
  appStarted: (port, tunnelStarted) => {
    console.log(`Server started ${chalk.green('✓')}`);
    if (tunnelStarted) {
      console.log(`Tunnel initialised ${chalk.green('✓')}`);
    }
    console.log(
      `
        ${chalk.bold('Access URLs:')}${divider}
        Localhost: ${chalk.magenta(`http://localhost:${port}`)}
        ${tunnelStarted ? `\n     Proxy: ${chalk.magenta(tunnelStarted)}` : ''}
        ${divider}
        ${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
      `,
    );
  },
};

const addProxyMiddleware = app => {
  // proxy path
  const proxyFilePath = path.resolve(process.cwd(), 'proxy.json');
  let config = {};

  if (fs.existsSync(proxyFilePath)) {
    try {
      config = JSON.parse(fs.readFileSync(proxyFilePath, 'utf-8'));
    } catch (error) {
      logger.error(`Parse ./proxy.json: ${error.message}`);
      process.exit(0);
    }
  }

  try {
    Object.keys(config).forEach(ck => {
      const service = config[ck];
      service.apis.forEach(api =>
        app.use(
          createProxyMiddleware(api, {
            target: service.target,
            logLevel: 'info',
            changeOrigin: service.hasOwnProperty('changeOrigin')
              ? service.changeOrigin
              : true,
          }),
        ),
      );
    });
  } catch (err) {
    logger.error(`Proxy config error: ${err.message}`);
    process.exit(0);
  }
};

module.exports = addProxyMiddleware;
