const Usuario = require("../models/Usuario");
const Producto = require("../models/Producto");
const Cliente = require("../models/Cliente");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { create } = require("../models/Usuario");
require("dotenv").config();
// Create jwt token
const createToken = (user, secret, expiresIn) => {
  const { email, _id } = user;
  return jwt.sign({ _id, email }, secret, { expiresIn });
};

// Resolvers for the db schema.
const resolvers = {
  Query: {
    obtenerUsuario: async (_, { token }) => {
      try {
        const usuarioId = await jwt.verify(token, process.env.SECRET_KEY);
        return await Usuario.findOne({ usuarioId });
      } catch (err) {
        console.log(err);
      }
    },
    obtenerProductos: async () => {
      try {
        return await Producto.find();
      } catch (err) {
        console.log(err);
      }
    },
    obtenerProducto: async (_, { id }) => {
      try {
        const producto = await Producto.findById(id);
        if (!producto) throw new Error("Producto no encontrado");
        return producto;
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    nuevoUsuario: async (_, { input }, ctx, info) => {
      try {
        const { email, password } = input;
        const salt = await bcrypt.genSalt(10);
        input.password = await bcrypt.hash(password, salt);
        const usuario = await Usuario.findOne({ email });
        if (usuario) throw new Error("El usuario ya existe");
        return await Usuario.create(input);
      } catch (err) {
        console.log(err);
      }
    },
    autenticarUsuario: async (_, { input }, ctx, info) => {
      try {
        const { email, password } = input;
        const usuario = await Usuario.findOne({ email });
        if (!usuario) throw new Error("El usuario no existe");
        const validPassword = await bcrypt.compare(password, usuario.password);
        if (!validPassword) throw new Error("Contraseña incorrecta");
        return {
          token: createToken(usuario, process.env.SECRET_KEY, "1d"),
        };
      } catch (err) {
        console.log(err);
      }
    },
    nuevoProducto: async (_, { input }, ctx, info) => {
      try {
        return await Producto.create(input);
      } catch (err) {
        console.log(err);
      }
    },
    actualizarProducto: async (_, { id, input }, ctx, info) => {
      try {
        const producto = await Producto.findById(id);
        if (!producto) throw new Error("Producto no encontrado");
        return Producto.findByIdAndUpdate(id, input, { new: true });
      } catch (err) {
        console.log(err);
      }
    },
    eliminarProducto: async (_, { id }, ctx, info) => {
      try {
        const producto = await Producto.findById(id);
        if (!producto) throw new Error("Producto no encontrado");
        return Producto.findByIdAndDelete(id, {
          new: true,
        });
      } catch (err) {
        console.log(err);
      }
    },
    nuevoCliente: async (_, { input }, ctx, info) => {
      try {
        const { email } = input;
        const cliente = await Cliente.findOne({ email });
        if (cliente) throw new Error("El cliente ya existe");

        const nuevoCliente = await Cliente.create(input);
        nuevoCliente.vendedor = ;

        return await Cliente.create(input);
      } catch (err) {
        console.log(err);
      }
    },
  },
};

module.exports = resolvers;
