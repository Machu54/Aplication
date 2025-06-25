const mongoose = require('mongoose');
require('dotenv').config();

const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl);

const collectionsh = new mongoose.Schema({
  categoria: String,
  garantia: String,
  precio: Number,
  marca: String
}, { versionKey: false });

module.exports = {
  coleccionmodelo: mongoose.model("productos", collectionsh)
};
