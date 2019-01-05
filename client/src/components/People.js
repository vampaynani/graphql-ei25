import React from 'react';
import { PEOPLE } from '../Queries';
import { Query } from 'react-apollo';

export default props => (
  <Query query={PEOPLE} variables={{id: 3}}>
    {({loading, error, data}) => {
      if(loading) return <div>Loading...</div>
      if(error) return <div>Error {error.message}</div>
      return <div>
        <p>{data.people.name}</p>
      </div>
    }}
  </Query>
)