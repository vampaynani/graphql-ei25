import React from 'react';
import { CREATE_USER } from '../Mutations';
import { Mutation } from 'react-apollo';

export default props => (
  <Mutation 
    mutation={CREATE_USER}
    update={(cache, {data}) =>{
      console.log(data);
    }} 
    onCompleted={data => {
      console.log(data)
      localStorage.setItem('AUTH_TOKEN', data.signup);
    }}>
    {createUserLink => 
      <form onSubmit={e => {
        e.preventDefault();
        createUserLink({variables: {email: e.currentTarget.email.value, password: e.currentTarget.password.value}});
      }}>
        <label>
          <input type="text" name="email" />
        </label>
        <label>
          <input type="password" name="password" />
        </label>
        <button>Create User</button>
      </form>
    }
  </Mutation>
);