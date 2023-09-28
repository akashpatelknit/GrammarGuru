const User = require('../models/user');
const Question = require('../models/Question');
const { getOne, createOne } = require('../config/mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const matchPassword = async function (password, hashpassword) {
	return await bcrypt.compare(password, hashpassword);
};
const generateToken = function (_id) {
	return jwt.sign({ _id: _id }, process.env.JWT_SECRET);
};
exports.register = async (req, res) => {
	const { name, email, password, language } = req.body;
	let user = await getOne('users', { email });
	try {
		if (user) {
			return res.status(400).json({ message: 'User already exist' });
		}
		user = await createOne('users', {
			name,
			email,
			password,
			language,
		});
		const token = await generateToken(user._id);
		const options = {
			expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
			httpOnly: true,
		};
		res.status(201).cookie('token', token, options).json({
			success: true,
			token,
		});
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await getOne('users', { email });
		console.log(user);

		if (!user) {
			return res.status(400).json({
				success: false,
				message: 'User does not exist',
			});
		}

		const isMatch = await matchPassword(password, user.password);

		if (!isMatch) {
			return res.status(700).json({
				success: false,
				message: 'Enter a valid email or password',
			});
		}

		const token = await generateToken(user._id);
		const options = {
			expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
			httpOnly: true,
		};
		// console.log('login user token', token);
		res.status(200).cookie('token', token, options).json({
			success: true,
			user,
			token,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			success: false,
			message: error.error,
		});
	}
};
exports.loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await getOne('users', { email });

		if (user) {
			const validity = await matchPassword(password, user.password);

			if (!validity) {
				return res.status(400).json({
					success: false,
					message: 'Enter a valid email or password',
				});
			} else {
				const token = jwt.sign(
					{ username: user.username, id: user._id },
					process.env.JWT_SECRET,
					{ expiresIn: '1h' }
				);
				res.status(200).json({ success: true, user, token });
			}
		} else {
			res.status(400).json({
				success: false,
				message: 'User does not exist',
			
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
			x: 'error',
		});
	}
};
exports.logout = async (req, res) => {
	try {
		res.status(200)
			.cookie('token', null, {
				expires: new Date(Date.now()),
				httpOnly: true,
			})
			.json({
				success: true,
				message: 'Logged out',
			});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
exports.myProfile = async (req, res) => {
	try {
		const user = await getOne('users', { _id: req.user._id });
		const question = await getAll('questions', {
			language: { $exists: 1 },
		});
		let requiredInfo = {
			name: user.name,
			language: user.language,
		};
		res.status(200).json({
			success: true,
			user: requiredInfo,
			language: question.map((item) => item.language),
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.updateLanguage = async (req, res) => {
	try {
		const user = await getOne('users', { _id: req.user._id });
		console.log(req.body.language);
		user.language = req.body.language;
		await user.save();
		res.status(200).json({
			success: true,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
