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
