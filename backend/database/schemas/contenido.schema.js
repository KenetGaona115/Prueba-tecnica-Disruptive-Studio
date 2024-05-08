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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true,
  },
  tematica: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tematica',
    required: true,
  },
  tipoContenido: {
    type: String,
    enum: ['imagen', 'video', 'texto'],
    required: true,
  },
  url: {
    type: String,
    required: function () {
      return this.tipoContenido === 'imagen' || this.tipoContenido === 'video';
    },
  },
  texto: {
    type: String,
    required: function () {
      return this.tipoContenido === 'texto';
    },
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  visitas: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Contenido', contenidoSchema);