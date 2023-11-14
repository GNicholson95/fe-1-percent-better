import graphqlAPI from "./graphqlClient";

const CREATE_WORKOUT_MUTATION = `
mutation CreateWorkout($exerciseId: ID!, $reps: Int!, $sets: Int!, $weightKg: Int!) {
    createWorkout(exerciseId: $exerciseId, reps: $reps, sets: $sets, weightKg: $weightKg) {
      workout {
        reps
        sets
        weightKg
        workoutId
        dateTime
      }
    }
  }`;

export const logWorkout = async (exerciseDetails) => {
  try {
    const response = await graphqlAPI({
      data: {
        query: CREATE_WORKOUT_MUTATION,
        variables: {
          exerciseId: exerciseDetails.internalId,
          reps: parseInt(exerciseDetails.reps),
          sets: parseInt(exerciseDetails.sets),
          weightKg: parseInt(exerciseDetails.weight),
        },
      },
    });

    console.log("Workout logged:", response.data);
    // Handle the response as needed
    return response.data; // Or just the workout data if needed
  } catch (error) {
    console.error("Error logging workout:", error.response.data);
    throw error;
  }
};
