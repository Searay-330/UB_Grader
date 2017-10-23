const initialState = {
  errorObject: "",
  errorType: "",
};

const AddUserReducer = (state = initialState, action) => {

  switch (action.type) {
    case "error":
      return {errorObject: action.error, errorType: action.errorType};

    default:
      return state;
  }
};


// Export Reducer
export default AddUserReducer;