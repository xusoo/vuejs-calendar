const mongo = require('mongodb').MongoClient;
const ObjectId = require("mongodb").ObjectId;

const events = async (callback) => {
	let client = await mongo.connect(process.env.MONGODB_URL);
	try {
		const db = client.db(process.env.MONGODB_DATABASE);
		return await callback(db.collection('events'));
	} finally {
		client.close();
	}
};

module.exports = {
	async all() {
		return await events((collection => {
			return collection.find({}).toArray();
		}));
	},

	async add(event) {
		return await events((async collection => {
			const result = await collection.insertOne(event);
			event._id = result.insertedId.toString();
			return event;
		}));
	},

	async update(event) {
		return await events((collection => {
			const id = ObjectId(event._id);
			delete event._id;
			return collection.findOneAndReplace({ _id: id }, event);
		}));
	},

	async delete(id) {
		return await events((collection => {
			return collection.findOneAndDelete({ _id: ObjectId(id) });
		}));
	}
};