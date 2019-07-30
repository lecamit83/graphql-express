const validator = require('validator');
const { ObjectId } = require('mongoose').Types;
const { MAX_PAGE_SIZE } = require('./constants');

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

function pagination(page, page_size) {
  let options = {};
  if(page > 0 && !isNaN(page)) {
    options.limit = parseInt(page_size) || MAX_PAGE_SIZE;  
    options.skip = (parseInt(page) - 1) * options.limit;
  } else if (page_size) {
    options.limit = parseInt(page_size) || MAX_PAGE_SIZE; 
  }
  return options;
}

module.exports = {
  isEmpty, 
  hasAge,
  formatString,
  isID,
  pagination,

}
