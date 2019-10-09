const BaseRepository = require("../BaseRepository.js");
const User = require('../../database').userModel;

class UserRepository extends BaseRepository {
	constructor() {
		super();
		this.model = User;
	}

	findByEmail(reqEmail) {
		return new Promise((resolve, reject) => {
			this.model.findOne({
				email: reqEmail
			}).then(user => {
				resolve(user)
			})
		})
	}
}

	module.exports = new UserRepository();
