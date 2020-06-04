import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(loginInput: { email: $email, password: $password }) {
      ... on LoginResponse {
        __typename
        accessToken
        user {
          __typename
          id
          email
        }
      }
      ... on CustomErrorsResult {
        __typename
        id
        errors {
          __typename
          id
          property
          errorMessages
        }
      }
    }
  }
`;
