const { logger } = require('@coko/server')

exports.up = async knex => {
  try {
    return knex.schema.createTable('user_docs', table => {
      table.uuid('id').primary()
      table
        .uuid('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table
        .uuid('doc_id')
        .notNullable()
        .references('id')
        .inTable('docs')
        .onDelete('CASCADE')
    })
  } catch (e) {
    logger.error('UserDocs: Initial: Migration failed!')
    throw new Error(e)
  }
}

exports.down = async knex => knex.schema.dropTable('user_docs')
