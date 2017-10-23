// Initial State
const initialState = {
  score: 0,
  feedback:"Waiting for feedback",
};

const AssignmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "file_submission":
      return state;
    
    case "submission":
      var score;
      var feedback;
      var len = action.submission.length;
      if (action.submission[len-1] == undefined) {
        score = "No score recorded";
        feedback = "No submissions";
      } else {
        var total = 0;
        score = action.submission[len-1].scores.forEach(function(element) {
          console.log(element.score)
          total = element.score;
        });
        feedback = action.submission[len-1].feedback;
        score = total;
      }
      return {
        feedback: feedback,
        score: score
      }

    default:
      return state;
    }
};

// Export Reducer
export default AssignmentReducer;
