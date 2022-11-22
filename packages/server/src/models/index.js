const file = require('./file')
const user = require('./user')
const doc = require('./doc')

module.exports = {
  file,
  user,
  doc,
  models: {
    File: file.model,
    User: user.model,
    Doc: doc.model,
  },
}
