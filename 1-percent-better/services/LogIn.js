import graphqlAPI from "./graphqlClient";
import { useContext, useState } from "react";
import axios from "axios";
import { useUserContext } from "../context/UserContext";

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
      console.error("Error logging in:", response.data.errors[0].message);
      throw new Error(response.data.errors[0].message);
    }

    const token = response.data.data.tokenAuth.token;

    return token;
  } catch (error) {
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
    baseURL: "https://one-percent-better-api-7up3.onrender.com/api/",
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

    return user;
  } catch (error) {
    console.error("Error in Log in function", error.response.data);
    throw error;
  }
};
