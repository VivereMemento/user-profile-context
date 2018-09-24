import React from 'react';
import { NavLink } from 'react-router-dom';

import { getData } from '../../utils';
import UserProvider from '../UserCardProvider';

const UserCardNavigation = ({ data }) => {
	return (
		<nav className='navbar navbar-expand-lg'>
			<ul className='navbar-nav'>
				<li className='nav-item'>
					<NavLink className='nav-link' to='/followers' activeStyle={{ color: 'red' }}>
						followers: <span>({ data.followers })</span>
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink className='nav-link' to='/following' activeStyle={{ color: 'red' }}>	
						following: <span>({ data.following })</span>
					</NavLink>
				</li>
				<li className='nav-item'><span className='nav-link'>repositories: <span>({ data.public_repos })</span></span></li>
			</ul>
		</nav>
	);
}
 
export default UserProvider.connect(getData)(UserCardNavigation);