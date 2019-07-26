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

authorSchema.statics.getAuthors = function() {
  return Author.find({});
}

authorSchema.statics.getAuthorById = function(_id) {
  return Author.findById(_id);
}

const Author = mongoose.model('Author', authorSchema);
module.exports = Author;
