const path = require('path')
const components = require('./components')
const permissions = require('./permissions')

module.exports = {
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
  pubsweet: {
    components,
  },
  'pubsweet-client': {
    API_ENDPOINT: '/api',
  },
  'pubsweet-server': {
    db: {},
    useGraphQLServer: false,
    useJobQueue: false,
    serveClient: false,
    useFileStorage: false,
    graphiql: false,
    emailVerificationTokenExpiry: {
      amount: 24,
      unit: 'hours',
    },
    passwordResetTokenExpiry: {
      amount: 24,
      unit: 'hours',
    },
    uploads: 'uploads',
    pool: { min: 0, max: 10, idleTimeoutMillis: 1000 },
  },
  teams: {
    global: {},
    nonGlobal: {},
  },

  schema: {},
  validations: path.join(__dirname, 'modules', 'validations'),
}
