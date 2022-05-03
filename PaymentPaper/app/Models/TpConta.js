'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TpConta extends Model {
    static get table() {
        return 'tp_contas'
    }
}

module.exports = TpConta
