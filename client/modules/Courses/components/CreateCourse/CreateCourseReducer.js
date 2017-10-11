// Initial State
const initialState = {
  errorObject: "",
  errorType: "",
};


const CreateCourseReducer = (state = initialState, action) => {

  switch (action.type) {
    case "error":
      return {errorObject: action.error, errorType: action.errorType};

    default:
      return state;
  }
};


// Export Reducer
export default CreateCourseReducer;
