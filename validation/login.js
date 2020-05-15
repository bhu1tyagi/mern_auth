const validator = require('validator');
const isEmpty = require('is-empty');

const validateLoginInput = function (data) {
  let errors = {};

  //converting empty fields to strings
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  //Checking email
  if (validator.isEmpty(data.email)) {
    errors.email = 'This field is required.';
  } else if (!validator.isEmpty(data.email)) {
    errors.email = 'Invalid Email';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Password required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateLoginInput;
