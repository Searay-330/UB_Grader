const initialState = {
    submissions: {},
    roster: []
};


const AssignmentsReducer = (state = initialState, action) => {

    switch (action.type) {

        case "student_grades":
        case "professor_grades":
            return {
                submissions: action.gradeData,
                roster: state.roster,
            }
        
        case "roster":
            return {
                submissions: state.submissions,
                roster: action.roster,
            }

        default:
            return state;
    }
};


// Export Reducer
export default AssignmentsReducer;