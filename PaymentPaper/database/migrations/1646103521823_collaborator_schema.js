'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CollaboratorSchema extends Schema {
  up () {
    this.create('collaborators', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('cpf').notNullable()
      table.string('cep').notNullable()
      table.integer('address_number').notNullable()
      table.boolean('is_effective').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('collaborators')
  }
}

module.exports = CollaboratorSchema
