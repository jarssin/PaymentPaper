'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Permission extends Model {
    static boot() {
        super.boot();
        this.addHook('beforeCreate', 'PublicationHook.uuid');
    }

    static get table(){
        return 'permissions';
    }

    user () {
        return this.belongsTo('App/Models/User');
    }
}

module.exports = Permission
