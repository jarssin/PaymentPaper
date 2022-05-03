'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CtaPagSchema extends Schema {
  up () {
    this.create('release_papers', (table) => {
      table.increments()
      table.string('value')
      table.string('reference')
      table.integer('company_id')
      table.integer('item_id')
        .references('id')
        .inTable('items')
        .notNullable()
      table.integer('file_id')
        .references('id')
        .inTable('payment_files')
        .onDelete('SET NULL')
      table.integer('collaborator_id')
        .references('id')
        .inTable('collaborators')
      table.timestamps()
    })
  }

  down () {
    this.drop('cta_pag')
  }
}

module.exports = CtaPagSchema
