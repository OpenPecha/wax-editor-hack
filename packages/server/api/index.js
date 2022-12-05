const merge = require('lodash/merge')
const user = require('./user')

module.exports = {
  typeDefs: [user.typeDefs].join(' '),
  resolvers: merge({}, user.resolvers),
}
