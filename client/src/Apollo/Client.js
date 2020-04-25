import ApolloClient from "apollo-boost";
import Constants from "../Shared/Constants";
import { defaults, resolvers } from "./LocalState.js";

export default new ApolloClient({
  uri: Constants.URI.DEFAULT,
  clientState: {
    defaults,
    resolvers,
  },
  headers: {
    Authorization: `Bearer ${localStorage.getItem(Constants.TOKEN)}`,
  },
});
