const admin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		return next();
	}
	res.status(401);
	res.send({ message: "Not Authorized as an Admin" });
};

export default admin;
