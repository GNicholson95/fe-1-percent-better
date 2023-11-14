import graphqlAPI from "./graphqlClient";

export const CREATE_EXERCISE_MUTATION = `
  mutation createExercise(
    $externalExerciseBodypart:String!,
    $externalExerciseId:String!,
    $externalExerciseName:String!,
    $userId:ID!
  ) {
    createExercise(
    externalExerciseBodypart:$externalExerciseBodypart,
    externalExerciseId:$externalExerciseId,
    externalExerciseName:$externalExerciseName,
    userId:$userId)
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

export const addExerciseToUser = async (userId, exBodypart, exName, exId) => {
  try {
    const response = await graphqlAPI({
      data: {
        query: CREATE_EXERCISE_MUTATION,
        variables: {
          userId,
          externalExerciseBodypart: exBodypart,
          externalExerciseName: exName,
          externalExerciseId: exId,
        },
      },
    });

    // Check for errors in the GraphQL response
    if (response.data.errors) {
      console.error("Errors returned from the mutation:", response.data.errors);
      throw new Error("Error performing GraphQL mutation");
    }

    // Check if the mutation response has the expected data structure
    if (
      !response.data.data ||
      !response.data.data.createExercise ||
      !response.data.data.createExercise.exercise
    ) {
      throw new Error("Unexpected response structure from GraphQL mutation");
    }

    const createdExercise = response.data.data.createExercise.exercise;
    return createdExercise;
  } catch (error) {
    console.error("Error in addExerciseToUser:", error);
    throw error;
  }
};
