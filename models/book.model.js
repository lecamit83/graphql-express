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

bookSchema.index({ genre : 'text'});
bookSchema.index({ title : 1 });
bookSchema.index({ authors : 1 });

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
