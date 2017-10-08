const initialState = {
    submissions: {},
    userData: {},
  };
  
  
  const AssignmentsReducer = (state = initialState, action) => {
  
    switch (action.type) {
        
        case "student_grades":
        case "professor_grades":
            console.log(action);
            if (action.gradeData != undefined && action.gradeData.length != 0) {
                state.submissions[action.assignmentNum] = action.gradeData[0];
                console.log("ADDED SUBMISSION");
                console.log(state.submissions);
            }
            return {
                submissions: state.submissions,
                userData: state.userData
            }

        case "user":
            return {
                submissions: state.submissions,
                userData: action.userInfo,
            }

      default:
        return state;
    }
  };
  
  
  // Export Reducer
  export default AssignmentsReducer;