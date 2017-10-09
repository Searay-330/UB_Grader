const initialState = {
    coursesData:[],
  };
  
  
  const coursesReducer = (state = initialState, action) => {
  
    switch (action.type) {
  
        case "populate":
            return {
                coursesData: action.coursesData
  
            }
      default:
        return state;
    }
  };
  
  
  // Export Reducer
  export default coursesReducer;