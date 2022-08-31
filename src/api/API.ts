import axios from "axios";

// baseURL: "http://localhost:8080/",
// baseURL: "https://granada-matheus-calaca-puc.herokuapp.com/",
const api = axios.create({
  baseURL: "https://granada-matheus-calaca-puc.herokuapp.com/",
});

export default api;