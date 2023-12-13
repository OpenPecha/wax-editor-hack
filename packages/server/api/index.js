const merge = require('lodash/merge')
const user = require('./user')
const doc = require('./doc')

module.exports = {
  typeDefs: [user.typeDefs, doc.typeDefs].join(' '),
  resolvers: merge({}, user.resolvers, doc.resolvers),
}
