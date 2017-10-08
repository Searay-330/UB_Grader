// Initial State
const initialState = {
  score:0,
  maxScore:0,
  feedback:"Waiting for feedback",
};

const AssignmentReducer = (state = initialState, action) => {
  // console.log("REDUCIN SOME SHIT");
  // console.log(action);
  switch (action.type) {
    case "file_submission":
      console.log(action);
      return {
        
      }
    
    case "score":
      var score = action.submission[0].scores[0];
      if (score == undefined){
        score = "No submissions";
      }
      return {
        score: score
      }

    default:
      return state;
    }
};

// Export Reducer
export default AssignmentReducer;
