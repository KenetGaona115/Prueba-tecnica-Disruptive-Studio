const File = require('../schemas/contenido.schema.js')

class FileController {

    async create(data) {
        return await File.create(data)
    }

    async findOne(filter){
        return await File.findOne(filter)
    }

    async update(filter, data) {
        return await File.findOneAndUpdate(filter, data)
    }

    async delete(filter, data) {
        return await File.findOneAndDelete(filter, data)
    }
}

module.exports = Object.freeze(new FileController())