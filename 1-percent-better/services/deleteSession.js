import graphqlAPI from "./graphqlClient";

const DELETE_SESSION_MUTATION = `
mutation DeleteSession($sessionId: ID!) {
  deleteSession(sessionId: $sessionId) {
    session {
      sessionId
    }
  }
}`;

const deleteSession = async (sessionId) => {
  try {
    const response = await graphqlAPI({
      data: {
        query: DELETE_SESSION_MUTATION,
        variables: {
          sessionId: sessionId,
        },
      },
    });
  } catch (error) {
    console.error("Error deleting session:", error);
    throw error;
  }
};

export default deleteSession;
