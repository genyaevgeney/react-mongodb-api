const BaseRepository = require("../BaseRepository.js");
const Donation = require("../../database").donationModel;

class DonationRepository extends BaseRepository {
	constructor() {
		super();
		this.model = Donation;
	}

	getCollectionCount(perPage) {
		return this.model.estimatedDocumentCount()
	}

	getMaxAmount() {
		return new Promise((resolve, reject) => {
			this.model
			.findOne()
			.sort('-amount')
			.exec((err, doc) => {
				const maxAmount = doc.amount;
				resolve(maxAmount)
			})
		})
	}

	getPaginationPageData(perPage, page) {
		return new Promise((resolve, reject) => {
			this.model
			.find()
			.limit(perPage)
			.skip(perPage * page - perPage)
			.exec((err, doc) => {
				resolve(doc)
			})
		})
	}

	getTopDonatorName(maxAmount) {
		return new Promise((resolve, reject) => {
			this.model
			.findOne({amount: maxAmount})
			.exec((err, doc) => {
				resolve(doc.volunteerName)
			})
		})
	}

	sumAmount() {
		return new Promise((resolve, reject) => {
			this.model.aggregate([
				{ $group: { _id: null, amount: { $sum: "$amount" } } }
				]).exec((err, doc) => {
					resolve(doc[0].amount)
				})
			});
	}

	getAmountForThisMonth(startDate, endDate) {
		return new Promise((resolve, reject) => {
			
			this.model.aggregate([
				{ $match : { $and : [ {date: { $gte: startDate, $lt: endDate } }] }},
				{ $group : { _id : null, amount : { $sum : "$amount"}}}
				]).exec((err, doc) => {
					resolve(doc[0].amount)
				})
			});
	}

	getChartInfo() {
		return new Promise(resolve => {
			this.model.aggregate(
				[
				{
					$group:
					{
						_id: { day: { $dayOfMonth: "$date"}, month: { $month: "$date"}, year: { $year: "$date" } },
						totalAmount: { $sum: "$amount"},
						count: { $sum: 1 }
					}
				}
				]
				).exec((err, doc) => {
					resolve(doc)
				})
			});
	}
}

module.exports = new DonationRepository();
