import { gql } from "@apollo/client";

export const USERS_QUERY = gql`
  query Users {
    users {
      __typename
      id
      email
    }
  }
`;
