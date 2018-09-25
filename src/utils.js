import React, { Component } from 'react';

const encode = str => new Buffer(str).toString('base64'); 
const decode = base64 => new Buffer(base64, 'base64').toString('ascii');
const idX = x => x;
const createConnect = (Consumer, defSelector = idX) => {
  return (selector = defSelector) => Component => {
    const Connected = props => (
      <Consumer>
        { context => <Component {...props} {...selector(context)} /> }
      </Consumer>
    );
    Connected.displayName = (
      `connected(
        ${Consumer.displayName || Consumer.name}
      )(
        ${Component.displayName || Component.name}
      )`
    );
    return Connected;
  }
};
const getData = ({userData}) => ({data: userData});

function usersListInHoc(WrappedComponent, usersUrl) {

  return class UsersList extends Component {

    state = {};

    render() {

      return (
        <WrappedComponent
          {...this.state}
          {...this.props}
        />
      );
		}
		
		componentDidUpdate(prevProps) {
      if(prevProps.data.login !== this.props.data.login) this.getData();
    }

    componentDidMount() {
      this.getData();
    }

    getData = () => {
      const { data } = this.props;
			const url = data[usersUrl];
      const key = url.split('{')[0].split('/').reverse()[0];
      fetch(url.split('{')[0])
				.then(res => res.json())
				.then(res => this.setState({...this.state, [key]: res}))
    }
  };
}

export { encode, decode, createConnect, getData, usersListInHoc };