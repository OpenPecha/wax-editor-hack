const { logger } = require('@coko/server')

exports.up = knex => {
  try {
    return knex.schema.table('users', table => {
      table.string('middleName').nullable()
      table.string('displayName').nullable()
      table.string('phone').nullable()
      table.string('country').nullable()
      table.string('state').nullable()
      table.string('city').nullable()
      table.string('address').nullable()
      table.string('zipCode').nullable()
      table.string('source').nullable()
      table.boolean('profileSubmitted').defaultTo(false).notNullable()
    })
  } catch (e) {
    logger.error('UserAdditionalProperties: Migration failed!')
    throw new Error(e)
  }
}

exports.down = knex => knex.schema.dropTable('users')
