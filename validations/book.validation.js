const APIerror = require('../errors/APIerror');
const { isEmpty, formatString, isID } = require('../utils');

function isListID(authors) {
  for (const id of authors) {
    if(!isID(id)) return false;
  }
  return true;
}

function validateInputBook(title, genre, authors) {
  if(isEmpty(title) || isEmpty(genre) || !authors || authors.length === 0, !isListID(authors)) {
    throw new APIerror('Input Invalid', 400);
  }
  return {
    title : formatString(title),
    genre : formatString(genre),
    authors
  }
}

module.exports = {
  validateInputBook
}
