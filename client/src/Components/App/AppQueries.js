import { gql } from "apollo-boost";

export const QUERY = gql`
  {
    isLoggedIn @client
  }
`;
