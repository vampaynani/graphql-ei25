import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Query, Mutation } from 'react-apollo';
import { PEOPLE } from './Queries';
import { CREATE_USER } from './Mutations';

class App extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    const person = 3;
    const query = `{
      people(id: ${person}){
        name
      }
    }`;

    fetch('http://localhost:4000',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    })
    .then(res => res.json())
    .then(res => console.log(res));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Mutation mutation={CREATE_USER} update={(cache, {data}) =>{
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
        <Query query={PEOPLE} variables={{id: 3}}>
        {({loading, error, data}) => {
          if(loading) return <div>Loading...</div>
          if(error) return <div>Error {error}</div>
          return <div>
            <p>{data.people.name}</p>
          </div>
        }}
        </Query>
      </div>
    );
  }
}

export default App;
