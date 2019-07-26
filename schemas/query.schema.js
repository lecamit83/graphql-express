const { GraphQLObjectType, GraphQLID, GraphQLList } = require('graphql');
const _ = require('lodash');
const db = require('../db.json');

const Book = require('./book.schema');
const Author = require('./author.schema');
const AuthorServices = require('../services/author.service');

const QueryType = new GraphQLObjectType({
  name : 'Query',
  fields: {
    book : {
      type : Book,
      args : {_id : {type : GraphQLID}},
      resolve(source, args, context, info) {
        return _.find(db.books, {_id : args._id}); 
      }
    },
    books : {
      type : new GraphQLList(Book),
      resolve(source, args, context, info) {
        return db.books;
      }
    },
    author : {
      type : Author,
      args : { _id : {type : GraphQLID}},
      resolve(source, args, context, info) {
        try {
          const _id = args._id;
          return AuthorServices.getAuthorById(_id);
        } catch (error) {
          throw error; 
        }
      }
    },
    authors : {
      type : new GraphQLList(Author),
      resolve(source, args, context, info) {
        try {
          return AuthorServices.getAuthors();
        } catch (error) {
          throw error;
        }
      }
    }
  }
});

module.exports = QueryType;
