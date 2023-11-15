import graphqlAPI from "./graphqlClient";

const DELETE_SESSION_EXERCISE_MUTATION = `
mutation DeleteSessionExercise($sessionExerciseId: ID!) {
  deleteSessionExercise(sessionExerciseId: $sessionExerciseId) {
    sessionExercise {
      sessionExerciseId
    }
  }
}`;

const deleteSessionExercise = async (sessionExerciseId) => {
  try {
    const response = await graphqlAPI({
      data: {
        query: DELETE_SESSION_EXERCISE_MUTATION,
        variables: {
          sessionExerciseId: sessionExerciseId,
        },
      },
    });

    console.log("Session exercise deleted:", response.data);
  } catch (error) {
    console.error("Error deleting session exercise:", error);
    throw error;
  }
};

export default deleteSessionExercise;
