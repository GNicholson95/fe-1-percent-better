import graphqlAPI from "./graphqlClient";

export const GET_PB_QUERY = `
query  getExerciseByExerciseId($exerciseId: Int!) {
  getExerciseByExerciseId(exerciseId: $exerciseId)
  {
    personalBest
  }
}
`;

export const PATCH_PB_MUTATION = `
  mutation updateExercise(
    $personalBest:Int!,
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
    const getResponse = await graphqlAPI({
      data: {
        query: GET_PB_QUERY,
        variables: {
          exerciseId: Number(exerciseId),
        },
      },
    });

    const currentPB =
      getResponse.data.data.getExerciseByExerciseId.personalBest;

    if (currentPB < Number(personalBest)) {
      const response = await graphqlAPI({
        data: {
          query: PATCH_PB_MUTATION,
          variables: {
            exerciseId: exerciseId,
            personalBest: Number(personalBest),
          },
        },
      });

      if (response.data.errors) {
        return [];
      }

      const updatedExercise = response.data.data;
      return updatedExercise;
    }
    return currentPB;
  } catch (error) {
    throw error;
  }
};
