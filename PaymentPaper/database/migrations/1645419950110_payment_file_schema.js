'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PaymentFileSchema extends Schema {
  up () {
    this.create('payment_files', (table) => {
      table.increments()
      table.string('path').notNullable()
      table.string('name').notNullable()
      table.string('client_name').notNullable()
      table.integer('rlsr_user_id') 
        .references('id')
        .inTable('users')
        .notNullable()
      table.integer('company_id').notNullable()
      table.enum('type', ['payment', 'items']).defaultTo('payment')
      table.timestamps()
    })
  }

  down () {
    this.drop('payment_files')
  }
}

module.exports = PaymentFileSchema
