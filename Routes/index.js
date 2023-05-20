const express = require('express');
const router = express.Router();
const userRoute = require('./user');
const productRoute = require('./product');
const swagger = require('./swagger');

router.use('/', swagger);

router.use('/Users', userRoute);

router.use('/Products', productRoute);

router.use(
    '/',
    (docData = (req, res) => {
      let docData = {
        RenderURL: 'https://project-week-4-api-documentation.onrender.com/',
      };
      res.send(docData);
    })
  );

module.exports = router;