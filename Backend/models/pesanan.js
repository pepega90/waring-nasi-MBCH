const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pesananSchema = new Schema({
  nama: {
    type: String,
    required: true
  },
  pesanan: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('pesanan', pesananSchema);
