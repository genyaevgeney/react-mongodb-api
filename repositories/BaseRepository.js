
module.exports = class BaseRepository {
  constructor() {
    if (new.target === BaseRepository) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }
  }

  create() {
    const userModel = new User ({
      login : bodyData.login,
      email : bodyData.email,
      password : bodyData.password
    })

    userModel.save()
    .then(function(doc){
      console.log("Сохранен объект", doc);
    })
    .catch(function (err){
      console.log("Error");
      console.log(err);
    });
  }
};