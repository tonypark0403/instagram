import ApolloClient from "apollo-boost";
import Constants from "../Common/Constants";
import { defaults, resolvers } from "./LocalState.js";

export default new ApolloClient({
  uri: Constants.URI.DEFAULT,
  clientState: {
    defaults,
    resolvers,
  },
});
