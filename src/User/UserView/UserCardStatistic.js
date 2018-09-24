import React from 'react';
import { Route } from 'react-router-dom';

import UserCardNavigation from './UserCardNavigation';
import FollowersList from './FollowersList';
import FollowingList from './FollowingList';

const UserCardStatistic = () => {

	return (
		<div className='card-statistic' style={{width: '50%'}}>
			<UserCardNavigation />
			<Route path='/followers' render={ props => <FollowersList { ...props } /> }/>
			<Route path='/following' render={ props => <FollowingList { ...props } /> }/>
		</div>
	);

}
 
export default UserCardStatistic;