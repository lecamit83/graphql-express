const AuthorDAO = require('../models/author.model');
const AuthorValidator = require('../validations/author.validation');

function createAuthor(name, age) {
  try {
    const author =  AuthorValidator.validateInput(name, age);
    return AuthorDAO.createAuthor(author);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createAuthor
}
