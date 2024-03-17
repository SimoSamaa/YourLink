const express = require('express');

const { body } = require('express-validator');
const validator = require('validator');

const router = express.Router();

const linkControllers = require('../controllers/links');
const isAuth = require('../middleware/is-auth');


router.get('/links', isAuth, linkControllers.getLinks);

router.post('/link',
  [
    body('link')
      .trim()
      .notEmpty()
      .isURL({ require_protocol: true })
  ],
  isAuth,
  linkControllers.createLink
);

router.put('/update-title-link/:id',
  [
    body('title')
      .trim()
      .isLength({ max: 15 })
  ]
  ,
  isAuth,
  linkControllers.updateTitleLink
);

router.put('/update-url-link/:id',
  [
    body('link')
      .optional({ nullable: true })
      .trim()
      .custom((value, { req }) => {
        if(!value) return true; // Allow empty URL
        // Validate the URL if it's not empty
        if(
          validator.isURL(value, { require_protocol: true })
          && value.includes('.com')
        ) return true;
      })
  ],
  isAuth,
  linkControllers.updateUrlLink
);

router.put('/update-hidden-link/:id',
  [
    body('isDisable')
      .isBoolean()
  ],
  isAuth,
  linkControllers.updateHiddenLink
);

router.put('/update-layout-link/:id',
  [
    body('layout')
      .notEmpty()
      .isString()
  ],
  isAuth,
  linkControllers.updateLayout
);

router.put('/update-icon-link/:id',
  [
    body('icon')
      .notEmpty()
      .isString()
  ],
  isAuth,
  linkControllers.updateIcon
);

router.put('/update-links-orders', isAuth, linkControllers.updateLinksOrders);

router.delete('/delete-link/:id', isAuth, linkControllers.deleteLink);

module.exports = router;