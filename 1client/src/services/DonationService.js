import api from "./api";

export default {
  fetchPageData(id) {
    return api().get(`page=${id}`);
  },
  postData(data) {
    api()
      .post("/toDonate", data)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};