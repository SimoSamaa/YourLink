const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const linkControllers = require('../controllers/links');

router.get('/links', linkControllers.getLinks);

router.post('/link',
  [
    body('link')
      .trim()
      .notEmpty()
      .isURL({ require_protocol: true })
  ]
  , linkControllers.createLink);

router.put('/update-title-link/:id',
  [
    body('title')
      .trim()
      .isLength({
        min: 5,
        max: 15
      })
  ]
  , linkControllers.updateTitleLink);

router.put('/update-url-link/:id',
  [
    body('link')
      .trim()
      .notEmpty()
      .isURL({ require_protocol: true })
  ],
  linkControllers.updateUrlLink
);

router.delete('/delete-link/:id', linkControllers.deleteLink);

module.exports = router;