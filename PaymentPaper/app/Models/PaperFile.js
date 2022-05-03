'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PaperFile extends Model {
    static get table() {
        return 'payment_files'
    }
}

module.exports = PaperFile
