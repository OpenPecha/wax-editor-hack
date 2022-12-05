const { logger, useTransaction } = require('@coko/server')
const { User } = require('../models')

const updateUserProfile = async (userId, profileData) => {
  try {
    const { email, ...userData } = profileData

    return useTransaction(async trx => {
      const updatedUser = await User.patchAndFetchById(userId, userData, {
        trx,
      })

      return updatedUser
    })
  } catch (e) {
    logger.error(e)
    throw new Error(e)
  }
}

const getDisplayName = async user => User.getDisplayName(user)

const filterUsers = async (params, options = {}) => {
  try {
    const { trx, ...restOptions } = options

    return useTransaction(
      async tr => {
        logger.info(`filter users by query params`)
        return User.filter(params, {
          trx: tr,
          ...restOptions,
        })
      },
      { trx, passedTrxOnly: true },
    )
  } catch (e) {
    logger.error(`error filterUsers: ${e.message}`)
    throw new Error(e)
  }
}

module.exports = {
  updateUserProfile,
  filterUsers,
  getDisplayName,
}
