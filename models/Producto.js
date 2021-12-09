const { Schema, model } = require("mongoose");

const ProductoSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es necesario"],
    trim: true,
  },
  existencia: {
    type: Number,
    required: [true, "La existencia es necesaria"],
    trim: true,
  },
  precio: {
    type: Number,
    required: [true, "El precio es necesario"],
    trim: true,
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("Producto", ProductoSchema);
