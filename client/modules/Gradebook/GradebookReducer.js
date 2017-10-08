const initialState = {
  };
  
  
  const AssignmentsReducer = (state = initialState, action) => {
  
    switch (action.type) {
  
        case "grades":
            return {

            }
      default:
        return state;
    }
  };
  
  
  // Export Reducer
  export default AssignmentsReducer;