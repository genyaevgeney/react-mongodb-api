const router = require('../server.js').router
const donationController = require('../controllers/DonationController.js')
// const donationController = require("../controllers/donationController.js");


router.get('/', (req,res) => {
	res.send('Hi');
})

// router.use("/donate", donationController.renderDonatePage);
// router.use("/page=:page", donationController.renderDashboardPage);
router.use("/donation", donationController.receivingDonationData);
// router.use("/", donationController.redirectToFirstPage);
// router.use("*", donationController.renderErrorPage);
module.exports = router;
