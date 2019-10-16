const { Seeder } = require("mongoose-data-seed");
const { userModel } = require("../database");

const data = [{}];

class UsersSeeder extends Seeder {
	async shouldRun() {
		return Model.countDocuments()
			.exec()
			.then(count => count === 0);
	}

	async run() {
		return Model.create(data);
	}
}

module.exports = UsersSeeder;
