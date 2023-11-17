import graphqlAPI from "./graphqlClient";

export const DELETE_EXERCISE_MUTATION = `
  mutation deleteExercise(
    $exerciseId:ID!
  ) {
    deleteExercise(
    exerciseId:$exerciseId)
    {
      exercise 
      {
        exerciseId
      }
   }
}`;

export const deleteExercise = async (exerciseId) => {
  try {
    const response = await graphqlAPI({
      data: {
        query: DELETE_EXERCISE_MUTATION,
        variables: {
          exerciseId: exerciseId,
        },
      },
    });

    if (response.data.errors) {
      return [];
    }

    const isDeletedExercise = response.data.data.deleteExercise == null;

    return isDeletedExercise;
  } catch (error) {
    throw error;
  }
};
