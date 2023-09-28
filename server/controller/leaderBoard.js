const { getAll, getOne } = require('../config/mongodb');
const User = require('../models/user');
const { getTotalScore } = require('../utils/utils');

exports.getLeaderBoard = async (req, res) => {
	try {
		let allUser = await getAll('users', {});
		const user = await getOne('users', { _id: req.user._id });
		let language = user.language;
		allUser = allUser.map((x) => {
		console.log("***",x)
			return {
				name: x.name,
				language: language,
				totalScore: x.exercises
					.filter((exercise) => exercise.language === language)
					.map((x) => getTotalScore(x.summary))
					.reduce((a, b) => a + b, 0),
			};
		});
		res.status(200).json({
			allUserScore: allUser,
		});
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};
