import graphqlAPI from "./graphqlClient";

export const CREATE_EXERCISE_MUTATION = `
mutation myMutation{
  createExercise(userId=${userId}, externalExerciseBodypart=${exBodypart}, externalExerciseName=${exName}, externalExerciseId=${exId}}) {
    externalExerciseId
  }
  exercise {
    exerciseId
    externalExerciseBodypart
    externalExerciseId
    externalExerciseName
    personalBest
  }
}
`;

export const addExerciseToUser = async (userId, exBodypart, exName, exId) => {
  try {
    const response = await graphqlAPI({
      data: {
        query: CREATE_EXERCISE_MUTATION,
        variables: { userId, exBodypart, exName, exId },
      },
    });

    if (response.data.errors) {
      console.error("Errors returned from the attempt:", response.data.errors);
      return [];
    }

    const createdExercise = response.data.data.addExerciseToUser.map(
      (exercise) => exercise.externalExerciseId
    );

    return createdExercise;
  } catch (error) {
    console.error("Error creating exercise:", error);
    throw error;
  }
};
