const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'I am new!',
  },
  headers: [ { type: Schema.Types.ObjectId, ref: 'Header' } ],
  links: [ { type: Schema.Types.ObjectId, ref: 'Link' } ]
});

module.exports = mongoose.model('user', userSchema);