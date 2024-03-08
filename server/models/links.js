const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const linkSchema = new Schema({
  title: {
    type: String,
    required: false
  },
  link: {
    type: String,
    required: false
  },
  layout: {
    type: String,
    required: true
  },
  icon: {
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

module.exports = mongoose.model('link', linkSchema);