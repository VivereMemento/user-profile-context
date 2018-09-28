import React from 'react';
import { Switch, Route } from 'react-router-dom';

import UserProvider from '../UserCardProvider';
import UserCardEdit from './UserCardEdit';
import UserCardNavigation from './UserCardNavigation';
import FollowersList from './FollowersList';
import FollowingList from './FollowingList';

const getProps = props => {
	return {
		url: props.url,
		data: props.userData,
		onEdit: props.onEdit,
		validateEditedData: props.validateEditedData,
	}
};

const UserCardStatistic = ({ url, data, onEdit, validateEditedData }) => {

	return (
		<div className='card-statistic' style={{width: '50%'}}>
			<Route
				path={ `/${url}/${data.login}/:users?` }
				render={ ({ match }) => match.params.users !== 'edit' ? <UserCardNavigation /> : null }
			/>
			<Switch>
				<Route path={ `/${url}/${data.login}/followers` } render={ props => <FollowersList { ...props } /> }/>
				<Route path={ `/${url}/${data.login}/following` } render={ props => <FollowingList { ...props } /> }/>
			</Switch>
			<Route
						path={ `/${url}/${ data.login }/edit` }
						render={ props => (
							<UserCardEdit
								url={ url }
								login={ data.login }
								onEdit={ onEdit }
								validateEditedData={ validateEditedData }
								{ ...props }
							/>
						)}
					>
			</Route>
		</div>
	);

}
 
export default UserProvider.connect(getProps)(UserCardStatistic);;