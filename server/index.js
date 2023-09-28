// const app = require('./app');
// const { connectDB } = require('./config/database');
// // const { connectDB } = require('./config/mongodb');
// const port = process.env.PORT || 3000;

// app.listen(port, () => {
// 	// connectDB();
// 	connectDB();
// 	console.log(`Listening on port ${port}`);
// });

//888888888888888
// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const cors = require('cors');
// routes
// import AuthRoute from './routes/AuthRoute.js';
// import UserRoute from './routes/UserRoute.js';
// import PostRoute from './routes/PostRoute.js';
// import UploadRoute from './routes/UploadRoute.js';
// import ChatRoute from './routes/ChatRoute.js';
// import MessageRoute from './routes/MessageRoute.js';
const userRoute = require('./routes/userRoutes');

const app = express();

// middleware
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
// to serve images inside public folder
// app.use(express.static('public'));
// app.use('/images', express.static('images'));

dotenv.config();
const PORT = process.env.PORT||8080;

const CONNECTION = process.env.MONGO_URL;
mongoose
	.connect(
		'mongodb+srv://cotsec14:emitrr@emitrr.5mpbco5.mongodb.net/?retryWrites=true&w=majority',
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then(() =>
		app.listen(PORT, () => console.log(`Listening at Port ${PORT}`))
	)
	.catch((error) => console.log(`${error} did not connect`));

// app.use('/auth', AuthRoute);
app.use('/api/v1',userRoute);
// app.use('/posts', PostRoute);
// app.use('/upload', UploadRoute);
// app.use('/chat', ChatRoute);
// app.use('/message', MessageRoute);
