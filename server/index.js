const app = require('./app');
// const { connectDB } = require('./config/database');
const { connectDB } = require('./config/mongodb');
const port = process.env.PORT || 3000;

const server = () => {
	app.listen(port, () => {
		// connectDB();
		connectDB();
		console.log(`Listening on port ${port}`);
	});
};

connectDB(server);
