import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

import { getData } from '../../utils';
import UserProvider from '../UserCardProvider';

const UserCardInfo = (props) => {
	const { data } = props;
	return (
		
			<div className='card' style={{width: '50%'}}>
				<img className='card-img-top' src={ data.avatar_url } alt="avatar"/>
				<div className='card-body'>
					<h4 className='card-title'>
						<Link to={ `/${ data.login }/edit`}>{ data.name }</Link>
					</h4>
					<h5 className='card-title'>
						{ data.login }
					</h5>
					<div>
						{ data.company }
					</div>
					<div>
						{ data.location }
					</div>
					<h5 className='card-title'>Bio</h5>
					<div>{ data.bio ? data.bio : 'no bio entered' }</div>
				</div>
			</div>
	);
}

UserCardInfo.propTypes = {
	data: PropTypes.object.isRequired,
};
 
export default UserProvider.connect(getData)(UserCardInfo);