const initialState = {
  };
  
  
  const AssignmentsReducer = (state = initialState, action) => {
  
    switch (action.type) {
  
        case "grades":
            return {

            }
        case "populate":
            return {
                assignments: action.assignmentMap,
            }
      default:
        return state;
    }
  };
  
  
  // Export Reducer
  export default AssignmentsReducer;