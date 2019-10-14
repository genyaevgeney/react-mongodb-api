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

	updatePasswordToken(login, token, passwordExpires) {
		this.model.findOneAndUpdate(login, {$set:{resetPasswordToken: token, resetPasswordExpires: passwordExpires }}, {new: true}, (err, doc) => {
    if (err) {
        console.log("Something wrong when updating data!");
    }

    console.log(doc);
});
	}
}

	module.exports = new UserRepository();
