const initialState = {
    submissions: {},
    userData: {},
  };
  
  
  const AssignmentsReducer = (state = initialState, action) => {
  
    switch (action.type) {
        
        case "student_grades":
        case "professor_grades":
            return {
                submissions: action.gradeData,
                userData: state.userData
            }

      default:
        return state;
    }
  };
  
  
  // Export Reducer
  export default AssignmentsReducer;