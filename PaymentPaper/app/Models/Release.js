'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Release extends Model {
    static get table() {
        return 'release_papers'
    }
}

module.exports = Release
