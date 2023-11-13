import axios from "axios";
import { useContext } from "react";
import LoginContext from "../context/LoginContext";

const graphqlAPI = axios.create({
  baseURL: "http://192.168.0.26:8000/api/", // Replace with your actual local network IP and GraphQL endpoint
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    // Authorization: useContext(LoginContext),
    // Add any other headers like Authorization if needed
  },
});
export default graphqlAPI;
