module.exports = {
  'pubsweet-client': {
    protocol: 'CLIENT_PROTOCOL',
    host: 'CLIENT_HOST',
    port: 'CLIENT_PORT',
  },
  'pubsweet-server': {
    admin: {
      username: 'ADMIN_USERNAME',
      password: 'ADMIN_PASSWORD',
      givenName: 'ADMIN_GIVEN_NAME',
      surname: 'ADMIN_SURNAME',
      email: 'ADMIN_EMAIL',
    },
    host: 'SERVER_HOST',
    port: 'SERVER_PORT',
    protocol: 'SERVER_PROTOCOL',
    secret: 'PUBSWEET_SECRET',
    serveClient: 'SERVER_SERVE_CLIENT',
    publicURL: 'PUBLIC_URL',
    baseURL: 'BASE_URL',
    db: {
      host: 'POSTGRES_HOST',
      port: 'POSTGRES_PORT',
      database: 'POSTGRES_DB',
      user: 'POSTGRES_USER',
      password: 'POSTGRES_PASSWORD',
    },
    useWebSockets: 'USE_WEB_SOCKETS',
    websocketPaths: 'WEB_SOCKET_PATHS',
  },
  'password-reset': {
    path: 'PASSWORD_RESET_PATH',
  },
  mailer: {
    from: 'MAILER_SENDER',
    transport: {
      host: 'MAILER_HOSTNAME',
      port: 'MAILER_PORT',
      auth: {
        user: 'MAILER_USER',
        pass: 'MAILER_PASS',
      },
    },
  },
}
