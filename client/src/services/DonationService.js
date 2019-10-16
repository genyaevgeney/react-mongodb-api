import api from "./api";
import axios from "axios";

export default {
  fetchPageData(id) {
    return api().get(`page=${id}`);
  },
  fetchUserPageData(id, login) {
    return api().get(`userdashboard/${id}/${login}`);
  },
  postData(data) {
    delete axios.defaults.headers.common["Authorization"];
    api()
      .post("/donation", data)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
