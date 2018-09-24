import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import UserCard from './User/UserCard';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <div className="row">
            <div className="col">
              <UserCard />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
