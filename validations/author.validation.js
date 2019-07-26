const APIerror = require('../errors/APIerror');
const { isEmpty, hasAge, formatString } = require('../utils');

function validateInput(name, age) {
  if(isEmpty(name) || !hasAge(age)) {
    throw new APIerror('Input Invalid', 400);
  }
  return {
    name : formatString(name),
    age : age
  }
}

module.exports = {
  validateInput
}
