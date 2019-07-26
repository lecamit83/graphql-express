const AuthorDAO = require('../models/author.model');
const AuthorValidator = require('../validations/author.validation');

function createAuthor(name, age) {
  try {
    const author = AuthorValidator.validateInput(name, age);
    return AuthorDAO.createAuthor(author);
  } catch (error) { 
    throw error;
  }
}

function getAuthors() {
  try {
    return AuthorDAO.getAuthors();
  } catch (error) {
    throw error;
  }
}
function getAuthorById(_id) {
  try {
    return AuthorDAO.getAuthorById(_id);
  } catch (error) {
    throw error;
  }
}



module.exports = {
  createAuthor,
  getAuthors,
  getAuthorById
}
