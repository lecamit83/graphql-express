const validator = require('validator');

function isEmpty(field) {
  return validator.isEmpty(field) || field.trim().length === 0;
}

function hasAge(age) {
  return age  && age > 0;
}

function formatString(field) {
  return field.trim().split(/\s+/).join(' ');
}
module.exports = {
  isEmpty, 
  hasAge,
  formatString
}
