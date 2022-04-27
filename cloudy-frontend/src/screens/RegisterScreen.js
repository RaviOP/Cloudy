import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { register } from '../actions/userActions';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';

const RegisterScreen = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userRegister = useSelector((state) => state.userRegister);
	const { loading, error, userInfo } = userRegister;

	useEffect(() => {
		if (userInfo) {
			navigate('/');
		}
	}, [navigate, userInfo]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Password Do Not Match');
			setPassword('');
			setConfirmPassword('');
		} else {
			dispatch(register(name, email.toLowerCase(), password));
		}
	};

	return (
		<div className='full-screen flex align-items-center justify-content-center'>
			<div className='mid-form'>
				<div className='text-center text-4xl font-bold text-black-alpha-60'>SIGN UP</div>
				{error && <Message severity='error' text={error} className='w-full my-3' />}
				{message && <Message severity='error' text={message} className='w-full my-3' />}
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
								required
							/>
							<label htmlFor='name'>Name</label>
						</div>
						<div className='p-float-label my-4'>
							<InputText
								id='username'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className={classNames({}, 'w-full', 'p-inputtext-sm')}
								required
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
								required
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
								required
							/>
							<label htmlFor='password'>Confirm Password</label>
						</div>
						<div className='text-center'>
							<Button type='submit' label='Login' className='p-button-sm' />
						</div>
						<div className='text-center mt-3'>
							<Link className='navbar-link' to='/login'>
								Already Have an Account?
							</Link>
						</div>
					</form>
				)}
			</div>
		</div>
	);
};

export default RegisterScreen;
