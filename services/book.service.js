const BookDAO = require('../models/book.model');
const AuthorDAO = require('../models/author.model');
const BookValidator = require('../validations/book.validation');
const APIerror = require('../errors/APIerror');
const { pagination, flexibleSort, flexibleSearch } = require('../utils');

async function createBook(title, genre, authors) {
  try {
    const bookInfo = BookValidator.validateInputBook(title, genre, authors);
    const book = await BookDAO.createBook(bookInfo);
    // find authors has id in array authors[]
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
async function getBooks(first, offset, field, order_by, search) {
  const regex = new RegExp( search, 'gi' );
  const authors = await AuthorDAO.find({ '$text' : {'$search' : search }});
  const authorIDs = authors.map(author => author._id);

  const paginationOptions = pagination(first, offset);
  const sortOptions = flexibleSort(field, order_by, ['title', 'genre']);
  const queryOptions = flexibleSearch(search, [{}], [{'title' : regex}, {'authors' : { '$in' : authorIDs }}]);
  
  const books = await BookDAO.find({})
  .setOptions(paginationOptions)
  .sort(sortOptions)
  .where(queryOptions)   
  .exec();

  return books;
}

async function updateBook(id, title, genre) {
  try {
    const updateBook = BookValidator.validateUpdateBook(id, title, genre);
    const book = await BookDAO.findById(id).orFail(new APIerror('Book Not Found!', 404));
    // update book information
    book.title = updateBook.title;
    book.genre = updateBook.genre;

    await book.save();
    return book;

  } catch (error) {
    throw error;
  }
}
async function deleteBook(bookId) {
  try {
    BookValidator.validateID(bookId);
    const [book, authors] = await Promise.all([BookDAO.findByIdAndDelete(bookId), AuthorDAO.find({books : bookId}).exec()]);
    // delete ref BookID out authors
    const parrallelPromise = authors.map(function (author) {
      author.books = author.books.filter(function(id){
        if(id !== bookId) return id;
      });
      return author.save();
    });

    await Promise.all(parrallelPromise);

    return book;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  createBook,
  getBookById,
  getBooks,
  updateBook,
  deleteBook,
}