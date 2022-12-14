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
      table.text('type')
      table
        .timestamp('created', { useTz: true })
        .notNullable()
        .defaultTo(knex.fn.now())
      table.timestamp('updated', { useTz: true })
    })
  } catch (e) {
    logger.error('UserDocs: Initial: Migration failed!')
    throw new Error(e)
  }
}

exports.down = async knex => knex.schema.dropTable('user_docs')
