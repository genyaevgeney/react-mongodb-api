import axios from "axios";

export default () => {
  return axios.create({
    baseURL: "http://react-mongodb-api.com"
  });
};
