import React from "react";

import { createConnect } from '../utils';

const initialState = {
  url: null,
	userData: null,
	_prev: {},
}

const { Provider, Consumer } = React.createContext(initialState);

class UserProvider extends React.Component {
	static connect = createConnect(Consumer);
	
	static getDerivedStateFromProps({ children, ...props }, state) {
		console.log("getDerivedStateFromProps", props);
		return props.data !== state._prev.data
      ? { ...state, url: props.url, userData: props.data, _prev: props }
      : null;
  }

  state = {
    ...initialState,
    _prev: {}
  };

  render() {
    console.log("render", this.props);
    return <Provider value={this.getContext()}>{this.props.children}</Provider>;
  }

  getContext() {
    return {
      ...this.state,
      onEdit: this.props.onEdit,
      validateEditedData: this.props.validateEditedData,
      changeUser: this.props.changeUser,
    };
  }

  
}

export default UserProvider;