import React from 'react';

import UserProvider from '../UserCardProvider';
import UserCardInfo from './UserCardInfo';
import UserCardStatistic from './UserCardStatistic';

const UserCardContent = (props) => {
	const { url, data, onEdit, validateEditedData, onChangeUser } = props;

	return (
		<UserProvider
			url={ url }
			data={ data }
			changeUser={ onChangeUser }
			onEdit={ onEdit }
			validateEditedData={ validateEditedData }
		>
			<div className='card-content'>
				<UserCardInfo />
				<UserCardStatistic	/>
			</div>
		</UserProvider>
	);
}
 
export default UserCardContent;