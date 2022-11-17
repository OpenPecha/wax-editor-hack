const { Model } = require('objection')

const Base = require('../cokodocsBase')

class Doc extends Base {
  constructor(properties) {
    super(properties)
    this.type = 'book'
  }

  static get tableName() {
    return 'Book'
  }

  $beforeInsert() {
    super.$beforeInsert()
    // If no reference id is given, assume that this is a new book & create one
    this.ensureIds()
  }

  $beforeUpdate() {
    super.$beforeUpdate()
    this.ensureIds()
  }
}

module.exports = Doc
