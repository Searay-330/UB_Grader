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
            }
        
        case "roster":
            return

        default:
            return state;
    }
};


// Export Reducer
export default AssignmentsReducer;