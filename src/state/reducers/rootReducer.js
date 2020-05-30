import initialState from "../store/initialState";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        ...state,
        authenticatedAs: action.payload.authenticatedAs,
        uid: action.payload.uid,
      };
    case "LOGOUT":
      return {
        ...state,
        uid: "",
        authenticatedAs: "",
      };
    default:
      return state;
  }
};
export default rootReducer;
