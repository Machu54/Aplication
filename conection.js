const mongoose = require('mongoose');
require('dotenv').config();

const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl, {

});

const collectionsh = new mongoose.Schema({
  user_id: String,
  jwt: String,
}, { versionKey: false });

module.exports = {
  coleccionmodelo: mongoose.model("sessions", collectionsh)
};
