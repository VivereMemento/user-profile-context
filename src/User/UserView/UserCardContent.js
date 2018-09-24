import React from 'react';

import UserProvider from '../UserCardProvider';
import UserCardInfo from './UserCardInfo';
import UserCardStatistic from './UserCardStatistic';

const UserCardContent = (props) => {
	const { data, showEdit, onChangeUser } = props;

	return (
		<UserProvider data={ data } changeUser={ onChangeUser }>
			<div className='card-content'>
				<UserCardInfo showEdit={ showEdit }/>
				<UserCardStatistic />
			</div>
		</UserProvider>
	);
}
 
export default UserCardContent;