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

async function getAuthors(first = 10, after = '') {
  const authors = await AuthorDAO.find({});
  const index = authors.map(author => author._id).findIndex(e => e.toString() === after.toString()) + 1;
 
  const totalCount = authors.length;
  const end = (index + first) >= totalCount ? totalCount : (index + first);
  const edges = authors.slice(index , end).map(author => {    
    return {
      cursor : author._id,
      node : author
    }
  });
  // create the pageInfo object
  const lastCursor = edges[edges.length - 1].cursor;
  const pageInfo = {
		lastCursor,
		hasNextPage: totalCount > end
  }
  return {
	  edges,
		pageInfo,
    totalCount
  }	
}

module.exports = {
  createAuthor,
  getAuthor,
  getAuthors,
}
