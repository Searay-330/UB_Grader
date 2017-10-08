// Import Actions
import { TOGGLE_ADD_POST } from './AppActions';

// Initial State
const initialState = {
  user: "",
  perms: [],
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
  	case "login":
  		return {
        user: action.user,
        perms: [],
      }

    case "perms" :
    return{
    	user: state.user,
    	perms:action.perm,
    }
    default:
      return state;
  }
};

/* Selectors */


// Export Reducer
export default AppReducer;
