const donationRepository = require("../../repositories/donation/DonationRepository.js");

class DonationService {

  async getPaginationPageData(reqPage) {
    const perPage = 10
    const page = reqPage || 1
    const badRequest = true

    if (page < 1) return { badRequest: badRequest }

      const currentPage = Number(reqPage)
    const collectionCount = await donationRepository.getCollectionCount()
    let paginationPages = Math.ceil(collectionCount / perPage);

    if (isNaN(currentPage) || currentPage > paginationPages) return { badRequest: badRequest };

    const maxAmount = await donationRepository.getMaxAmount();
    const year = new Date().getFullYear()
    const month = new Date().getMonth()
    const date = new Date().getDate()+1
    const startDate = new Date(year, month, 1)
    const endDate = new Date(year, month, date)
    const amountForThisMonth = await donationRepository.getAmountForThisMonth(startDate, endDate)

    return {
      donations: await donationRepository.getPaginationPageData(perPage, page),
      current: page,
      paginationPages: paginationPages,
      maxAmount: maxAmount,
      topDonator: await donationRepository.getTopDonatorName(maxAmount),
      amount: await donationRepository.sumAmount(),
      amountForThisMonth: amountForThisMonth,
      dataForChart: await donationRepository.getChartInfo()
    }
  }

  async setPostData(bodyData) {

     const data = JSON.parse(Object.keys(bodyData));
    if (!data.name || !data.email || !data.amount || !data.message) {
      console.log("All form fields must be filled");
    } else {
      const donationInfo = {
          volunteerName: data.name,
          email: data.email,
          amount: +data.amount,
          message: data.message,
          date: new Date()
        }
        console.log(donationInfo)
      donationRepository.create(donationInfo);
    }
  }

  async getErrorPageData(bodyData) {
    const badRequest = true
    return [{ badRequest: badRequest }]
  }
}

module.exports = new DonationService();
