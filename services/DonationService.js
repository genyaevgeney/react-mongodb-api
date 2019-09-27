// const donationRepository = require("../repositories/donation/DonationRepository.js");

class DonationService {

  // async getPaginationPageData(reqPage) {
  //   const perPage = 10;
  //   const page = reqPage || 1;
  //   const badRequest = true;

  //   if (page < 1) {
  //     return [{ badRequest: badRequest }];
  //   }

  //   const currentPage = Number(reqPage);
  //   const pages = await donationRepository.getPageCount(perPage);

  //   if (isNaN(currentPage) || currentPage > pages) {
  //     return [{ badRequest: badRequest }];
  //   }

  //   const maxAmount = await donationRepository.getMaxAmount();

  //   return [
  //     {
  //       donations: await donationRepository.read(perPage, page),
  //       current: page,
  //       pages: pages,
  //       maxAmount: maxAmount,
  //       topDonator: await donationRepository.getTopDonator(maxAmount),
  //       amount: await donationRepository.sumAmount(),
  //       amountForThisMonth: await donationRepository.getAmountForThisMonth(),
  //       dataForChart: await donationRepository.getChartInfo()
  //     }
  //   ];
  // }


  async setPostData(bodyData) {
    // const data = JSON.parse(Object.keys(bodyData));
    // const data = bodyData;
    // if (!data.name || !data.email || !data.amount || !data.message) {
    //   console.log("All form fields must be filled");
    // } else {
    //   const donationInfo = [
    //     {
    //       volunteerName: data.name,
    //       email: data.email,
    //       amount: data.amount,
    //       message: data.message,
    //       date: new Date()
    //     }
    //   ];
    //   donationRepository.create(donationInfo);
    // }
    // 
    // const data = {
    // 	login : bodyData.login,
    // 	email : bodyData.email,
    // 	password : bodyData.password
    // }
    const Donation = require("../database").donationModel;
    console.log(bodyData)
    const donationModel = new Donation ({
    	volunteerName : bodyData.volunteerName,
    	email : bodyData.email,
    	amount : +bodyData.amount,
    	message : bodyData.message,
    	date : new Date()
    })

    donationModel.save()
    .then(function(doc){
    	console.log("Сохранен объект", doc);
    })
    .catch(function (err){
    	console.log("Error");
    	console.log(err);
    });
}
}

module.exports = new DonationService();