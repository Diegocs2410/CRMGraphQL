const { Schema, model } = require("mongoose");

const ClienteSchema = new Schema({
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
  empresa: {
    type: String,
    required: [true, "La empresa es necesaria"],
    trim: true,
  },
  telefono: {
    type: String,
    trim: true,
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
  vendedor: {
    type: Schema.Types.ObjectId,
    required: [true, "El vendedor es necesario"],
    ref: "Usuario",
  },
});

module.exports = model("Cliente", ClienteSchema);
