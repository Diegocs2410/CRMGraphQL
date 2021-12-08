const mongoose = require("mongoose");
require("dotenv").config();

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO);
    console.log("DB conectada");
  } catch (error) {
    console.log(error);
  }
};

module.exports = conectarDB;
