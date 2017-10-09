const initialState = {
  errorObject: "",
};

const AddUserReducer = (state = initialState, action) => {

  switch (action.type) {
    case "error":
      return {errorObject: action.error};

    default:
      return state;
  }
};


// Export Reducer
export default AddUserReducer;