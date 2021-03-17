import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  events: Array<Event>;
  event: Event;
};


export type QueryEventsArgs = {
  name: Scalars['String'];
};


export type QueryEventArgs = {
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Event = {
  __typename?: 'Event';
  id: Scalars['String'];
  name: Scalars['String'];
  eventDate: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  createEvent: Event;
  deleteEvent: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  options: UserInputRegister;
};


export type MutationLoginArgs = {
  options: UserInputLogin;
};


export type MutationCreateEventArgs = {
  options: EventFields;
};


export type MutationDeleteEventArgs = {
  id: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UserInputRegister = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};

export type UserInputLogin = {
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
};

export type EventFields = {
  name: Scalars['String'];
  eventDate: Scalars['String'];
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username' | 'id'>
  )> }
);

export type LoginMutationVariables = Exact<{
  options: UserInputLogin;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email'>
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: UserInputRegister;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'email' | 'id'>
    )> }
  ) }
);


export const MeDocument = gql`
    query Me {
  me {
    username
    id
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const LoginDocument = gql`
    mutation Login($options: UserInputLogin!) {
  login(options: $options) {
    errors {
      field
      message
    }
    user {
      id
      username
      email
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UserInputRegister!) {
  register(options: $options) {
    errors {
      field
      message
    }
    user {
      username
      email
      id
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};