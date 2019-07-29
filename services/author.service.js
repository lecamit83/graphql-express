const AuthorDAO = require('../models/author.model');
const AuthorValidator = require('../validations/author.validation');
const APIerror = require('../errors/APIerror');

function createAuthor(name, age) {
  try {
    const author =  AuthorValidator.validateInputAuthor(name, age);
    return AuthorDAO.createAuthor(author);
  } catch (error) {
    throw error;
  }
}

function getAuthor(id) {
  return AuthorDAO.findById(id).orFail(new APIerror('Author Not Found!', 404))  
}

function getAuthors() {
  return AuthorDAO.find({});
}

module.exports = {
  createAuthor,
  getAuthor,
  getAuthors,

}
