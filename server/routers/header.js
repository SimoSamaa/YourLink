const express = require('express');

const router = express.Router();

const headerControllers = require('../controllers/header');

router.get('/headers', headerControllers.getHeaders);

router.post('/header', headerControllers.createHeader);

router.delete('/delete-header/:id', headerControllers.deleteHeader);

router.put('/update-header/:id', headerControllers.updateHeader);

module.exports = router;
