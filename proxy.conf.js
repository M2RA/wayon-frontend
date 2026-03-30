const PROXY_CONFIG = [
  {
    context: [`/dev/api/v1/wayon`],
    target: `http://localhost:8080`,
    secure: false,
    logLevel: 'debug'
  },
  {
    context: [`/api/v1/wayon`],
    target: `http://localhost:8081`,
    secure: false,
    logLevel: 'debug'
  }
];

module.exports = PROXY_CONFIG;
