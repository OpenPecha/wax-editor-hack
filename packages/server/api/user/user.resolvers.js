const { logger } = require('@coko/server')

const {
  updateUserProfile,
  filterUsers,
  getDisplayName,
} = require('../../controllers/user.controllers')

const updateUserProfileResolver = async (_, { input }, ctx) => {
  return updateUserProfile(ctx.user, input)
}

const filterUsersResolver = async (_, { params, options }, _ctx) => {
  try {
    return filterUsers(params, options)
  } catch (e) {
    logger.error(`search resolver error: ${e.message}`)
    throw new Error(e)
  }
}

const displayNameResolver = async user => {
  return getDisplayName(user)
}

module.exports = {
  Mutation: {
    updateUserProfile: updateUserProfileResolver,
  },
  Query: {
    filterUsers: filterUsersResolver,
  },
  User: {
    displayName: displayNameResolver,
  },
}
