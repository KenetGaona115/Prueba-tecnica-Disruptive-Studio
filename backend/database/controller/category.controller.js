const Category = require('../schemas/categorias.schema.js')

class CategoryController {

    async create(data) {
        return await Category.create(data)
    }

    async findOne(filter) {
        return await Category.findOne(filter)
    }

    async findAll(filter) {
        return await Category.find(filter)
    }

    async update(filter, data) {
        return await Category.findOneAndUpdate(filter, data)
    }

    async delete(filter, data) {
        return await Category.findOneAndDelete(filter)
    }

}

module.exports = Object.freeze(new CategoryController())