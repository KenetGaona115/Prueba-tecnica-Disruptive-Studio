const Thematic = require('../schemas/tema.schema.js')

class ThematicController {

    async create(data) {
        return await Thematic.create(data)
    }

    async findOne(filter) {
        return await Thematic.findOne(filter)
    }

    async update(filter, data) {
        return await Thematic.findOneAndUpdate(filter, data)
    }

    async delete(filter, data) {
        return await Thematic.findOneAndDelete(filter, data)
    }
}

module.exports = Object.freeze(new ThematicController())