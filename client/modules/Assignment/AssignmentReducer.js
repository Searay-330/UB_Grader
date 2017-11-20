// Initial State
const initialState = {
  score: 0,
  feedback:"Waiting for feedback",
  latest_timestamp: "never",
};

const AssignmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "file_submission":
      return state;
    
    case "submission":
      var score;
      var feedback;
      var latest_timestamp;
      var len = action.submission.length;

      if (action.submission[len-1] == undefined) {
        score = "No score recorded";
        feedback = "No submissions";
        latest_timestamp = "never";
      } else {
        var total = 0;
        action.submission[len-1].scores.forEach(function(element) {
          total += element.score;
        });
        feedback = action.submission[len-1].feedback;
        latest_timestamp = action.submission[len-1].timestamp;
        score = total;
      }
      return {
        feedback: feedback,
        score: score,
        latest_timestamp: latest_timestamp,
      }

    default:
      return state;
    }
};

// Export Reducer
export default AssignmentReducer;
