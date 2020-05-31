import * as ApolloReactCommon from "@apollo/client";
import * as ApolloReactHooks from "@apollo/client";
import { gql } from "@apollo/client";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  email: Scalars["String"];
  tokenVersion: Scalars["Float"];
};

export type Query = {
  __typename?: "Query";
  protectedGqlEndpoint: Scalars["String"];
  users: Array<User>;
  me?: Maybe<User>;
};

export type Mutation = {
  __typename?: "Mutation";
  register: RegistrationResult;
  login: LoginResult;
  logout: Scalars["Boolean"];
  revokeRefreshToken: Scalars["Boolean"];
};

export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};

export type MutationLoginArgs = {
  loginInput: LoginInput;
};

export type MutationRevokeRefreshTokenArgs = {
  userId: Scalars["String"];
};

export type RegistrationResult = BooleanResponse | RegistrationError;

export type BooleanResponse = {
  __typename?: "BooleanResponse";
  booleanResponse: Scalars["Boolean"];
};

export type RegistrationError = {
  __typename?: "RegistrationError";
  errorMessage: Scalars["String"];
  emailErrorMessage?: Maybe<Scalars["String"]>;
  passwordErrorMessage?: Maybe<Scalars["String"]>;
};

/** New user data */
export type RegisterInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type LoginResult = LoginResponse | LoginError;

export type LoginResponse = {
  __typename?: "LoginResponse";
  accessToken: Scalars["String"];
  user: User;
};

export type LoginError = {
  __typename?: "LoginError";
  errorMessage: Scalars["String"];
  emailErrorMessage?: Maybe<Scalars["String"]>;
  passwordErrorMessage?: Maybe<Scalars["String"]>;
};

/** Login input data */
export type LoginInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type LoginMutationVariables = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type LoginMutation = { __typename?: "Mutation" } & {
  login:
    | ({ __typename: "LoginResponse" } & Pick<LoginResponse, "accessToken"> & {
          user: { __typename?: "User" } & Pick<User, "id" | "email">;
        })
    | ({ __typename: "LoginError" } & Pick<
        LoginError,
        "errorMessage" | "emailErrorMessage" | "passwordErrorMessage"
      >);
};

export type LogoutMutationVariables = {};

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logout"
>;

export type MeQueryVariables = {};

export type MeQuery = { __typename?: "Query" } & {
  me?: Maybe<{ __typename?: "User" } & Pick<User, "id" | "email">>;
};

export type ProtectedQueryVariables = {};

export type ProtectedQuery = { __typename?: "Query" } & Pick<
  Query,
  "protectedGqlEndpoint"
>;

export type RegisterMutationVariables = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type RegisterMutation = { __typename?: "Mutation" } & {
  register:
    | ({ __typename: "BooleanResponse" } & Pick<
        BooleanResponse,
        "booleanResponse"
      >)
    | ({ __typename: "RegistrationError" } & Pick<
        RegistrationError,
        "errorMessage" | "emailErrorMessage" | "passwordErrorMessage"
      >);
};

export type UsersQueryVariables = {};

export type UsersQuery = { __typename?: "Query" } & {
  users: Array<{ __typename?: "User" } & Pick<User, "id" | "email">>;
};

export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(loginInput: { email: $email, password: $password }) {
      ... on LoginResponse {
        __typename
        accessToken
        user {
          id
          email
        }
      }
      ... on LoginError {
        __typename
        errorMessage
        emailErrorMessage
        passwordErrorMessage
      }
    }
  }
`;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<
  LoginMutation
>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    baseOptions
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<
  LogoutMutation
>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      id
      email
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions
  );
}
export function useMeLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions
  );
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<
  MeQuery,
  MeQueryVariables
>;
export const ProtectedDocument = gql`
  query Protected {
    protectedGqlEndpoint
  }
`;

/**
 * __useProtectedQuery__
 *
 * To run a query within a React component, call `useProtectedQuery` and pass it any options that fit your needs.
 * When your component renders, `useProtectedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProtectedQuery({
 *   variables: {
 *   },
 * });
 */
export function useProtectedQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ProtectedQuery,
    ProtectedQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<ProtectedQuery, ProtectedQueryVariables>(
    ProtectedDocument,
    baseOptions
  );
}
export function useProtectedLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ProtectedQuery,
    ProtectedQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<ProtectedQuery, ProtectedQueryVariables>(
    ProtectedDocument,
    baseOptions
  );
}
export type ProtectedQueryHookResult = ReturnType<typeof useProtectedQuery>;
export type ProtectedLazyQueryHookResult = ReturnType<
  typeof useProtectedLazyQuery
>;
export type ProtectedQueryResult = ApolloReactCommon.QueryResult<
  ProtectedQuery,
  ProtectedQueryVariables
>;
export const RegisterDocument = gql`
  mutation Register($email: String!, $password: String!) {
    register(registerInput: { email: $email, password: $password }) {
      ... on BooleanResponse {
        __typename
        booleanResponse
      }
      ... on RegistrationError {
        __typename
        errorMessage
        emailErrorMessage
        passwordErrorMessage
      }
    }
  }
`;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(RegisterDocument, baseOptions);
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<
  RegisterMutation
>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const UsersDocument = gql`
  query Users {
    users {
      id
      email
    }
  }
`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    UsersQuery,
    UsersQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    baseOptions
  );
}
export function useUsersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    UsersQuery,
    UsersQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    baseOptions
  );
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<
  UsersQuery,
  UsersQueryVariables
>;
