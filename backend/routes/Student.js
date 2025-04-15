const express = require('express');
const Student = require('../models/Student');
const router = express.Router();
const { body, validationResult } = require('express-validator');

//Create a User using POST "/api/Student/createStudent" .No login required
router.post('/createStudent',[
  body('firstName','Enter a valid name').isLength({min: 3}),
  body('lastName','Enter a valid last name').isLength({min: 3}),
  body('email','Enter a valid email').isEmail(),
  body('password','Password must atleast 5 characheters').isLength({min: 5})
],async (req, res) => {
// if there are errors return bad request and the errors
  const errors= validationResult(req);
 if (!errors.isEmpty()) {
    res.status(400).json({ errors:errors.array() });
  }

  // check the whether student with this email exists already

  try{

  let student =await Student.findOne({email: req.body.email});
  if(student){
    return res.status(400).json({errors:"Sorry a admin with this email have already exist"})
  }
  student= await Student.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      status: req.body.status
  })

  res.json({"message":"save successfully"})
}catch(error){
  console.error(error.message)
  res.status(500).send("some error occur")
}
});
module.exports = router