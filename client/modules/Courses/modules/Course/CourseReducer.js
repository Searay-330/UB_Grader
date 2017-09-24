const defaultState = {
    courseNum: 'cse442-f17',
    displayName: 'CSE 442',
    semester: 'Fall 2017'
};

const CourseReducer = (state = defaultState, action) => {
    switch(action.type) {
        default:
            return state;
    }
};

export default CourseReducer;