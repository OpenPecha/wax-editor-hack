const { modelTypes } = require('@coko/server')
// const UserModel = require('@coko/server/src/models/user/user.model')

const { stringNullable } = modelTypes

class Doc {
  static get schema() {
    return {
      type: 'object',
      required: [],
      properties: {
        name: stringNullable,
        identifier: stringNullable,
        docs_raw_text: stringNullable,
        docs_html: stringNullable,
        docs_mdash: stringNullable,
        docs_wax_delta: stringNullable,
        docs_y_doc_state: stringNullable,
      },
    }
  }

  static async getDocName(doc) {
    if (doc.name) return doc.name
    return doc.getDocName()
  }
}

module.exports = Doc
