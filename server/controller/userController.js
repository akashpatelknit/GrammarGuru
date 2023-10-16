const User = require('../models/user');
const Question = require('../models/Question');
const {
	getOne,
	createOne,
	getAll,
	updateClient,
} = require('../config/mongodb');
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
		const passwordHash = await bcrypt.hash(password, 10);
		user = await createOne('users', {
			name,
			email,
			password: passwordHash,
			language,
			exercises: [],
		});
		const token = await generateToken(user._id);
		const options = {
			expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
			httpOnly: true,
		};
		const userInfo = {
			name: name,
			language: language,
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
	const { email, password } = req.body;

	try {
		const user = await getOne('users', { email });

		if (user) {
			const validity = await matchPassword(password, user.password);

			if (!validity) {
				res.status(400).json('wrong password');
			} else {
				const token = jwt.sign(
					{ username: user.username, id: user._id },
					process.env.JWT_SECRET,
					{ expiresIn: '1h' }
				);
				res.status(200)
					.cookie('token', token, {
						httpOnly: true,
						maxAge: 1000 * 60 * 60 * 24 * 90,
						secure: true,
						sameSite: 'none',
					})
					.json({ name:user.name,language:user.language});
			}
		} else {
			res.status(404).json('User not found');
		}
	} catch (err) {
		res.status(500).json(err);
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
		// console.log(req.body.language);
		const result = await updateClient({
			name: user.name,
			language: req.body.language,
		});

		res.status(200).json({
			success: true,
			result,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
