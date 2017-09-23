// Initial State
const initialState = {
  assignmentsData:[],
};


const AssignmentsReducer = (state = initialState, action) => {

  switch (action.type) {

  	case "populate":
  		return {
  			assignmentsData: action.assignmentsData

  		}
    default:
      return state;
  }
};


// Export Reducer
export default AssignmentsReducer;
