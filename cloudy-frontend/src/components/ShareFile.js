import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { MultiSelect } from 'primereact/multiselect';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from 'primereact/message';
import { getUsersList } from '../actions/userActions';
import { shareFile } from '../actions/fileActions';

const ShareFile = ({ item, onHide }) => {
	const [selectedUsers, setSelectedUsers] = useState([...item.shared]);
	const dispatch = useDispatch();
	const { loading, file, error } = useSelector((state) => state.fileShare);
	const { usersList, error: userError } = useSelector((state) => state.userListV2);

	useEffect(() => {
		if (file) {
			onHide();
		}
	}, [dispatch, file, onHide]);

	useEffect(() => {
		dispatch(getUsersList());
	}, [dispatch]);

	const onSubmit = () => {
		dispatch(shareFile(item._id, selectedUsers));
	};

	return (
		<div className='py-2 px-3'>
			<div className='text-center font-bold text-3xl'>Share File</div>
			{error && <Message text={error} severity='error' className='w-full mt-4' />}
			{userError && <Message text={userError} severity='error' className='w-full mt-4' />}
			<span className='p-fluid mt-6 p-float-label'>
				<MultiSelect
					value={selectedUsers}
					options={usersList}
					onChange={(e) => setSelectedUsers(e.value)}
					optionLabel='email'
					optionValue='_id'
					filter
					filterBy='email'
				/>
				<label htmlFor='auto'>Search Email</label>
			</span>
			<div className='mt-5 text-center'>
				<Button
					label='Submit'
					onClick={onSubmit}
					type='button'
					className='p-button-sm p-button-success'
					loading={loading}
				/>
			</div>
		</div>
	);
};

export default ShareFile;
