import axios from 'axios';
import {
	USER_DELETE_FAIL,
	USER_DELETE_PROFILE_REQUEST,
	USER_DELETE_PROFILE_SUCCESS,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_DETAILS_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_LIST_FAIL,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_V2_FAIL,
	USER_LIST_V2_REQUEST,
	USER_LIST_V2_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_PROFILE_FAIL,
	USER_PROFILE_REQUEST,
	USER_PROFILE_RESET,
	USER_PROFILE_SUCCESS,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_UPDATE_FAIL,
	USER_UPDATE_PROFILE_FAIL,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
} from '../constants/userConstants';

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_LOGIN_REQUEST });
		const { data } = await axios.post('/api/users/login', { email, password });
		const response = { ...data.user, token: data.token };
		dispatch({ type: USER_LOGIN_SUCCESS, payload: response });
		localStorage.setItem('user', JSON.stringify(response));
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};

export const logout = () => (dispatch) => {
	localStorage.removeItem('user');
	localStorage.removeItem('cartItems');
	localStorage.removeItem('shippingAddress');
	dispatch({ type: USER_LOGOUT });
	dispatch({ type: USER_PROFILE_RESET });
};

export const register = (name, email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_REGISTER_REQUEST });
		const { data } = await axios.post('/api/users', { name, email, password });
		const response = { ...data.user, token: data.token };
		dispatch({ type: USER_REGISTER_SUCCESS, payload: response });
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: response,
		});
		localStorage.setItem('user', JSON.stringify(response));
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};

export const getUserProfile = () => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_PROFILE_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.get('/api/users/profile', config);
		dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: USER_PROFILE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};

export const updateUserProfile = (name, email, password) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.put('/api/users/profile', { name, email, password }, config);
		dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });

		const response = { ...data.user, token: data.token };
		dispatch({ type: USER_LOGIN_SUCCESS, payload: response });
		localStorage.setItem('user', JSON.stringify(response));
	} catch (error) {
		dispatch({
			type: USER_UPDATE_PROFILE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deleteUserProfile = () => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_DELETE_PROFILE_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		await axios.delete('/api/users/profile', config);
		dispatch({ type: USER_DELETE_PROFILE_SUCCESS });
	} catch (error) {
		dispatch({
			type: USER_UPDATE_PROFILE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listUser = () => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_LIST_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.get(`/api/users`, config);
		dispatch({ type: USER_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: USER_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getUsersList = () => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_LIST_V2_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.get(`/api/users/list`, config);
		dispatch({ type: USER_LIST_V2_SUCCESS, payload: data.data });
	} catch (error) {
		dispatch({
			type: USER_LIST_V2_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getUserDetail = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_DETAILS_REQUEST,
		});
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: userInfo.token,
			},
		};
		const { data } = await axios.get(`/api/users/${id}`, config);
		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deleteUser = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_DELETE_REQUEST,
		});
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: userInfo.token,
			},
		};
		await axios.delete(`/api/users/${id}`, config);
		dispatch({
			type: USER_DELETE_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: USER_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateUser = (id, user) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_UPDATE_REQUEST,
		});
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: userInfo.token,
			},
		};
		const { data } = await axios.put(`/api/users/${id}`, user, config);
		dispatch({
			type: USER_UPDATE_SUCCESS,
		});
		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
