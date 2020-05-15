const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys.js');

//Loading input validations
const validateRegisterInput = require('../../validation/register.js');
const validateLoginInput = require('../../validation/login.js');

//Loading User module
const User = require('../../models/User.js');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', (req, res) => {
  //Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  //Check Validation
  if (!isValid) {
    return res.status(400).jason(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: 'Email already exists' });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
    }
  });

  //hashing password before saving in database
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw error;
      newUser.password = hash;
      newUser
        .save()
        .then((user) => res.json(user))
        .catch((err) => console.log(err));
    });
  });
});

// @route POST api/users/login
// @desc Login user and return jwt
// @access Public

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ emailnotfound: 'Email not found' });
    }
  });

  //Check password
  bcrypt.compare(password, user.password).then((isMatch) => {
    if (isMatch) {
      const payload = {
        id: user.id,
        name: user.name,
      };

      //Sign token
      jwt.sign(
        payload,
        keys.secretOrKey,
        {
          expiresIn: 31536000,
        },
        (err, token) => {
          res.json({
            success: true,
            token: 'Bearer ' + token,
          });
        }
      );
    } else {
      return;
      res.status(400).json({ passwordincorrect: 'Password is incorrect' });
    }
  });
});

module.exports = router;
