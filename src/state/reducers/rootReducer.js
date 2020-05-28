import initialState from "../store/initialState";
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return state;
  }
};
export default rootReducer;
