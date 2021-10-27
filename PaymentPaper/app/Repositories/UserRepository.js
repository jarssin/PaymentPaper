'use strict'

const User = 'App/Models/User'

class UserRepository{
    async create( data ) {
        try {
            return await User.create(data)
        }
        catch (error) {
            return response.status(400).json({ message: error.message });
        }
    }
}


module.exports = UserRepository
