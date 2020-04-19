import dotenv from "dotenv";
dotenv.config();

import logger from "morgan";
import graphqlYoga from "graphql-yoga";
const { GraphQLServer } = graphqlYoga;

const PORT = process.env.PORT || 4000;

const typeDefs = `
    type Query{
        greeting: String!
    }
`;

const resolvers = {
  Query: {
    greeting: () => "Hi",
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.express.use(logger("dev"));

server.start({ port: PORT }, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
