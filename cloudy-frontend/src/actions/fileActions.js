import axios from 'axios';
import {
	FILES_CREATE_FAIL,
	FILES_CREATE_REQUEST,
	FILES_CREATE_SUCCESS,
	FILES_DELETE_FAIL,
	FILES_DELETE_REQUEST,
	FILES_DELETE_SUCCESS,
	FILES_DOWNLOAD_FAIL,
	FILES_DOWNLOAD_REQUEST,
	FILES_DOWNLOAD_SUCCESS,
	FILES_LIST_FAIL,
	FILES_LIST_REQUEST,
	FILES_LIST_SUCCESS,
	FILES_RENAME_FAIL,
	FILES_RENAME_REQUEST,
	FILES_RENAME_SUCCESS,
	FILES_SHARED_LIST_FAIL,
	FILES_SHARED_LIST_REQUEST,
	FILES_SHARED_LIST_SUCCESS,
	FILES_SHARE_FAIL,
	FILES_SHARE_REQUEST,
	FILES_SHARE_SUCCESS,
} from '../constants/fileConstants';

export const getFiles = () => async (dispatch, getState) => {
	try {
		dispatch({ type: FILES_LIST_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.get('/api/files', config);
		dispatch({ type: FILES_LIST_SUCCESS, payload: data.data });
	} catch (error) {
		dispatch({
			type: FILES_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};

export const createFile = (file) => async (dispatch, getState) => {
	try {
		dispatch({ type: FILES_CREATE_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const form = new FormData();
		form.append('file', file);
		const { data } = await axios.post('/api/files', form, config);
		dispatch({ type: FILES_CREATE_SUCCESS, payload: data.data });
	} catch (error) {
		dispatch({
			type: FILES_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};

export const getSharedFiles = () => async (dispatch, getState) => {
	try {
		dispatch({ type: FILES_SHARED_LIST_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.get('/api/files/shared', config);
		dispatch({ type: FILES_SHARED_LIST_SUCCESS, payload: data.data });
	} catch (error) {
		dispatch({
			type: FILES_SHARED_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};

export const downloadFile = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: FILES_DOWNLOAD_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
			responseType: 'blob',
		};
		const response = await axios.get(`/api/files/${id}`, config);
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', response.headers.filename);
		document.body.appendChild(link);
		link.click();
		dispatch({ type: FILES_DOWNLOAD_SUCCESS });
	} catch (error) {
		dispatch({
			type: FILES_DOWNLOAD_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};

export const renameFile = (fileId, name) => async (dispatch, getState) => {
	try {
		dispatch({ type: FILES_RENAME_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.put(`/api/files/${fileId}`, { name }, config);
		dispatch({ type: FILES_RENAME_SUCCESS, payload: data.data });
	} catch (error) {
		dispatch({
			type: FILES_RENAME_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};

export const shareFile = (fileId, userId) => async (dispatch, getState) => {
	try {
		dispatch({ type: FILES_SHARE_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.post(`/api/files/share`, { fileId, userId }, config);
		dispatch({ type: FILES_SHARE_SUCCESS, payload: data.data });
	} catch (error) {
		dispatch({
			type: FILES_SHARE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};

export const deleteFile = (fileId) => async (dispatch, getState) => {
	try {
		dispatch({ type: FILES_DELETE_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.delete(`/api/files/${fileId}`, config);
		dispatch({ type: FILES_DELETE_SUCCESS, payload: data.data });
	} catch (error) {
		dispatch({
			type: FILES_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};
