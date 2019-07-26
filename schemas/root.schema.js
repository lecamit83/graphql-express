const { GraphQLSchema } = require('graphql');
const RootQuery = require('./query.schema');
const RootMutation = require('./mutation.schema');

const Schema = new GraphQLSchema({
  query : RootQuery,
  mutation : RootMutation  
});

module.exports = Schema;
