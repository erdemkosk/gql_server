const env = process.env.NODE_ENV || 'dev';
let enviromentConfig = require(`./enviroments/${env}`);


enviromentConfig = {
  ...enviromentConfig,
};

module.exports = enviromentConfig;