import File from '../models/Files.js';
import path from 'path';
import fs from 'fs'

export const getFiles = async (req, res) => {
	try {
		const files = await File.find({
			$and: [{ isShared: false }, { user: req._id }],
		})
			.populate('user')
			.sort({ createdAt: -1 });
		res.status(200).send({ status: 'success', data: files });
	} catch (error) {
		res.status(500).send({ status: 'error', message: error.message });
	}
};

export const uploadFiles = async (req, res) => {
	try {
		const inputFile = req.file;
		if (!inputFile) {
			throw new Error('File is required');
		}
		const file = await File({
			name: inputFile.originalname,
			fileName: inputFile.originalname,
			mimeType: inputFile.mimetype,
			size: inputFile.size,
			path: inputFile.path,
			user: req._id,
			isShared: false,
			shared: [],
		});
		await file.save();
		res.status(201).send({ status: 'success', data: file });
	} catch (error) {
		res.status(400).send({ status: 'error', message: error.message });
	}
};

export const getSharedFiles = async (req, res) => {
	try {
		const files = await File.find({
			$or: [
				{ $and: [{ isShared: true }, { user: req._id }] },
				{ $and: [{ isShared: true }, { shared: req._id }] },
			],
		})
			.populate('user')
			.sort({ createdAt: -1 });
		res.status(200).send({ status: 'success', data: files });
	} catch (error) {
		res.status(500).send({ status: 'error', message: error.message });
	}
};

export const shareFile = async (req, res) => {
	try {
		const { fileId, userId } = req.body;
		if (userId.length > 0) {
			const file = await File.findOne({
				_id: fileId,
				user: req._id,
			});

			if (!file) {
				throw new Error('File Not Found');
			}
			file.shared = [...userId];
			file.isShared = true;
			await file.save();
			res.status(200).send({ status: 'success', data: file });
		} else {
			throw new Error(`Please Select Email's`)
		}
		
		
	} catch (error) {
		res.status(400).send({ status: 'error', message: error.message });
	}
};

export const downloadFile = async (req, res) => {
	try {
		const fileId = req.params.id;
		const file = await File.findOne({
			_id: fileId,
		});
		if (!file) {
			throw new Error('File Not Found');
		}
		var options = {
			root: path.resolve(path.dirname('')),

			headers: {
				'filename': file.fileName
			},
		};
		res.status(200).sendFile(file.path, options);
	} catch (error) {
		res.status(400).send({ status: 'error', message: error.message });
	}
};

export const renameFile = async (req, res) => {
	try {
		const fileId = req.params.id;
		const name = req.body.name;
		const file = await File.findOneAndUpdate(
			{
				_id: fileId,
				user: req._id,
			},
			{
				name,
			},
			{
				new: true,
			},
		);
		if (!file) {
			throw new Error('File Not Found');
		}
		res.status(200).send({ status: 'success', data: file });
	} catch (error) {
		res.status(400).send({ status: 'error', message: error.message });
	}
};

export const deleteFile = async (req, res) => {
	try {
		const fileId = req.params.id;
		const file = await File.findOneAndDelete({
			_id: fileId,
			user: req._id,
		});
		if (!file) {
			throw new Error('File Not Found');
		}
		const filePath = path.resolve(path.dirname('')) + file.path;
		// fs.rm(filePath);
		res.status(200).send({ status: 'success', data: file });
	} catch (error) {
		res.status(400).send({ status: 'error', message: error.message });
	}
};
