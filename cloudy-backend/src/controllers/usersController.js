import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		if (!users) {
			return res.send([]);
		}
		res.status(200).send(users);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

export const getUsersList = async (req, res) => {
	try {
		const users = await User.find(
				{
					_id: { $ne: req._id },
				},
				'_id email',
			);
		res.status(200).send({ status: 'success', data: users });
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

export const getCurrentUser = async (req, res) => {
	try {
		res.status(200).send(req.user);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

export const getUserById = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(400).send('User Not Found');
		}
		res.status(200).send(user);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

export const createUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const emailCheck = await User.isEmailUsed(email);
		if (emailCheck) {
			res.status(400);
			throw new Error('User Already Exists');
		}
		const user = new User({ name, email, password });
		await user.save();
		const token = await user.generateAuthToken();
		res.status(201).send({ user, token });
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};

export const updateUserById = async (req, res) => {
	try {
		const { isAdmin } = req.body;
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(400).send('User Not Found');
		}
		user.isAdmin = isAdmin;
		await user.save();
		res.status(200).send(user);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};

export const updateCurrentUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const user = await User.findById(req._id);
		user.name = name || user.name;
		user.email = email || user.email;
		if (password) {
			user.password = password;
		}
		await user.save();
		const token = await user.generateAuthToken();
		res.status(200).send({ user, token });
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};

export const deleteUserById = async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		if (!user) {
			return res.status(400).send('User Not Found');
		}
		res.status(200).send(user);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};

export const deleteCurrentUser = async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req._id);
		if (!user) {
			return res.status(400).send('User Not Found');
		}
		res.status(200).send(user);
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};

export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findByCredentials(email, password);
		const token = await user.generateAuthToken();
		res.status(200).send({ user, token });
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
};
