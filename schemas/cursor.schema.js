const { GraphQLString, GraphQLBoolean, GraphQLList, GraphQLInt, GraphQLObjectType } = require('graphql');
const AuthorType = require('./author.schema');

const Edge = new GraphQLObjectType({
  name : 'Edge',
  fields : () => ({
    cursor : { type : GraphQLString },
    node : { type : AuthorType }
  })
});

const PageInfo = new GraphQLObjectType({
  name : 'PageInfo',
  fields : () => ({
    lastCursor : { type : GraphQLString },
    hasNextPage : { type : GraphQLBoolean }
  })
});

const Cursor = new GraphQLObjectType({
  name : 'Cursor',
  fields : () => ({
    edges : { type : new GraphQLList(Edge) },
    pageInfo : { type : PageInfo },
    totalCount : { type : GraphQLInt }
  })
});

module.exports = Cursor;
