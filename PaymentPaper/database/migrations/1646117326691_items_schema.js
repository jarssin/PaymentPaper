'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItemsSchema extends Schema {
  up () {
    this.create('items', (table) => {
      table.increments()
      table.string('cd_conta').notNullable()
      table.string('tp_conta').notNullable()
      table.string('description').notNullable()
      table.enum('type', ['PROVENTO', 'INFORMATIVA', 'DESCONTO'])
      table.boolean('is_effective').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('items')
  }
}

module.exports = ItemsSchema
