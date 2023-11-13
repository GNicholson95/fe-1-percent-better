import axios from "axios";

const graphqlAPI = axios.create({
  baseURL: "http://192.168.0.26:8000/api/", // Replace with your actual local network IP and GraphQL endpoint
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    // Add any other headers like Authorization if needed
  },
});
export default graphqlAPI;
