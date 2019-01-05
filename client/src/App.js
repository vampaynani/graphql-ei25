import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Register from './components/Register';
import People from './components/People';
import Messages from './components/Messages';
import { Login } from './components/Login';

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
        <Router>
          <main>
            <nav>
              <ul>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/people">People</Link></li>
                <li><Link to="/messages">Messages</Link></li>
              </ul>
            </nav>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/people" component={People} />
            <Route exact path="/messages" component={Messages} />
          </main>
        </Router>
      </div>
    );
  }
}

export default App;
