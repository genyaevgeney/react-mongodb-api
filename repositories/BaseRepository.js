
module.exports = class BaseRepository {
  constructor() {
    if (new.target === BaseRepository) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }
    this.model

  }

  create(data) {
    return new Promise((resolve, reject) => {
    const model = new this.model(data)
    model.save()
    .then(user => {
      resolve(user)
    });
  })
}

};