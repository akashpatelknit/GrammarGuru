const app = require('./app');
const { connectDB } = require('./config/database');
// const { connectDB } = require('./config/mongodb');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
// app.listen(port, () => {
// 	// connectDB();
// 	connectDB();
// 	console.log(`Listening on port ${port}`);
// });

mongoose
	.connect(
		'mongodb+srv://cotsec14:emitrr@emitrr.5mpbco5.mongodb.net/?retryWrites=true&w=majority',
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then(() =>
		app.listen(8080, () => console.log(`Listening at Port ${8080}`))
	)
	.catch((error) => console.log(`${error} did not connect`));
