const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  text: String
});

module.exports = mongoose.model('Message', Schema);