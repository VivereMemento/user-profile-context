import React from 'react';
import { Link } from 'react-router-dom';

import { usersListInHoc } from '../../utils';
import UserProvider from '../UserCardProvider';

const getProps = props => {
	return {
		data: props.userData,
		onChangeUser: props.changeUser,
	}
};

const FollowingList = ({following, onChangeUser}) => {
		return ( 
			<ul>
				{ following
						? following.map((follower, index) => (
								<li key={ index }>
									<Link to={ `/${ follower.login }`} onClick={ onChangeUser(follower.login) } style={{cursor: 'pointer'}}>{ follower.login }</Link>
									<br />
									<a href={ follower.html_url } target='_blank'>{ follower.html_url }</a>
								</li>
							))
						: null
				}
			</ul>
		);
}
export default UserProvider.connect(getProps)(usersListInHoc(FollowingList, 'following_url'));