const BaseRepository = require("../BaseRepository.js");
const User = require("../../database").userModel;

class UserRepository extends BaseRepository {
  constructor() {
    super();
    this.model = User;
  }
}

module.exports = new UserRepository();
