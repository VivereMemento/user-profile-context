import './user.css';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import UserCardContent from './UserView/UserCardContent';

export default class UserCard extends Component {
  state = {
    userData: {},
    userLogin: '',
  }
  render () {
    
    const { userData } = this.state;
          
    return (
      <div className='user-card'>
        <Route
            path={ `/:login`}
            render={ props => {
              const { userLogin } = this.state;
              if (userLogin !== props.match.params.login) {
                this.getData(props.match.params.login)
              }
              return (
                <UserCardContent
                  data={ userData }
                  onEdit={ this.onEdit}
                  validateEditedData={ this.validateEditedData }
                  onChangeUser={ this.changeUser }
                  { ...props }
                />
              )
            }}
          >
          </Route>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { userLogin } = this.state;
    
    if (prevState.userLogin !== userLogin ) this.getData(userLogin);
  }

  getData = (login) => {
  
    fetch(`https://api.github.com/users/${login}`, {method: 'GET'})
      .then(res => res.json())
      .then(res => {
        this.setState({...this.state, userData: res, userLogin: res.login})
      });
  }

  changeUser = login => () => this.setState({...this.state, userLogin: login})

  validateEditedData = data => {
    Object.keys(data).forEach(key => {
      if(data[key] === '') delete data[key]
    });
  }

  onCancel = () => this.setState({isEditing: !this.state.isEditing})

  onEdit = data => {
    if(data) this.validateEditedData(data.userData);
    this.setState({userData: {...this.state.userData, ...data.userData}});
  }
}
