require("dotenv").config();
const mongoose = require("mongoose");
const Donations = require("./seeds/donations.seeder");

const mongoURL = process.env.MONGO_URI || "mongodb://localhost:27017/MernDb";

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
exports.seedersList = {
	Donations
};
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
exports.connect = async () => {
	await mongoose.connect(mongoURL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
};
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
exports.dropdb = async () => mongoose.connection.db.dropDatabase();
