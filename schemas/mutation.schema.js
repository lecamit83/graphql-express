const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt } = require('graphql');

const AuthorServices = require('../services/author.service');

const AuthorType = require('./author.schema');
const MutationType = new GraphQLObjectType({
  name : 'Mutation',
  fields : {
    addAuthor : {
      type : AuthorType,
      args : {
        name : { type : new GraphQLNonNull(GraphQLString) },
        age : { type : new GraphQLNonNull(GraphQLInt) }
      },
      async resolve(source, args, context, info) {
        try {
          const name = args.name, age = args.age;
          const author = await AuthorServices.createAuthor(name, age);
          return author;
        } catch (error) {
          throw error;
        }
      }
    }
  }
});

module.exports = MutationType;
