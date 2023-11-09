// services/userService.js
import graphqlAPI from "./graphqlClient"; // Import the instance you just created

const GET_ALL_USERS_QUERY = `
  query MyQuery {
    getAllUsers {
      username
    }
  }
`;

export const fetchAllUsers = async () => {
  try {
    const response = await graphqlAPI({
      data: {
        query: GET_ALL_USERS_QUERY,
        variables: {}, // If your query had variables, they would go here
      },
    });
    return response.data.data.getAllUsers; // Access the result here
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
