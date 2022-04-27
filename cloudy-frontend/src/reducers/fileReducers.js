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

export const fileListReducer = (state = { files: [] }, action) => {
	switch (action.type) {
		case FILES_LIST_REQUEST:
			return { loading: true };
		case FILES_LIST_SUCCESS:
			return { loading: false, files: action.payload };
		case FILES_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const fileCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case FILES_CREATE_REQUEST:
			return { loading: true };
		case FILES_CREATE_SUCCESS:
			return { loading: false, file: action.payload };
		case FILES_CREATE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const sharedFileListReducer = (state = { sharedFiles: [] }, action) => {
	switch (action.type) {
		case FILES_SHARED_LIST_REQUEST:
			return { loading: true };
		case FILES_SHARED_LIST_SUCCESS:
			return { loading: false, sharedFiles: action.payload };
		case FILES_SHARED_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const fileDownloadReducer = (state = {}, action) => {
	switch (action.type) {
		case FILES_DOWNLOAD_REQUEST:
			return { loading: true };
		case FILES_DOWNLOAD_SUCCESS:
			return { loading: false, success: true };
		case FILES_DOWNLOAD_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const fileShareReducer = (state = {}, action) => {
	switch (action.type) {
		case FILES_SHARE_REQUEST:
			return { loading: true };
		case FILES_SHARE_SUCCESS:
			return { loading: false, file: action.payload };
		case FILES_SHARE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const fileRenameReducer = (state = {}, action) => {
	switch (action.type) {
		case FILES_RENAME_REQUEST:
			return { loading: true };
		case FILES_RENAME_SUCCESS:
			return { loading: false, file: action.payload };
		case FILES_RENAME_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const fileDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case FILES_DELETE_REQUEST:
			return { loading: true };
		case FILES_DELETE_SUCCESS:
			return { loading: false, file: action.payload };
		case FILES_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
