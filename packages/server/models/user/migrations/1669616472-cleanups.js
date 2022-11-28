/* eslint-disable no-console */
const logger = require('@pubsweet/logger')

exports.up = async knex => {
  try {
    return knex.schema.alterTable('users', table => {
      table.dropColumn('fragments')
      table.dropColumn('collections')
      table.dropColumn('teams')
      table.dropColumn('type')
      table.renameColumn('created', 'created_at')
      table.renameColumn('updated', 'updated_at')
    })
  } catch (e) {
    logger.error('User: Cleanups: Migration failed!')
    throw new Error(e)
  }
}
