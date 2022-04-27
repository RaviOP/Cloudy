import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Chip } from 'primereact/chip';
import { classNames } from 'primereact/utils';
import { logout } from '../actions/userActions';
import CustomLink from './CustomLink';

const Header = () => {
	const [avatarRoutes, setAvatarRoutes] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		const avatarRoutes = ['/profile', '/admin/userlist', '/admin/user/edit/:id'];
		if (avatarRoutes.includes(window.location.pathname)) {
			setAvatarRoutes(true);
		} else {
			setAvatarRoutes(false);
		}
	}, [window.location.pathname]); //eslint-disable-line

	const onLogoClick = () => {
		navigate('/');
	};

	const logoutClickHandler = () => {
		dispatch(logout());
		navigate('/login');
	};
	return (
		<div className='header'>
			<div className='container'>
				<div className='flex align-items-center' style={{ height: '7vh' }}>
					<div className='flex-1'>
						<div className='cursor-pointer' onClick={onLogoClick}>
							<img
								src='/Logo.png'
								alt='Cloudy'
								style={{ height: '3.2rem', background: 'white' }}
							/>
						</div>
					</div>
					<div className='flex align-items-center'>
						{!userInfo && (
							<>
								<CustomLink to='/' className='navbar-link'>
									<span>Home</span>
								</CustomLink>
								<CustomLink to='/login' className='navbar-link'>
									<span>Login</span>
								</CustomLink>
								<CustomLink to='/register' className='navbar-link'>
									<span>Register</span>
								</CustomLink>
							</>
						)}
						{userInfo && (
							<>
								<CustomLink to='/files' className='navbar-link'>
									<span>Files</span>
								</CustomLink>
								<CustomLink to='/shared' className='navbar-link'>
									<span>Shared</span>
								</CustomLink>
								<div className='dropdown navbar-link'>
									<div>
										<Chip
											className={classNames(
												{
													'custom-chip': avatarRoutes,
													'custom-chip-invert': !avatarRoutes,
												},
												'cursor-pointer',
												'border-1',
											)}
											label={userInfo.name}
											icon='pi pi-user'
										/>
									</div>
									<div className='dropdown-content'>
										<div className='dropdown-child'>
											<CustomLink to='/profile' className='navbar-link'>
												<span>Profile</span>
											</CustomLink>
										</div>
										{userInfo.isAdmin && (
											<div className='dropdown-child'>
												<CustomLink
													to='/admin/userlist'
													className='navbar-link'
												>
													<span>Users</span>
												</CustomLink>
											</div>
										)}
										<div className='dropdown-child'>
											<div
												className='navbar-link cursor-pointer'
												onClick={logoutClickHandler}
											>
												<span>Logout</span>
											</div>
										</div>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
