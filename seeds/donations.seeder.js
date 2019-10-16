const Seeder = require("mongoose-data-seed").Seeder;
const donationModel = require("../database").donationModel;

let data = [];
for (let i = 1; i <= 50; i++) {
	data.push({
		volunteerName: `testName${i}`,
		email: `test${i}@gmail.com`,
		amount: 4 * i,
		message: `testMessage${i}`,
		date: new Date(2019, 8, 12, 2, i)
	});
}

class DonationsSeeder extends Seeder {
	async shouldRun() {
		return donationModel
			.countDocuments()
			.exec()
			.then(count => count === 0);
	}

	async run() {
		return donationModel.create(data);
	}
}

module.exports = new DonationsSeeder();
