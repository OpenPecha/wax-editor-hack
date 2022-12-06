/* eslint-disable no-console */
const { logger } = require('@coko/server')

exports.up = async knex => {
  try {
    return knex.schema.createTable('docs', table => {
      table.uuid('id').primary()
      table.text('name').notNullable()
      table.text('identifier').notNullable()
      table.text('docs_raw_text').notNullable()
      table.text('docs_html').notNullable()
      table.json('docs_mdash').notNullable()
      table.json('docs_wax_delta').notNullable()
      table.binary('docs_y_doc_state').notNullable()
      table
        .timestamp('created_at', { useTz: true })
        .notNullable()
        .defaultTo(knex.fn.now())
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  } catch (e) {
    logger.error('Doc: Initial: Migration failed!')
    throw new Error(e)
  }
}

exports.down = async knex => knex.schema.dropTable('docs')
