import graphqlAPI from "./graphqlClient";

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
`;

export const isLoggedIn = async (token) => {
  try {
    const response = await graphqlAPI({
      data: {
        query: TOKEN_AUTH_MUTATION,
        headers: {
          Authorization: `JWT ` + token,
        },
      },
    });

    if (response.data.errors) {
      console.error("Error checking logged in:", response.data.errors);
      throw new Error("Error performing GraphQL query");
    }

    const user = response.data.data.loggedIn;
    return user;
  } catch (error) {
    console.error("Error in TokenAuth", error);
    throw error;
  }
};
