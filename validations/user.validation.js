const APIerror = require('../errors/APIerror');
const { isEmpty, isEmail, isPassword } = require('../utils');

function validateInputUser( email, password ) {
  if(isEmpty(email) || isEmpty(password) || !isEmail(email) || !isPassword(password)) {
    throw new APIerror('Input Invalid', 400);
  }
}
module.exports = {
  validateInputUser
}
