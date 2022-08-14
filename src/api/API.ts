import axios from "axios";

const api = axios.create({
  baseURL: "https://granada-matheus-calaca-puc.herokuapp.com/",
});

export default api;