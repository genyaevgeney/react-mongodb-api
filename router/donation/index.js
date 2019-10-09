const router = require('../../server.js').router
const donationController = require('../../controllers/donation')

router.use("/page=:page", donationController.renderDashboardPage);
router.use("/donation", donationController.receivingDonationData);
router.use('*', donationController.renderErrorPage);

module.exports = router;
