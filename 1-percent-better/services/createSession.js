import graphqlAPI from "./graphqlClient";

export const createSession = async (userId, sessionName) => {
  const mutation = `
    mutation createNewSession($userId: ID!, $sessionName: String!) {
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
          userId: userId,
          sessionName: sessionName,
        },
      },
    });

    return response.data.data.createSession.session;
  } catch (error) {
    console.error("Error creating a new session:", error);
    throw error;
  }
};
