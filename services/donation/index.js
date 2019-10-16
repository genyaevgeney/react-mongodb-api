const donationRepository = require("../../repositories/donation/DonationRepository.js");

class DonationService {
  async getUserPaginationPageData(id, login) {
    const perPage = 10;
    const page = id || 1;
    const badRequest = true;
    const paginationType = "userDonations";
    const emptyDashboard = true;

    if (page < 1) return { badRequest: badRequest };

    const currentPage = Number(id);
    const collectionCount = await donationRepository.getUserCollectionCount(
      login
    );
    let paginationPages = Math.ceil(collectionCount / perPage);
    if (paginationPages === 0) return { emptyDashboard };
    const donations = await donationRepository.getUserPaginationPageData(
      perPage,
      page,
      login
    );

    if (isNaN(currentPage) || currentPage > paginationPages)
      return { badRequest: badRequest };
    const maxAmount = await donationRepository.getUserMaxAmount(login);
    const amount = await donationRepository.userSumAmount(login);
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const date = new Date().getDate() + 1;
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month, date);
    const amountForThisMonth = await donationRepository.getUserAmountForThisMonth(
      startDate,
      endDate,
      login
    );
    const dataForChart = await donationRepository.getUserChartInfo(login);

    return {
      donations,
      current: page,
      paginationPages,
      paginationType,
      maxAmount,
      amount,
      amountForThisMonth,
      dataForChart
    };
  }

  async getPaginationPageData(reqPage) {
    const perPage = 10;
    const page = reqPage || 1;
    const badRequest = true;
    const paginationType = "allDonations";
    const emptyDashboard = true;

    if (page < 1) return { badRequest: badRequest };

    const currentPage = Number(reqPage);
    const collectionCount = await donationRepository.getCollectionCount();
    let paginationPages = Math.ceil(collectionCount / perPage);
    if (paginationPages === 0) return { emptyDashboard };

    if (isNaN(currentPage) || currentPage > paginationPages)
      return { badRequest: badRequest };

    const maxAmount = await donationRepository.getMaxAmount();
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const date = new Date().getDate() + 1;
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month, date);
    const amountForThisMonth = await donationRepository.getAmountForThisMonth(
      startDate,
      endDate
    );

    return {
      donations: await donationRepository.getPaginationPageData(perPage, page),
      current: page,
      paginationPages,
      maxAmount,
      topDonator: await donationRepository.getTopDonatorName(maxAmount),
      amount: await donationRepository.sumAmount(),
      amountForThisMonth,
      dataForChart: await donationRepository.getChartInfo(),
      paginationType
    };
  }

  async setPostData(bodyData) {
    // console.log(bodyData)

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
      };
      console.log(donationInfo);
      donationRepository.create(donationInfo);
    }
  }

  async getErrorPageData(bodyData) {
    const badRequest = true;
    return [{ badRequest: badRequest }];
  }
}

module.exports = new DonationService();
