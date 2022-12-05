const { logger, modelTypes, useTransaction } = require('@coko/server')
const UserModel = require('@coko/server/src/models/user/user.model')

const { applyListQueryOptions } = require('../helpers')

const { boolean, stringNullable } = modelTypes

class User extends UserModel {
  static get schema() {
    return {
      type: 'object',
      required: [],
      properties: {
        middleName: stringNullable,
        displayName: stringNullable,
        phone: stringNullable, // need formatting rule (only + and numbers?)
        country: stringNullable,
        state: stringNullable,
        city: stringNullable,
        address: stringNullable,
        zipCode: stringNullable,
        profileSubmitted: boolean,
      },
    }
  }

  static async getDisplayName(user) {
    if (user.displayName) return user.displayName
    return user.getDisplayName()
  }

  static async filter(data = {}, options = {}) {
    try {
      const { trx, ...otherOptions } = options
      const { search = '', ...params } = data

      return useTransaction(
        async tr => {
          let queryBuilder = this.query(tr)

          if (search) {
            queryBuilder = queryBuilder
              .withGraphJoined('defaultIdentity')
              .where(builder =>
                builder
                  .where('defaultIdentity.email', 'ilike', `%${search}%`)
                  .orWhere('displayName', 'ilike', `%${search}%`),
              )
          }

          queryBuilder = queryBuilder.where(params)

          return applyListQueryOptions(queryBuilder, otherOptions)
        },
        {
          trx,
          passedTrxOnly: true,
        },
      )
    } catch (e) {
      logger.error('Base model: find failed', e)
      throw new Error(e)
    }
  }
}

module.exports = User
