'use strict'

const UserRepository = use('App/Repositories/UserRepository');

class UserService{
    async create( data ) {
        try {
            return await UserRepository.create(data)
        }
        catch (error) {
            return response.status(400).json({ message: error.message });
        }
    }
}


module.exports = UserService
