const { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLInt, GraphQLString } = require('graphql');
const _ = require('lodash');
const db = require('../db.json');

const Book = require('./book.schema');
const Author = require('./author.schema');
const CursorType = require('./cursor.schema');
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
      args  : {
        first : {type : GraphQLInt },
        offset : { type : GraphQLInt }
      },
      resolve(source, args, context, info) {
        const { first , offset } = args;
        return BookServices.getBooks(first, offset);
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
      type : CursorType,
      args : {
        first : { type : GraphQLInt },
        after : { type : GraphQLString }
      },
      resolve(source, args, context, info) {
        const { first, after } = args;
        return AuthorServices.getAuthors(first, after);   
      }
    }
  }
});

module.exports = QueryType;
