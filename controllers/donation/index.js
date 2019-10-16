const donationService = require("../../services/donation");

exports.receivingDonationData = (req, res) => {
  // console.log(req.body)
  donationService.setPostData(req.body);
};

exports.renderDashboardPage = async (req, res) => {
  const data = await donationService.getPaginationPageData(req.params.page);
  res.send(data);
};

exports.renderUserDashboardPage = async (req, res) => {
  const data = await donationService.getUserPaginationPageData(
    req.params.id,
    req.params.login
  );
  res.send(data);
};

exports.renderErrorPage = async (req, res) => {
  const data = await donationService.getErrorPageData();
  res.send(data);
};
