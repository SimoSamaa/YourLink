const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const headerControllers = require('../controllers/header');

router.get('/headers', headerControllers.getHeaders);

router.post('/header', headerControllers.createHeader);

router.delete('/delete-header/:id', headerControllers.deleteHeader);

router.put('/update-header/:id',
  [ body('title')
    .trim()
    .isLength({ max: 20 })
  ],
  headerControllers.updateHeader);

router.put('/update-header-checkbox/:id', headerControllers.updateHeaderCheckbox);

router.put('/update-headers-orders', headerControllers.updateHeadersOrders);

module.exports = router;
