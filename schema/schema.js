const {
  graphql,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = require("graphql");
const _ = require("lodash");

const Book = require("../models/book");
const Author = require("../models/author");

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      async resolve(parent, args) {
        const author = await Author.findOne({_id:parent.authorId})
        return author
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    authorId: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(AuthorType),
      async resolve(parent, args) {
        const books = await Book.find({authorId:parent.id})
        return books
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(parent, args) {
        const book = await Book.findOne({_id:args.id})
        return book;
      },
    },
    books: {
      type: new GraphQLList(BookType),
      async resolve() {
        const books = await Book.find({});
        return books;
      },
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID },
      },
      async resolve(parent, args) {
        const author = await Author.findOne({_id:args.id})
        return author;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      async resolve() {
        const authors = await Author.find({});
        return authors;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {
          type: GraphQLString,
        },
        age: {
          type: GraphQLInt,
        },
      },
      async resolve(parent, args) {
        const author = await Author.create(args);
        return author;
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: {
          type: GraphQLString,
        },
        authorId: {
          type: GraphQLID,
        },
        genre: {
          type: GraphQLString,
        },
      },
      async resolve(parent, args) {
        const book = await Book.create(args);
        return book;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
