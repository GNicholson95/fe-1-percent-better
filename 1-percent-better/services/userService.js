// services/userService.js
import graphqlAPI from "./graphqlClient"; // Import the instance you just created

const GET_USERNAME_BY_USERID = `query MyQuery {
  getUserByUserId(userId: 1) {
    username
  }
}`;

const GET_ALL_USERS_QUERY = `
  query MyQuery {
    getAllUsers {
      username
    }
  }
`;

const GET_SESSIONS_BY_USER_ID_QUERY = `
query MyQuery {
  getSessionsByUserId(userId: 1) {
    dateTime
    sessionName
    sessionlogExerciseSet {
      exerciseId {
        externalExerciseName
        personalBest
        workoutlogSet {
          reps
          sets
          weightKg
        }
      }
    }
  }
}
`;

export const fetchUsernameByUserId = async (userId) => {
  try {
    const response = await graphqlAPI({
      data: {
        query: GET_USERNAME_BY_USERID,
        variables: {
          userId,
        },
      },
    });
    return response.data.data.getUserByUserId.username;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchAllUsers = async () => {
  try {
    const response = await graphqlAPI({
      data: {
        query: GET_ALL_USERS_QUERY,
        variables: {},
      },
    });
    return response.data.data.getAllUsers;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchSessionByUserId = async () => {
  try {
    const response = await graphqlAPI({
      data: {
        query: GET_SESSIONS_BY_USER_ID_QUERY,
        variables: {},
      },
    });

    return response.data.data.getSessionsByUserId;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
