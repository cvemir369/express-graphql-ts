import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from "graphql";
import { Book } from "./types";

// Sample data
const books: Book[] = [
  { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: "2", title: "To Kill a Mockingbird", author: "Harper Lee" },
];

// Book Type
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    author: { type: GraphQLString },
  },
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    books: {
      type: new GraphQLList(BookType),
      resolve: () => books,
    },
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
});
