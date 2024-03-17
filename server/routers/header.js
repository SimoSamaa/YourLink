const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const headerControllers = require('../controllers/header');
const isAuth = require('../middleware/is-auth');

router.get('/headers', isAuth, headerControllers.getHeaders);

router.post('/header', isAuth, headerControllers.createHeader);

router.delete('/delete-header/:id', isAuth, headerControllers.deleteHeader);

router.put('/update-header/:id',
  [ body('title')
    .trim()
    .isLength({ max: 20 })
  ],
  isAuth,
  headerControllers.updateHeader
);

router.put('/update-header-checkbox/:id',
  [
    body('isDisable')
      .isBoolean()
      .withMessage('isDisable must be a boolean value')
  ],
  isAuth,
  headerControllers.updateHeaderCheckbox
);

router.put('/update-headers-orders', isAuth, headerControllers.updateHeadersOrders);

module.exports = router;
