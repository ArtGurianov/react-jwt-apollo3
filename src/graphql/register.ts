import { gql } from "@apollo/client";

export const REFISTER_MUTATION = gql`
  mutation Register($email: String!, $password: String!) {
    register(registerInput: { email: $email, password: $password }) {
      ... on BooleanResponse {
        __typename
        booleanResponse
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
`;
