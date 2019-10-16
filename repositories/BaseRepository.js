module.exports = class BaseRepository {
  constructor() {
    if (new.target === BaseRepository) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }
    this.model;
  }

  create(data) {
    return new Promise((resolve, reject) => {
      const model = new this.model(data);
      model.save().then(user => {
        resolve(user);
      });
    });
  }

  find(dataObj) {
    return new Promise((resolve, reject) => {
      this.model.findOne(dataObj).then(user => {
        resolve(user);
      });
    });
  }

  update(objForFind, dataObj) {
    this.model.findOneAndUpdate(
      objForFind,
      dataObj,
      { new: true },
      (err, doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }

        console.log(doc);
      }
    );
  }
};
