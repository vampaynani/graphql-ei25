import gql from 'graphql-tag';

export const PEOPLE = gql`query QueryPeople($id: ID!){
  people(id: $id){
    name
  }
}`;

export const MESSAGES = gql`{
  messages{
    text
  }
}`;