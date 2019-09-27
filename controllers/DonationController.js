const donationService = require("../services/DonationService.js");

exports.receivingDonationData = (req, res) => {
  donationService.setPostData(req.body);
  // res.redirect("/page=1");

};