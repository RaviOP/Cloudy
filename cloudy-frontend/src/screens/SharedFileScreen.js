import moment from 'moment';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Message } from 'primereact/message';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { downloadFile, getSharedFiles } from '../actions/fileActions';
import ShareFile from '../components/ShareFile';

const SharedFileScreen = () => {
	const [first, setFirst] = useState(0);
	const [show, setShow] = useState(false);
	const [rows, setRows] = useState(10);
	const [item, setItem] = useState(null);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { userInfo } = useSelector((state) => state.userLogin);
	const { loading, sharedFiles, error } = useSelector((state) => state.sharedFileList);
	const { file: fileShareRefresh } = useSelector((state) => state.fileShare);

	useEffect(() => {
		if (!userInfo.name) {
			navigate('/');
		}
	}, [navigate, userInfo.name]);

	useEffect(() => {
		dispatch(getSharedFiles());
	}, [dispatch, fileShareRefresh]);

	const onCustomPage = (event) => {
		setFirst(event.first);
		setRows(event.rows);
	};

	const shareClickHandler = (row) => {
		setItem(row);
		setShow(true);
	};

	const actionBodyTemplate = (rowData) => {
		return (
			<React.Fragment>
				{userInfo._id === rowData.user._id && (
					<Button
						icon='pi pi-share-alt'
						className='p-button-rounded p-button-outlined mr-2'
						style={{ width: '2rem', height: '2rem' }}
						onClick={() => shareClickHandler(rowData)}
					/>
				)}
				<Button
					icon='pi pi-download'
					className='p-button-rounded p-button-success p-button-outlined mr-2'
					style={{ width: '2rem', height: '2rem' }}
					onClick={() => dispatch(downloadFile(rowData._id))}
				/>
			</React.Fragment>
		);
	};

	const onHide = () => {
		setShow(false);
	};

	return (
		<div className='full-screen'>
			<div className='container '>
				<div className='pt-3'></div>
				<div className=' mx-3 white-box'>
					<div className='font-bold text-3xl text-black-alpha-40 pl-1'>Shared Files</div>
					<div className='mt-2'>
						{error ? (
							<Message severity='error' text={error} className='w-full' />
						) : (
							<>
								<DataTable
									value={sharedFiles}
									loading={loading}
									paginator
									first={first}
									rows={rows}
									onPage={onCustomPage}
									stripedRows
									showGridlines
									paginatorClassName='justify-content-end'
									paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
									currentPageReportTemplate='Showing {first} to {last} of {totalRecords} Shared Files'
									emptyMessage='No Files Found'
								>
									<Column
										header='Name'
										field='name'
										filter
										style={{ width: '15%' }}
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
										style={{ width: '10%' }}
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
										style={{ width: '15%' }}
									/>
								</DataTable>
							</>
						)}
					</div>
				</div>
				<Dialog
					visible={show}
					onHide={onHide}
					closable
					dismissableMask
					style={{ width: '30vw' }}
				>
					<ShareFile onHide={onHide} item={item} />
				</Dialog>
			</div>
		</div>
	);
};

export default SharedFileScreen;
