/* eslint-disable no-console */
const logger = require('@pubsweet/logger')

exports.up = async knex => {
  try {
    return knex.schema.createTable('users', table => {
      table.uuid('id').primary()
      table
        .timestamp('created', { useTz: true })
        .notNullable()
        .defaultTo(knex.fn.now())
      table.timestamp('updated', { useTz: true })
      table.boolean('admin').notNullable()
      table.text('email').notNullable()
      table.text('username').notNullable()
      table.text('password_hash').notNullable()
      table.text('password_reset_token').notNullable()
      table.timestamp('password_reset_timestamp').notNullable()
    })
  } catch (e) {
    logger.error('User: Initial: Migration failed!')
    throw new Error(e)
  }
}

exports.down = async knex => knex.schema.dropTable('users')
