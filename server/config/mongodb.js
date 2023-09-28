const { MongoClient } = require('mongodb');
const dbName = 'test';
const url =
	'mongodb+srv://cotsec14:emitrr@emitrr.5mpbco5.mongodb.net/?retryWrites=true&w=majority';

let mongoClient = null;

const connectDB = async () => {
	try {
		const MongoClient = require('mongodb').MongoClient;

		mongoClient = new MongoClient(url);

		// Connect to the client and query
		const mongoConnectResult = await mongoClient.connect();
		console.log('DB connected');
		console.log('mongo connection details - ', url, dbName);
	} catch (error) {
		console.log(error.message);
	}
};

async function getAll(collectionName, filterQuery) {
	if (filterQuery == null) {
		filterQuery = {};
	}
	const client = mongoClient;
	const cursor = client.db(dbName).collection(collectionName);

	const results = await cursor.find(filterQuery).sort({ _id: -1 });
	return results.toArray();
}

async function getOne(collectionName, filterQuery) {
	const cursor = mongoClient.db(dbName).collection(collectionName);
	const results = await cursor.findOne(filterQuery);
	return results;
}
async function findById(collectionName, filterQuery) {
	const cursor = mongoClient.db(dbName).collection(collectionName);
	const results = await cursor.findOne(filterQuery);
	return results;
}
async function createOne(collectionName, filterQuery) {
	const cursor = mongoClient.db(dbName).collection(collectionName);
	const results = await cursor.insertOne(filterQuery);
	return results;
}
const updateClientMetconPerformance = async (client_name, data) => {
	const collection = mongoClient.db(dbName).collection('users');
	const result = await collection.updateOne(
		{ name: client_name },
		{
			$push: {
				exercises: data,
			},
		}
	);
	return result;
};
module.exports = {
	connectDB,
	getAll,
	getOne,
	createOne,
	findById,
	updateClientMetconPerformance,
};
