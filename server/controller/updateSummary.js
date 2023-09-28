const { getOne, updateClientMetconPerformance } = require('../config/mongodb');
const User = require('../models/user');

exports.addSummaryToExercise = async (req, res) => {
	try {
		let user = await getOne('users', { _id: req.user._id });

		const resp = await updateClientMetconPerformance(user.name, req.body);
		console.log('resp', resp);
		res.status(200).json({
			success: true,
			resp,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
