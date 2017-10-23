const initialState = {
    submissions: {},
};


const AssignmentsReducer = (state = initialState, action) => {

    switch (action.type) {

        case "student_grades":
        case "professor_grades":
            return {
                submissions: action.gradeData,
            }

        default:
            return state;
    }
};


// Export Reducer
export default AssignmentsReducer;