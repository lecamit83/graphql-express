const BookDAO = require('../models/book.model');
const AuthorDAO = require('../models/author.model');
const BookValidator = require('../validations/book.validation');
const APIerror = require('../errors/APIerror');

async function createBook(title, genre, authors) {
  try {
    const bookInfo = BookValidator.validateInputBook(title, genre, authors);
    const book = await BookDAO.createBook(bookInfo);
    const authorsList = await AuthorDAO.find({}).where('_id').in(authors).exec();
    const bookId = book._id;
    for (const author of authorsList) {
      await author.insertBookIntoMySelf(bookId);
    }
    return book;
  } catch (error) {
    throw error;
  }
}

function getBookById(id) {
  return BookDAO.findById(id).orFail(new APIerror('Book Not Found!', 404));
}
function getBooks() {
  return BookDAO.find({});
}
module.exports = {
  createBook,
  getBookById,
  getBooks,

}
