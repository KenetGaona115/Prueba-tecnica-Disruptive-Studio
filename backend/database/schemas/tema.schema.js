const mongoose = require('mongoose');

const temaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  categorias: [String],
});

module.exports = mongoose.model('Tematica', temaSchema);