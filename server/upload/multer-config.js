const multer = require('multer');
const id = require('uuid').v4();

const userProfileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, id + '-' + file.originalname);
  }
});

const iconLinkStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'icons');
  },
  filename: (req, file, cb) => {
    cb(null, id + '-' + file.originalname);
  }
});

const imgFilterType = (req, file, cb) => {
  if(
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const iconLinkFilterType = (req, file, cb) => {
  if(
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/svg+xml'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadImgProfile = multer({
  storage: userProfileStorage,
  fileFilter: imgFilterType,
  limits: { fileSize: 1024 * 1024 }
});

const uploadIconLink = multer({
  storage: iconLinkStorage,
  fileFilter: iconLinkFilterType
});

module.exports = { uploadImgProfile, uploadIconLink };