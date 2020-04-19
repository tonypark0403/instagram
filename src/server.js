import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import logger from "morgan";
import schema from "./schema";

import { GraphQLServer } from "graphql-yoga";
import { sendSecretMail } from "./utils/utils";

sendSecretMail("c3dream@naver.com", "123").then((response) =>
  console.log(response)
);

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema });
server.express.use(logger("dev"));

server.start({ port: PORT }, () =>
  console.log(`✅Server running on http://localhost:${PORT}`)
);
