// const userModel = require("../index").userModel;
const donationModel = require("../index").donationModel;
const connection = require("../index").connection;

let dataDonations = [];
for (let i = 1; i <= 50; i++) {
  dataDonations.push({
    volunteerName: `testName${i}`,
    email: `test${i}@gmail.com`,
    amount: 4 * i,
    message: `testMessage${i}`,
    date: new Date(2019, 8, 12, 2, i)
  });
}

// let userDonations = [];
// for (let i = 1; i <= 50; i++) {
//  userDonations.push({
//    login: `login${i}`,
//    email: `test${i}@gmail.com`,
//    password: `testpassword${i}`,
//    resetPasswordToken: "null",
//    resetPasswordExpires: new Date()
//  });
// }

if (dataDonations.length === 50)
  donationModel.create(dataDonations).then(() => {
    console.log("All seeds have been done.");
    connection.close();
  });

// if (userDonations.length === 50) userModel.create(userDonations);
