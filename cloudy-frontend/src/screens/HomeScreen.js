import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const HomeScreen = () => {
	const { userInfo } = useSelector((state) => state.userLogin);
	const navigate = useNavigate();

	useEffect(() => {
		if (userInfo) {
			navigate('/files');
		}
	}, [userInfo, navigate]);

	return (
		<div className='full-screen'>
			<div className='container flex'>
				<div className='col-12 full-screen flex flex-column align-items-center justify-content-center'>
					<div
						style={{ fontSize: '3rem', fontWeight: '900' }}
						className='text-black-alpha-70'
					>
						Cloudy
					</div>
					<div style={{ fontSize: '1.5rem', fontWeight: '500' }}>
						Cloud Based File Manager
					</div>
					<div className='flex mt-2'>
						<div className='p-button p-button-outlined p-button-info p-button-sm mx-1'>
							<Link
								to='/login'
								className='no-underline'
								style={{ color: 'var(--info-color)' }}
							>
								Login
							</Link>
						</div>
						<div className='p-button p-button-outlined p-button-info p-button-sm mx-1'>
							<Link
								to='/register'
								className='no-underline'
								style={{ color: 'var(--info-color)' }}
							>
								Sign Up
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeScreen;
