// Import Actions
import { TOGGLE_ADD_POST } from './AppActions';

// Initial State
const initialState = {
  user: "",
  perms: [],
  isAdmin: false,
  menuItems: undefined,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
  	case "login":
  		return {
        user: action.user,
        perms: [],
        admin: false,
        menuItems: undefined,
      }

    case "perms" :
    return{
    	user: state.user,
    	perms:action.perm,
      admin:action.admin,
      menuItems: undefined,
    }

    case "menuUpdate" :
    return{
      user: state.user,
      perms:state.perm,
      admin:state.admin,
      menuItems: action.items,
    }
    default:
      return state;
  }
};

/* Selectors */


// Export Reducer
export default AppReducer;
