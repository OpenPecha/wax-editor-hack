const path = require('path')
const components = require('./components')

module.exports = {
  publicKeys: ['pubsweet', 'pubsweet-server'],
  pubsweet: {
    components,
  },
  authsome: {
    mode: path.join(__dirname, 'authsome.js'),
  },

  'pubsweet-server': {
    db: {},
    useGraphQLServer: false,
    useJobQueue: false,
    serveClient: false,
    graphiql: true,
    tokenExpiresIn: '360 days',
    externalServerURL: undefined,
    useWebSockets: true,
    // logger,
    port: 4000,
    protocol: 'http',
    host: 'localhost',
    uploads: 'uploads',
    pool: { min: 0, max: 10, idleTimeoutMillis: 1000 },
    admin: {
      username: 'ADMIN_USERNAME',
      password: 'ADMIN_PASSWORD',
      givenName: 'ADMIN_GIVEN_NAME',
      surname: 'ADMIN_SURNAME',
      email: 'ADMIN_EMAIL',
    },
  },
  'file-server': {
    accessKeyId: 'S3_ACCESS_KEY_ID_USER',
    secretAccessKey: 'S3_SECRET_ACCESS_KEY_USER',
    bucket: 'S3_BUCKET',
    protocol: 'S3_PROTOCOL',
    host: 'S3_HOST',
    port: 'S3_PORT',
    minioConsolePort: 'MINIO_CONSOLE_PORT',
  },
}
