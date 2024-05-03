const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const themeSchema = new Schema({
  page: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  logo: String,
  bgImg: String,
  bgClr: String,
  linkClr: String,
  fontLinkClr: String,
  shadowlinkClr: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
});

module.exports = mongoose.model('Theme', themeSchema);