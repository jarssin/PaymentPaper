'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PermissionSchema extends Schema {
  up () {
    this.create('permissions', (table) => {
      table.uuid('id').primary()
      table.uuid('token') 
      table.string('slug')
      table.integer('user_id').notNullable()
      table.timestamps();
    })
  }

  down () {
    this.drop('permissions')
  }
}

module.exports = PermissionSchema
