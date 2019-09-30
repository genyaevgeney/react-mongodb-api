
module.exports = class BaseRepository {
  constructor() {
    if (new.target === BaseRepository) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }
    this.model

  }

  create(data) {
    const donationModel = new this.model(data)
    donationModel.save()
    .then(function(doc){
      console.log("Saved item", doc);
    })
    .catch(function (err){
      console.log("Error");
      console.log(err);
    });
  }
};