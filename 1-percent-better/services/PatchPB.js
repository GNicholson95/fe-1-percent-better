import graphqlAPI from "./graphqlClient";

export const PATCH_PB_MUTATION = `
  mutation updateExercise(
    $personalBest:String!,
    $exerciseId:ID!
  ) {
    updateExercise(
    personalBest:$personalBest,
    exerciseId:$exerciseId)
    {
      exercise 
      {
        exerciseId
        externalExerciseBodypart
        externalExerciseName
        externalExerciseId
        personalBest
      }
   }
}`;

export const updateExercise = async (exerciseId, personalBest) => {
  try {
    const response = await graphqlAPI({
      data: {
        query: PATCH_PB_MUTATION,
        variables: {
          exerciseId: exerciseId,
          personalBest: personalBest,
        },
      },
    });

    if (response.data.errors) {
      return [];
    }

    const updatedExercise = response.data.data.map((exercise) => exercise);

    return updatedExercise;
  } catch (error) {
    throw error;
  }
};
