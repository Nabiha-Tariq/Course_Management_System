const express = require('express');
const Admin = require('../models/Admin');
const router = express.Router();
const { body, validationResult } = require('express-validator');


//Create a User using POST "/api/Authentication"
router.post('/',[
    body('firstName','Enter a valid name').isLength({min: 3}),
    body('lastName','Enter a valid last name').isLength({min: 3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must atleast 5 characheters').isLength({min: 5})
],async (req, res) => {
    const errors= validationResult(req);
   if (!errors.isEmpty()) {
      res.status(400).json({ errors:errors.array() });
    }
    await Admin.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        status: req.body.status
    })
  });

module.exports = router