const { Schema, model } = require("mongoose");

const UsuariosSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es necesario"],
    trim: true,
  },
  apellido: {
    type: String,
    required: [true, "El apellido es necesario"],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "El correo es necesario"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es necesaria"],
    trim: true,
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("Usuario", UsuariosSchema);
