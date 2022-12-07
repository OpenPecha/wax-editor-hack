const { getDisplayName } = require('../../controllers/user.controllers')

const displayNameResolver = async user => {
  return getDisplayName(user)
}

module.exports = {
  User: {
    displayName: displayNameResolver,
  },
}
