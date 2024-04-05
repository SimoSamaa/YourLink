const express = require('express');

const { body } = require('express-validator');
const { uploadImgProfile } = require('../upload/multer-config');

const router = express.Router();

const userControllers = require('../controllers/user');
const isAuth = require('../middleware/is-auth');

router.get('/user/:id', isAuth, userControllers.getUser);
router.get('/:username', userControllers.profilePage);

router.put('/update-profile/:id',
  uploadImgProfile.single('userImg'),
  [
    body('username')
      .trim()
      .isString()
      .isLength({ min: 5, max: 10 }),
    body('bio')
      .trim()
      .isString()
      .isLength({ min: 0, max: 80 }),
  ], isAuth, userControllers.updateProfile);

router.delete('/remove-image/:id', isAuth, userControllers.removeUserImg);
router.delete('/delete-account/:id', isAuth, userControllers.deleteAccount);
module.exports = router;