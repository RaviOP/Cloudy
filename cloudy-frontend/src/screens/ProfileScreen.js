import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import {
	deleteUserProfile,
	getUserProfile,
	logout,
	updateUserProfile,
} from '../actions/userActions';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';

const ProfileScreen = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');
	const [updateMessage, setUpdateMessage] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userProfile = useSelector((state) => state.userProfile);
	const { loading, user, error } = userProfile;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { success } = userUpdateProfile;

	useEffect(() => {
		if (!userInfo) {
			navigate('/login');
		}
	}, [navigate, userInfo]);

	if (message) {
		setTimeout(() => {
			setMessage('');
		}, 2000);
	}
	if (updateMessage) {
		setTimeout(() => {
			setUpdateMessage('');
		}, 2000);
	}

	useEffect(() => {
		if (!user || !user.name || success) {
			dispatch({ type: USER_UPDATE_PROFILE_RESET });
			dispatch(getUserProfile());
		} else {
			setName(user.name);
			setEmail(user.email);
		}
	}, [dispatch, success, user]);

	useEffect(() => {
		if (success) {
			setUpdateMessage('Profile Updated Successfully');
		}
	}, [success]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Password Do Not Match');
			setPassword('');
			setConfirmPassword('');
		} else {
			//Dispatch Update Profile
			dispatch(updateUserProfile(name, email, password));
			setPassword('');
			setConfirmPassword('');
		}
	};

	const deleteHandler = (e) => {
		e.preventDefault();
		if (window.confirm('Are You Sure. Do You want to Delete your Account?')) {
			dispatch(deleteUserProfile());
			dispatch(logout());
			navigate('/register');
		}
	};

	return (
		<div className='full-screen flex align-items-center justify-content-center'>
			<div className='mid-form'>
				<div className='text-center text-4xl font-bold text-black-alpha-60'>
					Your Profie
				</div>
				{error && <Message severity='error' text={error} className='w-full my-3' />}
				{message && <Message severity='error' text={message} className='w-full my-3' />}
				{updateMessage && (
					<Message severity='success' text={updateMessage} className='w-full my-3' />
				)}
				{loading ? (
					<div className='text-center my-4'>
						<ProgressSpinner />
					</div>
				) : (
					<form onSubmit={submitHandler}>
						<div className='p-float-label my-4'>
							<InputText
								id='name'
								value={name}
								onChange={(e) => setName(e.target.value)}
								className={classNames({}, 'w-full', 'p-inputtext-sm')}
							/>
							<label htmlFor='name'>Name</label>
						</div>
						<div className='p-float-label my-4'>
							<InputText
								id='username'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className={classNames({}, 'w-full', 'p-inputtext-sm')}
							/>
							<label htmlFor='username'>Email</label>
						</div>
						<div className='p-float-label my-4'>
							<Password
								value={password}
								id='password p-fluid'
								className={classNames({}, 'w-full', 'p-inputtext-sm')}
								onChange={(e) => setPassword(e.target.value)}
								toggleMask
								feedback={false}
							/>
							<label htmlFor='password'>Password</label>
						</div>
						<div className='p-float-label my-4'>
							<Password
								value={confirmPassword}
								id='password p-fluid'
								className={classNames({}, 'w-full', 'p-inputtext-sm')}
								onChange={(e) => setConfirmPassword(e.target.value)}
								toggleMask
								feedback={false}
							/>
							<label htmlFor='password'>Confirm Password</label>
						</div>
						<div className='text-center'>
							<Button type='submit' label='Update Account' className='p-button-sm' />
						</div>
						<div className='text-center mt-4'>
							<Button
								type='button'
								label='Delete Account'
								className='p-button-sm p-button-danger'
								onClick={deleteHandler}
							/>
						</div>
					</form>
				)}
			</div>
		</div>
	);
};

export default ProfileScreen;
