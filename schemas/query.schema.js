const { GraphQLObjectType, GraphQLID, GraphQLList } = require('graphql');
const _ = require('lodash');
const db = require('../db.json');

const Book = require('./book.schema');
const Author = require('./author.schema');
const BookServices = require('../services/book.service');
const AuthorServices = require('../services/author.service');

const QueryType = new GraphQLObjectType({
  name : 'Query',
  fields: {
    book : {
      type : Book,
      args : {_id : {type : GraphQLID}},
      resolve(source, args, context, info) {
        const _id = args._id;
        return BookServices.getBookById(_id); 
      }
    },
    books : {
      type : new GraphQLList(Book),
      resolve(source, args, context, info) {
        return BookServices.getBooks();
      }
    },
    author : {
      type : Author,
      args : { _id : {type : GraphQLID}},
      resolve(source, args, context, info) {
        const { _id } = args;
        return AuthorServices.getAuthor(_id);
      }
    },
    authors : {
      type : new GraphQLList(Author),
      resolve(source, args, context, info) {
        return AuthorServices.getAuthors();
      }
    }
  }
});

module.exports = QueryType;
