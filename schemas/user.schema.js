const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInterfaceType } = require('graphql');

const IUser = new GraphQLInterfaceType({
  name : 'IUser',
  fields : ()=> ({
    _id : { type : GraphQLID },
    email : { type : GraphQLString } 
  })
});

const UserType = new GraphQLObjectType({
  name : 'User',
  interfaces : [IUser],
  fields : () => ({
    _id : { type : GraphQLID },
    email : { type : GraphQLString },
    password : { type : GraphQLString }
  })
});

const LogginedUserType = new GraphQLObjectType({
  name : 'LogginedUserType',
  interfaces : [IUser],
  fields : () => ({
    _id : { type : GraphQLID },
    email : { type : GraphQLString },
    token : { type :  GraphQLString }
  })
});

module.exports = {
  UserType,
  LogginedUserType,
};
