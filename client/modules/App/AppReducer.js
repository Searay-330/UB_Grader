// Import Actions
import { TOGGLE_ADD_POST } from './AppActions';

// Initial State
const initialState = {
  user: "",
  perms: [],
  isAdmin: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
  	case "login":
  		return {
        user: action.user,
        perms: [],
        admin: false,
      }

    case "perms" :
    return{
    	user: state.user,
    	perms:action.perm,
      admin:action.admin
    }
    default:
      return state;
  }
};

/* Selectors */


// Export Reducer
export default AppReducer;
