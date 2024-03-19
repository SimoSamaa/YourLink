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
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Header', headerSchema);