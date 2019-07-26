const { GraphQLObjectType, GraphQLID, GraphQLList } = require('graphql');
const _ = require('lodash');
const db = require('../db.json');

const Book = require('./book.schema');
const Author = require('./author.schema');


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
        return _.find(db.authors, { _id : args._id });
      }
    },
    authors : {
      type : new GraphQLList(Author),
      resolve(source, args, context, info) {
        return db.authors;
      }
    }
  }
});

module.exports = QueryType;
