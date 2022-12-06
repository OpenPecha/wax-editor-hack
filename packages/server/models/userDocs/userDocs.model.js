// const TeamModel = require('@coko/server/src/models/team/team.model')

const User = require('../user/user.model')

class UserDocs {
  static async searchForUserDocs(userId, query, options = {}) {
    try {
      if (!query) return []

      return User.query(options.trx)
        .where('id', builder => {
          return builder.select('doc_id.id').from('docs')
        })
        .whereIn(builder => {
          return builder
            .select('user_docs.doc_id')
            .from('user_docs')
            .where({ userId })
        })
    } catch (e) {
      throw new Error(e)
    }
  }
}

module.exports = UserDocs
