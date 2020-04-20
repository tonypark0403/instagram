import logger from "morgan";
import { GraphQLServer } from "graphql-yoga";

import schema from "./schema";

import "./env";
import "./passport";
import { authenticateJwt } from "./passport";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => {
    // console.log("server", request.user);
    return { request };
  },
});
server.express.use(logger("dev"));
server.express.use(authenticateJwt);

server.start({ port: PORT }, () =>
  console.log(`✅Server running on http://localhost:${PORT}`)
);
