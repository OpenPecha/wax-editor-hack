const { logger } = require('@coko/server')

exports.up = knex => {
    return knex.schema.table('users', table => {
        table.string('agreed_tc').nullable()
        table.timestamp('created').nullable()
        table.timestamp('updated').nullable()
        table.string('given_names').nullable()
        table.string('surname').nullable()
        table.string('type').nullable()
        table.boolean('is_active').nullable()
    })
}

exports.down = knex => knex.schema.dropTable('users')
