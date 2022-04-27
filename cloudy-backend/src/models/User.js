import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
			minLength: 6,
		},
		isAdmin: {
			type: Boolean,
			default: false,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.statics.findByCredentials = async (email, password) => {
	try {
		const user = await User.findOne({ email });
		if (!user) {
			throw new Error("Email or Password is Incorrect");
		}
		const isMatched = await bcrypt.compare(password, user.password);
		if (!isMatched) {
			throw new Error("Email or Password is Incorrect");
		}
		return user;
	} catch (error) {
		throw new Error(error.message);
	}
};

userSchema.statics.isEmailUsed = async (email) => {
	const count = await User.countDocuments({ email });
	if (count > 0) {
		return true;
	}
	return false;
};

//Instance Methods
userSchema.methods.generateAuthToken = async function () {
	try {
		const token = await jwt.sign(
			{
				_id: this._id.toString(),
				user: this,
			},
			process.env.JWT_SECRET
		);
		return token;
	} catch (error) {
		throw new Error(error.message);
	}
};

userSchema.methods.toJSON = function () {
	const userObject = this.toObject();
	delete userObject.password;
	return userObject;
};

userSchema.pre("save", async function () {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 10);
	}
});

const User = mongoose.model("User", userSchema);

export default User;
