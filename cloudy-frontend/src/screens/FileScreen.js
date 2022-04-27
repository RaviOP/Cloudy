import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { FileUpload } from 'primereact/fileupload';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { BlockUI } from 'primereact/blockui';
import { Menu } from 'primereact/menu';
import { Dialog } from 'primereact/dialog';
import { createFile, deleteFile, downloadFile, getFiles } from '../actions/fileActions';
import {
	FILES_CREATE_FAIL,
	FILES_DELETE_FAIL,
	FILES_RENAME_SUCCESS,
	FILES_SHARE_SUCCESS,
} from '../constants/fileConstants';
import { Message } from 'primereact/message';
import { Button } from 'primereact/button';
import moment from 'moment';
import RenameFile from '../components/RenameFile';
import ShareFile from '../components/ShareFile';

const FileScreen = () => {
	const navigate = useNavigate();
	const toast = useRef(null);
	const menu = useRef(null);
	const dispatch = useDispatch();
	const [first, setFirst] = useState(0);
	const [show, setShow] = useState(false);
	const [rows, setRows] = useState(10);
	const [item, setItem] = useState(null);
	const [mode, setMode] = useState('RENAME');

	const { userInfo } = useSelector((state) => state.userLogin);

	const { loading, file, error } = useSelector((state) => state.fileCreate);
	const { file: renameFileRefresh } = useSelector((state) => state.fileRename);
	const { file: fileShareRefresh } = useSelector((state) => state.fileShare);

	const items = [
		{
			label: 'Download',
			command: () => {
				dispatch(downloadFile(item._id));
			},
		},
		{
			label: 'Rename',
			command: () => {
				setMode('RENAME');
				setShow(true);
			},
		},
		{
			label: 'Share',
			command: () => {
				setMode('SHARE');
				setShow(true);
			},
		},
		{
			label: 'Delete',
			command: () => {
				dispatch(deleteFile(item._id));
			},
		},
	];

	const {
		loading: listLoading,
		files,
		error: listError,
	} = useSelector((state) => state.fileList);

	const { file: deleteFileRefresh, error: deleteError } = useSelector(
		(state) => state.fileDelete,
	);

	useEffect(() => {
		if (!userInfo) {
			navigate('/login');
		}
	}, [navigate, userInfo]);

	useEffect(() => {
		dispatch(getFiles());
		if (renameFileRefresh) {
			dispatch({ type: FILES_RENAME_SUCCESS, payload: null });
		}
		if (fileShareRefresh) {
			dispatch({ type: FILES_SHARE_SUCCESS, payload: null });
		}
	}, [dispatch, file, deleteFileRefresh, renameFileRefresh, fileShareRefresh]);

	const uploadHandler = (e) => {
		const files = e.files;
		files.forEach((file) => {
			dispatch(createFile(file));
		});
		e.options.clear();
	};

	const onCustomPage = (event) => {
		setFirst(event.first);
		setRows(event.rows);
	};

	useEffect(() => {
		if (deleteFileRefresh) {
			toast.current.show({
				severity: 'info',
				summary: 'Delete',
				detail: `Successfully Deleted File`,
				life: 2000,
			});
		}
	}, [deleteFileRefresh]);

	useEffect(() => {
		if (error) {
			toast.current.show({
				severity: 'error',
				summary: 'Error',
				detail: `Error Uploading File`,
				life: 2000,
			});
		}
		dispatch({
			type: FILES_CREATE_FAIL,
			payload: null,
		});
	}, [dispatch, error]);

	useEffect(() => {
		if (deleteError) {
			toast.current.show({
				severity: 'error',
				summary: 'Error',
				detail: deleteError,
				life: 2000,
			});
		}
		dispatch({
			type: FILES_DELETE_FAIL,
			payload: null,
		});
	}, [deleteError, dispatch]);

	const dotClick = (event, row) => {
		setItem(row);
		menu.current.toggle(event);
	};

	const onHide = () => {
		setShow(false);
	};

	const actionBodyTemplate = (rowData) => {
		return (
			<React.Fragment>
				<Button
					icon='pi pi-ellipsis-h'
					className='p-button-rounded p-button-outlined mr-2'
					style={{ width: '2rem', height: '2rem' }}
					onClick={(e) => dotClick(e, rowData)}
				/>
			</React.Fragment>
		);
	};

	return (
		<div className='full-screen'>
			<Toast ref={toast} />
			<div className='container'>
				<div className='px-3 py-3'>
					<BlockUI blocked={loading}>
						<FileUpload
							accept='image/*,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.xlsx,.pdf'
							multiple
							maxFileSize={10000000}
							emptyTemplate={
								<p className='text-center'>Drag and drop files here to upload.</p>
							}
							cancelOptions={{
								className: 'p-button-danger',
								iconOnly: true,
							}}
							uploadOptions={{
								className: 'p-button-success',
								iconOnly: true,
							}}
							chooseOptions={{
								iconOnly: true,
							}}
							customUpload
							uploadHandler={uploadHandler}
						/>
					</BlockUI>
				</div>

				<div className='mx-3 white-box'>
					<div className='font-bold text-3xl text-black-alpha-40 pl-1'>Your Files</div>
					<div className='mt-2'>
						{listError ? (
							<Message severity='error' text={listError} className='w-full' />
						) : (
							<>
								<DataTable
									value={files}
									loading={listLoading}
									paginator
									first={first}
									rows={rows}
									onPage={onCustomPage}
									stripedRows
									showGridlines
									paginatorClassName='justify-content-end'
									paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
									currentPageReportTemplate='Showing {first} to {last} of {totalRecords} Files'
									emptyMessage='No Files Found'
								>
									<Column
										header='Name'
										field='name'
										filter
										style={{ width: '20%' }}
									/>
									<Column
										header='Type'
										field='mimeType'
										filter
										className='text-center'
										style={{ width: '15%' }}
									/>
									<Column
										header='Size'
										field='size'
										className='text-center'
										filter
										dataType='numeric'
										style={{ width: '15%' }}
										body={(rowdata) => (
											<>
												<span>{rowdata.size / 1000}</span> <span>KB</span>
											</>
										)}
									/>

									<Column
										header='Uploaded By'
										field='user.name'
										className='text-center'
										style={{ width: '10%' }}
										body={(rowdata) =>
											rowdata.user.name === userInfo.name
												? 'You'
												: rowdata.user.name
										}
									/>
									<Column
										header='Uploaded On'
										field='createdAt'
										sortable
										dataType='date'
										style={{ width: '20%' }}
										body={(rowdata) => moment(rowdata.createdAt).format('lll')}
									/>
									<Column
										header='Last Updated'
										field='updatedAt'
										sortable
										dataType='date'
										style={{ width: '20%' }}
										body={(rowdata) => moment(rowdata.updatedAt).format('lll')}
									/>

									<Column
										header='Actions'
										body={actionBodyTemplate}
										className='text-center'
										style={{ width: '5%' }}
									/>
								</DataTable>
								<Menu model={items} popup ref={menu} />
							</>
						)}
					</div>
				</div>
			</div>
			<Dialog
				visible={show}
				onHide={onHide}
				closable
				dismissableMask
				style={{ width: '30vw' }}
			>
				{mode === 'RENAME' ? (
					<RenameFile onHide={onHide} item={item} />
				) : (
					<ShareFile onHide={onHide} item={item} />
				)}
			</Dialog>
		</div>
	);
};

export default FileScreen;
