const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    alias: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    tipoUsuario: {
      type: String,
      enum: ['lector', 'creador', 'admin'],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    creditos: {
      imagenes: {
        type: Number,
        default: 0,
      },
      videos: {
        type: Number,
        default: 0,
      },
      textos: {
        type: Number,
        default: 0,
      },
    }
  });
  
  module.exports = mongoose.model('Usuario', usuarioSchema);