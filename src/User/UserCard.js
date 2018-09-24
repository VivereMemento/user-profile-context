import './user.css';
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import UserCardContent from './UserView/UserCardContent';
import UserCardEdite from './UserView/UserCardEdite';

export default class UserCard extends Component {
  state = {
    userData: {},
    isEditing: false,
    userLogin: 'gaearon'
  }
  render () {
    
    const { userData } = this.state;
          
    return (
      <div className='user-card'>
        <Switch>
          <Route
            path='/editing'
            render={ props => (
              <UserCardEdite
                onCancel={ this.onCancel }
                onEdite={ this.onEdite }
                validateEditedData={ this.validateEditedData }
                { ...props }
              />
            )}
          >
          </Route>
          <Route
            path='/'
            render={ props => (
              <UserCardContent
                data={ userData }
                onChangeUser={ this.changeUser }
                { ...props }
              />
            )}
          >
          </Route>
        </Switch>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { userLogin } = this.state;
    
    if (prevState.userLogin !== userLogin ) {
      fetch(`https://api.github.com/users/${userLogin}`, {method: 'GET'})
      .then(res => res.json())
      .then(res => {
        this.setState({...this.state, userData: res})
      });
    }
  }

  componentDidMount() {
    const { userLogin } = this.state;
    fetch(`https://api.github.com/users/${userLogin}`, {method: 'GET'})
      .then(res => res.json())
      .then(res => {
        this.setState({...this.state, userData: res})
      });
  }

  changeUser = login => () => this.setState({...this.state, userLogin: login})

  validateEditedData = data => {
    Object.keys(data).forEach(key => {
      if(data[key] === '') delete data[key]
    });
  }

  onCancel = () => this.setState({isEditing: !this.state.isEditing})

  onEdite = data => {
    if(data) this.validateEditedData(data.userData);
    this.setState({userData: {...this.state.userData, ...data.userData}, isEditing: !this.state.isEditing});
  }
}
