const validator = require('validator');
const { ObjectId } = require('mongoose').Types;
function isID(id) {
  return ObjectId(id);
}
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
  formatString,
  isID,
  
}
