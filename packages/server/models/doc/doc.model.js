const { modelTypes, BaseModel } = require('@coko/server')

const { stringNotEmpty, arrayOfObjects } = modelTypes

class Doc extends BaseModel {
  
  constructor(properties) {
    super(properties)
    this.type = 'doc'
  }

  static get tableName() {
    return 'docs'
  }


  static get schema() {
    return {
      type: 'object',
      properties: {
        identifier: stringNotEmpty,
        docs_prosemirror_delta: arrayOfObjects, 
        docs_y_doc_state: {
          type: "binary",
        },
      },
    }
  }

  static async getDocName(doc) {
    if (doc.name) return doc.name
    return doc.getDocName()
  }
}

module.exports = Doc
