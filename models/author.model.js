const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {String, Number, ObjectId} = Schema.Types;

const authorSchema = new Schema({
  name : String,
  age : Number,
  books : [{type : ObjectId, ref : 'Book'}],
});

authorSchema.statics.createAuthor = function ({name, age}) {
  return Author.create({name, age});
}
authorSchema.methods.insertBookIntoMySelf = function(bookId) {
  const author = this;
  author.books.push(bookId);
  return author.save();
}

authorSchema.index({ name : 'text' });

const Author = mongoose.model('Author', authorSchema);
module.exports = Author;
