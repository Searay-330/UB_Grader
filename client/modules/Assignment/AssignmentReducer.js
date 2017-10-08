// Initial State
const initialState = {
  score:0,
  maxScore:0,
  feedback:"Waiting for feedback",
};

const AssignmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "file_submission":
      return {
        
      }
    
    case "score":
      console.log(action.score);
      return {
        score: action.submission.score,
      }

    default:
      return state;
    }
};

// Export Reducer
export default AssignmentReducer;
