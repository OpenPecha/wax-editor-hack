const path = require('path')
const components = require('./components')
const permissions = require('./permissions')

module.exports = {
  pubsweet: {
    components,
  },
  authsome: {
    mode: path.join(__dirname, 'authsome.js'),
  },
  'password-reset': {
    path: 'password-reset',
  },
  mailer: {
    from: 'info@cokodocs.com',
    path: path.join(__dirname, 'mailer'),
  },
  permissions,
  publicKeys: ['authsome', 'pubsweet', 'pubsweet-client', 'pubsweet-server'],
  'pubsweet-client': {
    'login-redirect': '/',
    port: 3000,
    protocol: 'http',
    host: 'localhost',
  },
  'pubsweet-server': {
    db: {},
    useGraphQLServer: false,
    useJobQueue: false,
    serveClient: false,
    useWebSockets: true,
    useFileStorage: false,
    websocketPath: 'yjs',
    graphiql: false,
    externalServerURL: undefined,
    port: 4000,
    protocol: 'http',
    host: 'localhost',
    uploads: 'uploads',
    pool: { min: 0, max: 10, idleTimeoutMillis: 1000 },
  },
  schema: {},
}
