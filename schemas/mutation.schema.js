const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLID } = require('graphql');

const AuthorServices = require('../services/author.service');
const BookServices = require('../services/book.service');
const UserServices = require('../services/user.service');

const AuthorType = require('./author.schema');
const BookType = require('./book.schema');
const { UserType, LogginedUserType } = require('./user.schema');

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
          if(!context.isAuth) { throw new APIerror('Unauthorized!', 401); }
          const name = args.name, age = args.age;
          const author = await AuthorServices.createAuthor(name, age);
          return author;
        } catch (error) {
          throw error;
        }
      }
    },
    addBook : {
      type : BookType,
      args : {
        title : { type :  new GraphQLNonNull(GraphQLString) },
        genre : { type :  new GraphQLNonNull(GraphQLString) },
        authors : { type :  new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLID))) },
      },
      async resolve(source, args, context, info) {
        try {
          if(!context.isAuth) { throw new APIerror('Unauthorized!', 401); }
          const { title, genre, authors } = args;
          const book = await BookServices.createBook(title, genre, authors);
          return book;
        } catch (error) {
          throw error;
        }
      }
    },
    updateBook : {
      type : BookType,
      args : {
        _id : { type : new GraphQLNonNull(GraphQLID) },
        title : { type : new GraphQLNonNull(GraphQLString) },
        genre : { type : GraphQLString }
      },
      async resolve(source, args, context, info) {
        try {
          if(!context.isAuth) { throw new APIerror('Unauthorized!', 401); }
          const { _id, title, genre } = args;
          const book = await BookServices.updateBook(_id, title, genre);
          return book;
        } catch (error) {
          throw error;
        }
      }
    },
    deleteBook : {
      type : BookType,
      args : {
        _id : { type : new GraphQLNonNull(GraphQLID) }
      },
      async resolve(source, args, context, info) {
        try {
          if(!context.isAuth) { throw new APIerror('Unauthorized!', 401); }
          const { _id } = args;
          const book = await BookServices.deleteBook(_id);
          return book;
        } catch (error) {
          throw error;
        }
      }
    },
    register : {
      type : UserType,
      args : {
        email : { type : new GraphQLNonNull(GraphQLString) },
        password : { type : new GraphQLNonNull(GraphQLString) },
      },
      resolve(source, args, context, info) {
        try {
          const { email, password } = args;
          return UserServices.createUser(email, password);
        } catch (error) {
          throw error;
        }
      }
    },
    loggined : {
      type : LogginedUserType,
      args : {
        email : { type : new GraphQLNonNull(GraphQLString) },
        password : { type : new GraphQLNonNull(GraphQLString) },
      },
      resolve(source, args, context, info) {
        try {
          const { email, password } = args;
          return UserServices.loginUser(email, password);
        } catch (error) {
          throw error;
        }
      }
    }
  }
});

module.exports = MutationType;
