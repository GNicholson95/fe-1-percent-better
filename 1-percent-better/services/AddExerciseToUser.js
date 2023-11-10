import graphqlAPI from "./graphqlClient";

export const CREATE_EXERCISE_MUTATION = `
  mutation createExercise(
    $externalExerciseBodypart:String!,
    $externalExerciseId:String!,
    $externalExerciseName:String!,
    $userId:ID!
  ) {
    createExercise( externalExerciseBodypart:$externalExerciseBodypart,
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
          userId: userId,
          externalExerciseBodypart: exBodypart,
          externalExerciseName: exName,
          externalExerciseId: exId,
        },
      },
    });

    if (response.data.errors) {
      return [];
    }

    const createdExercise = response.data.data.map((exercise) => exercise);

    return createdExercise;
  } catch (error) {
    throw error;
  }
};
