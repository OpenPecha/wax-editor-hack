/* eslint-disable no-console */
const logger = require('@pubsweet/logger')

exports.up = async knex => {
  try {
    return knex.schema.createTable('docs', table => {
      table.uuid('id').primary()
      table.text('name').notNullable()
      table.text('identifier').notNullable()
      table.text('notes_raw_text').notNullable()
      table.text('notes_html').notNullable()
      table.json('notes_mdash').notNullable()
      table.json('notes_wax_delta').notNullable()
      table.binary('notes_y_doc_state').notNullable()
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
