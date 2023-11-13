import graphqlAPI from "./graphqlClient"; // Import your GraphQL client

export const createSession = async (userId, sessionName) => {
  const mutation = `
    mutation createNewSession($userId: String!, $sessionName: String!) {
      createSession(userId: $userId, sessionName: $sessionName) {
        session {
          sessionName
          dateTime
          sessionId
        }
      }
    }
  `;

  try {
    const response = await graphqlAPI({
      data: {
        query: mutation,
        variables: {
          userId,
          sessionName,
        },
      },
    });

    // Handle the response here
    return response.data.data.createSession.session;
  } catch (error) {
    console.error("Error creating a new session:", error);
    throw error;
  }
};
