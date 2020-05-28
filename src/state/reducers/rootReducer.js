import initialState from "../store/initialState";
import auth from "../../modules/auth"

const rootReducer = async (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      try {
        const response = await auth.signIn(
          action.payload.email,
          action.payload.password
        );
        debugger
        return {
          ...state,
          authenticatedAs: response.data.role,
          uid: response.data.uid
        }
      } catch (error) {
        return {
          ...state,
          loginMessage: error.response.data.errors[0]
        }
      }
    default:
      return state;
  }
};
export default rootReducer;
