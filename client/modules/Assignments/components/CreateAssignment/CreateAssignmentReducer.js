// Initial State
const initialState = {
  errorObject: "",
  redirect: false,
};


const CreateAssignmentReducer = (state = initialState, action) => {

  switch (action.type) {
    case "error":
      return {errorObject: action.error, redirect:state.redirect};

    case "redir":
      return {errorObject: state.error, redirect: true};

    case "redirr":
      return {errorObject: state.error, redirect: false};

    default:
      return state;
  }
};


// Export Reducer
export default CreateAssignmentReducer;
