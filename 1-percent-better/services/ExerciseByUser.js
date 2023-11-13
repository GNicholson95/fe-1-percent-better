import graphqlAPI from "./graphqlClient"; // Import the instance you just created

const GET_EXERCISES_BY_USERS_QUERY = `
query MyQuery {
  getExercisesByUserId(userId: 3) {
    exerciseId
    externalExerciseId
  }
}
`;

export const fetchExercisesByUser = async () => {
  try {
    const response = await graphqlAPI({
      data: {
        query: GET_EXERCISES_BY_USERS_QUERY,
        variables: {}, // If your query had variables, they would go here
      },
    });

    if (response.data.errors) {
      console.error("Errors returned from the query:", response.data.errors);
      return []; // Return an empty array or handle the error as appropriate
    }

    // Ensure we are accessing the correct property
    const userData = response.data.data.getExercisesByUserId.map(
      (exercise) => exercise.externalExerciseId
    );

    return userData; // Return the mapped array
  } catch (error) {
    console.error("Error fetching exercises:", error);
    throw error; // Rethrow the error or handle it as appropriate
  }
};
