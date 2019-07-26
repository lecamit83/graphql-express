const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } = require('graphql');
const _ = require('lodash');
const db = require('../db.json');
const AuthorType = new GraphQLObjectType({
  name : 'Author',
  fields : () => ({
    _id : { type : GraphQLID },
    name : { type : GraphQLString },
    age : { type : GraphQLInt },
    books : {
      type : new GraphQLList(Book),
      resolve(source, args, context, info) {
        let result = [];
        for (const bookId of source.books) {
          let book = _.find(db.books, { _id : bookId});
          if(book) {
            result.push(book);
          }
        }
        return result;
      }
    }
  })
});


module.exports = AuthorType;
const Book = require('./book.schema');
