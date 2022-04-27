import express from 'express';
import {
	deleteFile,
	downloadFile,
	getFiles,
	getSharedFiles,
	renameFile,
	shareFile,
	uploadFiles,
} from '../controllers/fileController.js';
import {
	createUser,
	deleteCurrentUser,
	deleteUserById,
	getAllUsers,
	getCurrentUser,
	getUserById,
	getUsersList,
	loginUser,
	updateCurrentUser,
	updateUserById,
} from '../controllers/usersController.js';
import admin from '../middlewares/admin.js';
import auth from '../middlewares/auth.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();

router.get('/api/users', auth, admin, getAllUsers);
router.get('/api/users/list', auth, getUsersList);
router.post('/api/users', createUser);

router.post('/api/users/login', loginUser);

router.get('/api/users/profile', auth, getCurrentUser);
router.put('/api/users/profile', auth, updateCurrentUser);
router.delete('/api/users/profile', auth, deleteCurrentUser);

router.get('/api/users/:id', auth, admin, getUserById);
router.put('/api/users/:id', auth, admin, updateUserById);
router.delete('/api/users/:id', auth, admin, deleteUserById);

router.get('/api/files', auth, getFiles);
router.get('/api/files/shared', auth, getSharedFiles);
router.post('/api/files', auth, upload.single('file'), uploadFiles);
router.post('/api/files/share', auth, shareFile);
router.get('/api/files/:id',auth, downloadFile);
router.put('/api/files/:id', auth, renameFile);
router.delete('/api/files/:id', auth, deleteFile);

export default router;
