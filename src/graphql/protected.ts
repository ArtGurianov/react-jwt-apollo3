import { gql } from "@apollo/client";

export const PROTECTED_QUERY = gql`
  query Protected {
    __typename
    protectedGqlEndpoint
  }
`;
