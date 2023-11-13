import graphqlAPI from "./graphqlClient";
import { useContext, useState } from "react";
import axios from "axios";
import LoginContext from "../context/LoginContext";
import UserContext from "../context/UserContext";

export const TOKEN_AUTH_MUTATION = `
  mutation tokenAuth(
    $username:String!,
    $password:String!,
  ) {
    tokenAuth(
    username:$username,
    password:$password
    )
    {
      token
   }
}`;

export const TokenAuth = async (username, password) => {
  try {
    const response = await graphqlAPI({
      data: {
        query: TOKEN_AUTH_MUTATION,
        variables: {
          password: password,
          username: username,
        },
      },
    });

    if (response.data.errors) {
      console.error("Error logging in:", response.data.errors);
      throw new Error("Error performing GraphQL mutation");
    }

    const token = response.data.data.tokenAuth.token;

    return token;
  } catch (error) {
    console.error("Error in TokenAuth", error);
    throw error;
  }
};

export const LOGGED_IN_QUERY = `
  query loggedIn{
    loggedIn {
        userId
        username
   }
}`;

export const isLoggedIn = async (token) => {
  const graphqlextra = axios.create({
    baseURL: "http://192.168.0.26:8000/api/", // Replace with your actual local network IP and GraphQL endpoint
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
  });

  try {
    const response = await graphqlextra({
      data: {
        query: LOGGED_IN_QUERY,
      },
    });

    if (response.data.errors) {
      console.error("Error checking logged in:", response.data.errors);
      throw new Error("Error performing GraphQL query");
    }

    const user = response.data.data.loggedIn.userId;
    console.log(user);
    const [userId, setUserId] = useContext(UserContext);

    await setUserId(user.userId);
    console.log(userId);

    return "success";
  } catch (error) {
    console.error("Error in Log in function", error.response.data);
    throw error;
  }
};
