const BaseRepository = require("../BaseRepository.js");
const Donation = require("../../database").donationModel;

class DonationRepository extends BaseRepository {
  constructor() {
    super();
    this.model = Donation;
  }

  isEmptyObj(obj) {
    for (let key in obj) {
      return false;
    }
    return true;
  }

  getCollectionCount() {
    return this.model.estimatedDocumentCount();
  }

  getUserCollectionCount(login) {
    return this.model.countDocuments({ volunteerName: login });
  }

  getMaxAmount() {
    return new Promise((resolve, reject) => {
      this.model
        .findOne()
        .sort("-amount")
        .exec((err, doc) => {
          const maxAmount = doc.amount;
          resolve(maxAmount);
        });
    });
  }

  getUserMaxAmount(login) {
    return new Promise((resolve, reject) => {
      this.model
        .find()
        .where("volunteerName")
        .equals(login)
        .findOne()
        .sort("-amount")
        .exec((err, doc) => {
          const maxAmount = doc.amount;
          resolve(maxAmount);
        });
    });
  }

  getUserPaginationPageData(perPage, page, login) {
    return new Promise((resolve, reject) => {
      this.model
        .find()
        .where("volunteerName")
        .equals(login)
        .limit(perPage)
        .skip(perPage * page - perPage)
        .exec((err, doc) => {
          resolve(doc);
        });
    });
  }

  getPaginationPageData(perPage, page) {
    return new Promise((resolve, reject) => {
      this.model
        .find()
        .limit(perPage)
        .skip(perPage * page - perPage)
        .exec((err, doc) => {
          resolve(doc);
        });
    });
  }

  getTopDonatorName(maxAmount) {
    return new Promise((resolve, reject) => {
      this.model.findOne({ amount: maxAmount }).exec((err, doc) => {
        resolve(doc.volunteerName);
      });
    });
  }

  sumAmount() {
    return new Promise((resolve, reject) => {
      this.model
        .aggregate([{ $group: { _id: null, amount: { $sum: "$amount" } } }])
        .exec((err, doc) => {
          resolve(doc[0].amount);
        });
    });
  }

  userSumAmount(login) {
    return new Promise((resolve, reject) => {
      this.model
        .aggregate([
          { $match: { volunteerName: login } },
          { $group: { _id: null, amount: { $sum: "$amount" } } }
        ])
        .exec((err, doc) => {
          resolve(doc[0].amount);
        });
    });
  }

  getUserAmountForThisMonth(startDate, endDate, login) {
    return new Promise((resolve, reject) => {
      this.model
        .aggregate([
          { $match: { volunteerName: login } },
          { $match: { $and: [{ date: { $gte: startDate, $lt: endDate } }] } },
          { $group: { _id: null, amount: { $sum: "$amount" } } }
        ])
        .exec((err, doc) => {
          if (this.isEmptyObj(doc)) {
            const amount = 0;
            resolve(amount);
            return;
          }
          resolve(doc[0].amount);
        });
    });
  }

  getAmountForThisMonth(startDate, endDate) {
    return new Promise((resolve, reject) => {
      this.model
        .aggregate([
          { $match: { $and: [{ date: { $gte: startDate, $lt: endDate } }] } },
          { $group: { _id: null, amount: { $sum: "$amount" } } }
        ])
        .exec((err, doc) => {
          if (this.isEmptyObj(doc)) {
            const amount = 0;
            resolve(amount);
            return;
          }
          resolve(doc[0].amount);
        });
    });
  }

  getChartInfo() {
    return new Promise(resolve => {
      this.model
        .aggregate([
          {
            $group: {
              _id: {
                day: { $dayOfMonth: "$date" },
                month: { $month: "$date" },
                year: { $year: "$date" }
              },
              totalAmount: { $sum: "$amount" },
              count: { $sum: 1 }
            }
          }
        ])
        .exec((err, doc) => {
          resolve(doc);
        });
    });
  }

  getUserChartInfo(login) {
    return new Promise(resolve => {
      this.model
        .aggregate([
          { $match: { volunteerName: login } },
          {
            $group: {
              _id: {
                day: { $dayOfMonth: "$date" },
                month: { $month: "$date" },
                year: { $year: "$date" }
              },
              totalAmount: { $sum: "$amount" },
              count: { $sum: 1 }
            }
          }
        ])
        .exec((err, doc) => {
          resolve(doc);
        });
    });
  }
}

module.exports = new DonationRepository();
