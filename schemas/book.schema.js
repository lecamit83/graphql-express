const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull } = require('graphql');

const _ = require('lodash');
const db = require('../db.json');

const AuthorDAO = require('../models/author.model');
const BookDAO = require('../models/book.model');

const BookType = new GraphQLObjectType({
  name : 'Book',
  fields : () => ({
    _id : { type : GraphQLID },
    title : { type : GraphQLString },
    genre : { type : GraphQLString },
    authors : {
      type : new GraphQLList(new GraphQLNonNull(Author)),
      resolve(source, args, context, info) {  
        return AuthorDAO.find({}).where('_id').in(source.authors).exec();
      }
    }
  })
});

module.exports = BookType;
const Author = require('./author.schema');
