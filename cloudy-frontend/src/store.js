import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
	userDetailsReducer,
	userListReducer,
	userLoginReducer,
	userProfileReducer,
	userRegisterReducer,
	userUpdateProfileReducer,
	userDeleteProfileReducer,
	userDeleteReducer,
	userUpdateReducer,
	userListV2Reducer,
} from './reducers/userReducers';
import {
	fileCreateReducer,
	fileDeleteReducer,
	fileDownloadReducer,
	fileListReducer,
	fileRenameReducer,
	fileShareReducer,
	sharedFileListReducer,
} from './reducers/fileReducers';

const reducers = combineReducers({
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userProfile: userProfileReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userDeleteProfile: userDeleteProfileReducer,
	userList: userListReducer,
	userDetails: userDetailsReducer,
	userDelete: userDeleteReducer,
	userUpdate: userUpdateReducer,
	userListV2: userListV2Reducer,
	fileList: fileListReducer,
	fileCreate: fileCreateReducer,
	sharedFileList: sharedFileListReducer,
	fileDownload: fileDownloadReducer,
	fileShare: fileShareReducer,
	fileRename: fileRenameReducer,
	fileDelete: fileDeleteReducer,
});

const userInfoFromStorage = localStorage.getItem('user')
	? JSON.parse(localStorage.getItem('user'))
	: null;

const initialState = {
	userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
