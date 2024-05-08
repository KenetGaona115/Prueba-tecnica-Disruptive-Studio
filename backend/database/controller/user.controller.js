const User = require('../schemas/user.schema.js')

class UserController {
    async login(data) {
        return await User.findOne({ email: data.email })
    }

    async create(data) {
        return await User.create(data)
    }

    async findOne(filter){
        return await User.findOne(filter)
    }


}

module.exports = Object.freeze(new UserController())