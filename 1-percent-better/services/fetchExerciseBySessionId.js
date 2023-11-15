import graphqlAPI from "./graphqlClient";

export const fetchExercisesBySessionId = async (sessionId) => {
  try {
    const response = await graphqlAPI({
      data: {
        query: `
            query getExercisesBySessionId($sessionId: Int) {
              getExercisesBySessionId(sessionId: $sessionId) {
                sessionExerciseId
                exerciseId {
                  exerciseId
                  externalExerciseId
                }
              }
            }
          `,
        variables: {
          sessionId: sessionId,
        },
      },
    });

    return response.data.data.getExercisesBySessionId;
  } catch (error) {
    console.error("Error fetching session exercises:", error.response.data);
    throw error;
  }
};
