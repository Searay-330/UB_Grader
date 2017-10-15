const defaultState = {
    courseNum: '',
    displayName: '',
    semester: ''
};

const CourseReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "course":
            console.log("COURSE ACTION");
            return {
                courseNum: action.courseNum,
                displayName: action.displayName,
                semester: action.semester
            }

        default:
            return state;
    }
};

export default CourseReducer;