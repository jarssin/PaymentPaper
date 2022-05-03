'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TpContaSchema extends Schema {
  up () {
    this.create('tp_contas', (table) => {
      table.increments()
      table.string('name')
      table.timestamps()
    })
  }

  down () {
    this.drop('tp_contas')
  }
}

module.exports = TpContaSchema
