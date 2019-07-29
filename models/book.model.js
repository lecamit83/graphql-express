const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { String, ObjectId } = Schema.Types;
const bookSchema = new Schema({
  title : String,
  genre : String,
  authors : [{ type : ObjectId, ref: 'Author'}]
});

bookSchema.statics.createBook = function({title, genre, authors}) {
  return Book.create({title, genre, authors});
}

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
