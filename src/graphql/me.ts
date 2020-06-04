import { gql } from "@apollo/client";

export const ME_QUERY = gql`
query Me {
  me {
    ... on User {
      __typename
      id
      email
    }
    ... on CustomErrorsResult {
      __typename
      id
      errors {
        __typename
        property
        errorMessages
      }
    }
  }
}
`