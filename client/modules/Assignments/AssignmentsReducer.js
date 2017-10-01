// Initial State
const initialState = {
  assignmentsData:[],
  assignmentsMap: [],
};


const AssignmentsReducer = (state = initialState, action) => {

  switch (action.type) {

  	case "populate":

  		return {
  			assignmentsData: action.assignmentsData,
  			assignmentsMap: action.assignmentsMap,

  		}
    default:
      return state;
  }
};


// Export Reducer
export default AssignmentsReducer;
