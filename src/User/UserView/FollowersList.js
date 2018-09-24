import React from 'react';

import { usersListInHoc } from '../../utils';
import UserProvider from '../UserCardProvider';


const getProps = props => {
	return {
		data: props.userData,
		onChangeUser: props.changeUser,
	}
};

const FollowersList = ({followers, onChangeUser}) => {

		return ( 
			<ul>
				{ 
					followers
						? followers.map((follower, index) => (
							<li key={ index } >
								<span onClick={ onChangeUser(follower.login) }>{ follower.login }</span>
								<br />
								<a href={ follower.html_url }>{ follower.html_url }</a>
							</li>
						))
						: null
				}
			</ul>
		);
}
export default UserProvider.connect(getProps)(usersListInHoc(FollowersList, 'followers_url'));