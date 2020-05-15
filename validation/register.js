const Validator = require('validator');
const isEmpty = require('is-empty');

const validateRegisterInput = function (data) {
  let errors = {};

  // Converting empty fields into string as Validator only responds to strings
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  //Checking Names
  if (Validator.isEmpty(data.name)) {
    errors.name = 'The name field is required';
  }

  //Checking Emails
  if (Validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  } else if (!Validator.isEmpty(data.email)) {
    errors.email = 'Invalid Email';
  }

  //Checking Passwords
  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'This field is required';
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords not matching';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateRegisterInput;
