
// const BaseRepository = require("../BaseRepository.js");

const User = require("../database").userModel;


class DonationRepository extends BaseRepository {
  constructor() {
    super();
  }
}

module.exports = new DonationRepository();
