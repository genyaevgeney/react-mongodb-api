const router = require('../server.js').router
const donationController = require('../controllers/DonationController.js')

router.use("/page=:page", donationController.renderDashboardPage);
router.use("/donation", donationController.receivingDonationData);

module.exports = router;
