import graphqlAPI from "./graphqlClient"; // Import the instance you just created

const GET_EXERCISES_BY_USERS_QUERY = `
query getExercisesByUserId($userId: Int!) {
  getExercisesByUserId(userId: $userId) {
    exerciseId
    externalExerciseId
  }
}
`;

export const fetchExercisesByUser = async (userId) => {
  try {
    const response = await graphqlAPI({
      data: {
        query: GET_EXERCISES_BY_USERS_QUERY,
        variables: {
          userId: userId,
        },
      },
    });

    if (response.data.errors) {
      console.error("Errors returned from the query:", response.data.errors);
      return [];
    }

    const userData = response.data.data.getExercisesByUserId.map(
      (exercise) => exercise.externalExerciseId
    );

    return userData; // Return the mapped array
  } catch (error) {
    console.error("Error fetching exercises:", error);
    throw error; // Rethrow the error or handle it as appropriate
  }
};
