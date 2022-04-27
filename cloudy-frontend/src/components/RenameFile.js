import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { renameFile } from '../actions/fileActions';
import { Message } from 'primereact/message';

const RenameFile = ({ item, onHide }) => {
	const [name, setName] = useState(item.name);

	const dispatch = useDispatch();
	const { loading, file, error } = useSelector((state) => state.fileRename);

	useEffect(() => {
		if (file) {
			onHide();
		}
	}, [dispatch, file, onHide]);

	const onSubmit = () => {
		if (name !== '' && name !== null) {
			dispatch(renameFile(item._id, name));
		}
	};

	return (
		<div className='py-2 px-3'>
			<div className='text-center font-bold text-3xl'>Rename File</div>
			{error && <Message text={error} severity='error' className='w-full mt-4' />}
			<span className='p-float-label mt-5'>
				<InputText
					id='name'
					value={name}
					onChange={(e) => setName(e.target.value)}
					className='w-full p-inputtext-sm'
				/>
				<label htmlFor='name'>File Name</label>
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

export default RenameFile;
