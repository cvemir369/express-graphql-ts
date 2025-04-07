# Basic Express Backend with GraphQL and TypeScript

Here's a minimal setup for an Express backend with GraphQL and TypeScript:

## Project Setup

1. First, create a new directory and initialize a Node.js project:

```bash
mkdir express-graphql-ts
cd express-graphql-ts
npm init -y
```

2. Install required dependencies:

```bash
npm install express express-graphql graphql
npm install --save-dev typescript @types/express @types/node ts-node nodemon
```

3. Initialize TypeScript configuration:

```bash
npx tsc --init
```

## File Structure

```
src/
├── index.ts          # Main server file
├── schema.ts         # GraphQL schema
└── types.ts          # TypeScript types
```

## Implementation

### 1. `src/types.ts`

```typescript
export interface Book {
  id: string;
  title: string;
  author: string;
}

export interface Query {
  books: Book[];
}
```

### 2. `src/schema.ts`

```typescript
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
```

### 3. `src/index.ts`

```typescript
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema";

const app = express();
const PORT = 4000;

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true, // Enable GraphiQL for testing
  })
);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/graphql`);
});
```

### 4. Update `package.json`

Add these scripts to your `package.json`:

```json
"scripts": {
  "start": "ts-node src/index.ts",
  "dev": "nodemon --exec ts-node src/index.ts",
  "build": "tsc"
}
```

## Running the Server

1. For development (with auto-restart on changes):

```bash
npm run dev
```

2. For production:

```bash
npm run build
node dist/index.js
```

## Testing the API

1. Open GraphiQL interface at: `http://localhost:4000/graphql`
2. Try this query:

```graphql
{
  books {
    id
    title
    author
  }
}
```

This gives you a minimal Express backend with:

- GraphQL API
- TypeScript support
- Sample data and schema
- Development server with hot reload

You can expand this by adding:

- Database integration
- Mutations
- Authentication
- More complex types and resolvers
