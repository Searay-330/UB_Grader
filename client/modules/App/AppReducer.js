// Import Actions
import { TOGGLE_ADD_POST } from './AppActions';

// Initial State
const initialState = {
  user: "login",
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
  	case "login":
  		return {
        user: action.user,
      }
    default:
      return state;
  }
};

/* Selectors */


// Export Reducer
export default AppReducer;
