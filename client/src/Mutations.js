import gql from 'graphql-tag';

export const CREATE_USER = gql`mutation CreateUserMutation($email: String!, $password: String!){
  signup(email: $email, password: $password)
}`;