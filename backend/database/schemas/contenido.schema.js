const mongoose = require('mongoose');

const contenidoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
  },
  categoria: {
    type: String,
    required: true,
  },
  tematica: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  creador: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Contenido', contenidoSchema);