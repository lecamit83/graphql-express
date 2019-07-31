const validator = require('validator');
const { ObjectId } = require('mongoose').Types;
const { MAX_PAGE_SIZE, ASCENDING, DESCENDING } = require('./constants');
const APIError = require('../errors/APIerror');
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

function flexibleSort(field, order, sortableFields = []){
  let options = {};
  if(field) {
    if(!sortableFields.includes(field)) {
      throw new APIError('Field Invalid!' , 422);
    }
    
    if(!order) {
      order = ASCENDING;
    }
    if(order !== ASCENDING && order !== DESCENDING) {
      throw new APIError('OrderBy Invalid!' , 422);
    }
    options[field] = order;
  }
  return options;
}

function flexibleSearch(search, mainConditions = [], fields = []) {
  let condition = { '$and' : mainConditions};
  if(search) {
    let _orCondition = { '$or' : []}
    _orCondition['$or'].push({ '$text' : {'$search' : search }});
    fields.forEach(field => {
      console.log(field);
      
      _orCondition['$or'].push(field);
    });
    condition['$and'].push(_orCondition);
  }
  return condition;
}

module.exports = {
  isEmpty, 
  hasAge,
  formatString,
  isID,
  pagination,
  flexibleSort,
  flexibleSearch,

}
