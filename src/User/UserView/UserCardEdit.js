import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

class UserCardEdit extends Component {
	state = { 
		token: '',
		name: '',
		company: '',
		location: '',
		bio: '',
	}
	render() {
		const { token } = this.state;

		return (
			<form onSubmit={ this.handleSubmit }>
				{ Object.keys(this.state).map((key, index) => (
					<div className='form-group' key={index}>
						<label htmlFor={key}>Enter {key}</label>
						{
							key !== 'bio'
								? <input
										id={key}
										className='form-control'
										type='text'
										value={ this.state[key] }
										onChange={ this.inputValue }
									/>
								: <textarea
										id={key}
										className='form-control'
										type='text'
										value={ this.state[key] }
										onChange={ this.inputValue }
									/>
							}
					</div>
				))}

				{
					token
						? <button className='btn btn-primary' type='submit'>Submit</button>
						: null 
				}
				<Link to={ `/${ this.props.login }`} className='btn btn-danger'>Cancel</Link>
			</form>
		);
	}

	inputValue = (e) => {
		this.setState({[e.target.id]: e.target.value});
	};

	handleCancel = () => this.props.onCancel();

	handleSubmit = (e) => {
		e.preventDefault();
		const { onEdit, history } = this.props;
		const { name, company, location, bio } = this.state;
		
		onEdit({userData: {name, company, location, bio}});
		this.sendDataToServer({ name, company, location, bio });
		history.push(`/${ this.props.login }`)
	};

	sendDataToServer = data => {
		const { token } = this.state;
		const { validateEditedData } = this.props;
		validateEditedData(data);

		if (Object.keys(data).length) {
			fetch(`https://api.github.com/user?access_token=${token}`,
				{
					method: 'PATCH',
					body: JSON.stringify(data)
				}
			)
		}
	}
};

UserCardEdit.propTypes = {
	onEdit: PropTypes.func.isRequired,
	validateEditedData: PropTypes.func.isRequired
};
 
export default UserCardEdit;