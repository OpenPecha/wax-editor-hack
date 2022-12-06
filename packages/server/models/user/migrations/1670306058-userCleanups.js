/* eslint-disable no-console */
const { logger } = require('@coko/server')

exports.up = async knex => {
  try {
    return knex.schema.alterTable('users', table => {
      table.dropColumn('agreed_tc')
      table.dropColumn('is_active')
      table.dropColumn('invitation_token')
      table.dropColumn('invitation_token_timestamp')
      table.dropColumn('given_names')
      table.dropColumn('surname')
      table.dropColumn('title_pre')
      table.dropColumn('title_post')
      table.dropColumn('type')
      table.renameColumn('created', 'created_at')
      table.renameColumn('updated', 'updated_at')
    })
  } catch (e) {
    logger.error('UserCleanups: Migration failed!')
    throw new Error(e)
  }
}
