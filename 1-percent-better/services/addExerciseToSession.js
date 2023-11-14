import graphqlAPI from "./graphqlClient";

const CREATE_SESSION_EXERCISE_MUTATION = `
mutation CreateSessionExercise($exerciseId: ID!, $sessionId: ID!) {
  createSessionExercise(exerciseId: $exerciseId, sessionId: $sessionId) {
    sessionExercise {
      sessionExerciseId
    }
  }
}`;

export const addExercisesToSession = async (sessionId, selectedExercises) => {
  try {
    for (const exercise of selectedExercises) {
      const response = await graphqlAPI({
        data: {
          query: CREATE_SESSION_EXERCISE_MUTATION,
          variables: {
            sessionId: sessionId,
            exerciseId: exercise.internalId,
          },
        },
      });

      console.log("Exercise added to session:", response.data);
      // Handle the response as needed
    }
  } catch (error) {
    console.error("Error adding exercises to session:", error.response.data);
    throw error;
  }
};
