const validator = require('../validator/validator');

const saveContact = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    userName: 'required|string',
    email: 'required|email',
    password: 'required|string'
  
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveProducts = (req, res, next) => {
  const validationRule = {
    userName: 'required|string',
    productName: 'required|string',
    brand: 'required|string',
    color: 'required|string',
    declutterPrice: 'required|string',
    description: 'required|string',
    location: 'required|string',
  
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveContact,
  saveProducts
};