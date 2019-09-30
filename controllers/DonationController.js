const donationService = require("../services/DonationService.js");

exports.receivingDonationData = (req, res) => {
  donationService.setPostData(req.body);
};

exports.renderDashboardPage = async (req, res) => {
  const data = await donationService.getPaginationPageData(req.params.page);
  res.send(data);
};
