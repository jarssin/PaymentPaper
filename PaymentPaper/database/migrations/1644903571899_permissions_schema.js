'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PermissionsSchema extends Schema {
  up () {
    this.create('permissions', (table) => {
      table.increments()
      table.string('slug').notNullable()
      table.integer('who_gave_it')
        .references('id')
        .inTable('users')
        .notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('permissions')
  }
}

module.exports = PermissionsSchema
