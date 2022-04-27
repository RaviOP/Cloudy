import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';

import { getUserDetail, updateUser } from '../actions/userActions';
import { USER_DETAILS_RESET, USER_UPDATE_RESET } from '../constants/userConstants';

const UserEditScreen = () => {
	const params = useParams();
	const navigate = useNavigate();
	const userId = params.id;
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);

	const dispatch = useDispatch();
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userUpdate = useSelector((state) => state.userUpdate);
	const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: USER_UPDATE_RESET });
			dispatch({ type: USER_DETAILS_RESET });
			navigate('/admin/userlist');
		} else if (!user || !user.name) {
			dispatch(getUserDetail(userId));
		} else {
			setName(user.name);
			setEmail(user.email);
			setIsAdmin(user.isAdmin);
		}
	}, [user, dispatch, userId, successUpdate, navigate]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(updateUser(userId, { name, email, isAdmin }));
	};

	const goBackHandler = (e) => {
		e.preventDefault();
		dispatch({ type: USER_DETAILS_RESET });
		navigate('/admin/userlist');
	};

	return (
		<div className='full-screen '>
			<div className='container'>
				<div className='pt-3'>
					<Button type='button' onClick={goBackHandler} label='Go Back'></Button>
				</div>
				<div className='h-full flex align-items-center justify-content-center'>
					<div className='mid-form'>
						<div className='text-center text-4xl font-bold text-black-alpha-60'>
							Edit User
						</div>
						{loadingUpdate && (
							<div className='text-center'>
								<ProgressSpinner />
							</div>
						)}
						{errorUpdate && (
							<Message severity='error' text={errorUpdate} className='w-full my-3' />
						)}
						{loading ? (
							<div className='text-center my-4'>
								<ProgressSpinner />
							</div>
						) : error ? (
							<Message severity='error' text={error} className='w-full' />
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
								<div>
									<Checkbox
										onChange={(e) => setIsAdmin(e.checked)}
										checked={isAdmin}
										id='isAdmin'
									></Checkbox>
									<label htmlFor='isAdmin' className='ml-2 p-checkbox-label'>
										Is Admin
									</label>
								</div>
								<div className='text-center mt-2'>
									<Button
										type='submit'
										label='Update'
										className='p-button-sm p-button-success'
									/>
								</div>
							</form>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserEditScreen;
