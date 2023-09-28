const { getOne, findById } = require('../config/mongodb');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
exports.isAuthenticated = async (req, res, next) => {
	try {
		const { token } = req.cookies;
		// console.log('in token ', token);
		if (!token) {
			return res.status(401).json({
				message: 'Please login first',
			});
		}
		const decoded = await jwt.verify(token, process.env.JWT_SECRET);
		req.user = await findById('users', { _id: new ObjectId(decoded._id) });
		next();
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			message: error.message,
		});
	}
};
