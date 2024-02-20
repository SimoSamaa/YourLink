const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const headerSchema = new Schema({
  title: {
    type: String,
    required: false
  },
  dataIndex: {
    type: Number,
    required: true
  },
  isDisable: {
    type: Boolean,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('header', headerSchema);