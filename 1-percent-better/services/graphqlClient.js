import axios from "axios";

const graphqlAPI = axios.create({
  baseURL: "https://one-percent-better-api-7up3.onrender.com/api/",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
});
export default graphqlAPI;
