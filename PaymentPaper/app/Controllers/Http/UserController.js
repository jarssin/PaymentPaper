'use strict'

const User = use('App/Models/User')

class UserController {
    async store({ request, response }) {
        try {
            const data = request.all()
            const user = await User.create(data)
            return response.status(201).json(user)
        }
        catch (error) {
            return response.status(400).json({ message: error.message })
        }
    }

    async login ({ auth, request, response }) {
        const { email, password } = request.all()
        const user = await auth.attempt(email, password)
    
        return response.status(200).json({ user })
    }
}

module.exports = UserController
