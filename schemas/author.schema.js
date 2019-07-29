const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } = require('graphql');
const _ = require('lodash');
const db = require('../db.json');

const BookDAO = require('../models/book.model');
const AuthorDAO = require('../models/author.model');

const AuthorType = new GraphQLObjectType({
  name : 'Author',
  fields : () => ({
    _id : { type : GraphQLID },
    name : { type : GraphQLString },
    age : { type : GraphQLInt },
    books : {
      type : new GraphQLList(Book),
      resolve(source, args, context, info) {
        return BookDAO.find({}).where('_id').in(source.books).exec();
      }
    }
  })
});


module.exports = AuthorType;
const Book = require('./book.schema');
