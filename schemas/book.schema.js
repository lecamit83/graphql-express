const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull } = require('graphql');

const _ = require('lodash');
const db = require('../db.json'); 
const BookType = new GraphQLObjectType({
  name : 'Book',
  fields : () => ({
    _id : { type : GraphQLID },
    title : { type : GraphQLString },
    genre : { type : GraphQLString },
    authors : {
      type : new GraphQLList(new GraphQLNonNull(Author)),
      resolve(source, args, context, info) {
        let result = [];
        for (const authorId of source.authors) {
          let author = _.find(db.authors, { _id : authorId});
          if(author) {
            result.push(author);
          }
        }
        return result;
      }
    }
  })
});

module.exports = BookType;
const Author = require('./author.schema');
