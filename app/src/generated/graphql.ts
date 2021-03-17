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
  events: Array<Event>;
  event: Event;
};


export type QueryEventsArgs = {
  name: Scalars['String'];
};


export type QueryEventArgs = {
  id: Scalars['String'];
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
  options: UserInputPassword;
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

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserInputRegister = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};

export type UserInputPassword = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type EventFields = {
  name: Scalars['String'];
  eventDate: Scalars['String'];
};

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