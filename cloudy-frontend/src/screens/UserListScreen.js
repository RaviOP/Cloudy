import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Message } from 'primereact/message';
import { DataTable } from 'primereact/datatable';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { listUser, deleteUser } from '../actions/userActions';

const UserListScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userList = useSelector((state) => state.userList);
	const { loading, error, users } = userList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDelete = useSelector((state) => state.userDelete);
	const { success } = userDelete;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listUser());
		} else {
			navigate('/');
		}
	}, [dispatch, userInfo, navigate, success]);

	const deleteHandler = (id) => {
		if (window.confirm('Are You Sure?')) {
			dispatch(deleteUser(id));
		}
	};

	const actionBodyTemplate = (rowData) => {
		return (
			<React.Fragment>
				<Button
					icon='pi pi-pencil'
					className='p-button-rounded p-button-help mr-2'
					style={{ width: '2.5rem', height: '2.5rem' }}
					onClick={() => navigate(`/admin/user/edit/${rowData._id}`)}
				/>
				<Button
					icon='pi pi-trash'
					className='p-button-rounded p-button-danger'
					style={{ width: '2.5rem', height: '2.5rem' }}
					onClick={() => deleteHandler(rowData._id)}
				/>
			</React.Fragment>
		);
	};

	const adminBodyTemplate = (rowData) => {
		return (
			<i
				className={classNames('pi', {
					'true-icon pi-check-circle': rowData.isAdmin,
					'false-icon pi-times-circle': !rowData.isAdmin,
				})}
			></i>
		);
	};

	return (
		<div className='full-screen'>
			<div className='container'>
				{error && <Message severity='error' text={error} className='w-full' />}
				<div className='text-center text-5xl font-bold text-black-alpha-60 pt-5'>Users</div>
				<DataTable
					value={users}
					loading={loading}
					stripedRows
					className='pt-3'
					showGridlines
					responsiveLayout='scroll'
				>
					<Column field='_id' header='Id' className='text-center' />
					<Column field='name' header='Name' className='text-center' />
					<Column field='email' header='Email' className='text-center' />
					<Column
						field='isAdmin'
						header='Is Admin'
						className='text-center'
						body={adminBodyTemplate}
					/>
					<Column
						body={actionBodyTemplate}
						exportable={false}
						className='text-center'
					></Column>
				</DataTable>
			</div>
		</div>
	);
};

export default UserListScreen;
