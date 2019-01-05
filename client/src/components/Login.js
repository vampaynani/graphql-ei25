import React, { Component } from 'react';
import { LOGIN } from '../Mutations';
import { Mutation } from 'react-apollo';

export class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }
  updateState(e){
    this.setState({[e.currentTarget.name]:e.currentTarget.value});
  }
  render(){
    return (<Mutation 
      mutation={LOGIN}
      variables={{email: this.state.email, password: this.state.password}}
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
          createUserLink();
        }}>
          <label>
            <input type="text" name="email" value={this.state.email} onChange={e => this.updateState(e)}/>
          </label>
          <label>
            <input type="password" name="password" value={this.state.password} onChange={e => this.updateState(e)}/>
          </label>
          <button>Login User</button>
        </form>
      }
    </Mutation>)
  }
}