import graphqlAPI from "./graphqlClient";

const GET_USERNAME_BY_USERID = `query getUserByUserId($userId: Int!) {
  getUserByUserId(userId: $userId) {
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
query getSessionsByUserId($userId: Int!) {
    getSessionsByUserId(userId: $userId){
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
          userId: userId,
        },
      },
    });
    return response.data.data.getUserByUserId.username;
  } catch (error) {
    console.error("Error fetching username:", error.response.data);
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

export const fetchSessionByUserId = async (userId) => {
  try {
    const response = await graphqlAPI({
      data: {
        query: GET_SESSIONS_BY_USER_ID_QUERY,
        variables: {
          userId,
        },
      },
    });

    return response.data.data.getSessionsByUserId;
  } catch (error) {
    console.error("Error fetching sessions by user:", error.response.data);
    throw error;
  }
};
