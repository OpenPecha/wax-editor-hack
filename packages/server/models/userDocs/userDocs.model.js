const { BaseModel, uuid } = require('@coko/server')

class UserDocs extends BaseModel {
  constructor(properties) {
    super(properties)
    this.type = 'UserDocs'
  }

  static get tableName() {
    return 'user_docs'
  }

  static get schema() {
    return {
      type: 'object',
      properties: {
        user_id: uuid,
        doc_id: uuid,
      },
    }
  }
}

module.exports = UserDocs
